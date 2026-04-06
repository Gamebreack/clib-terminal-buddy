const ClibCore = require('./clib-core.js');
const fs = require('fs');
const path = require('path');

// Test utilities
const TEST_STATE_PATH = path.join(__dirname, 'test_clib_state.json');

function cleanupTest() {
    if (fs.existsSync(TEST_STATE_PATH)) {
        fs.unlinkSync(TEST_STATE_PATH);
    }
}

// Mock file system for core tests
function mockCore() {
    const originalJoin = path.join;
    path.join = (...args) => {
        if (args.includes('memory') && args.includes('clib_state.json')) {
            return TEST_STATE_PATH;
        }
        return originalJoin(...args);
    };
    
    return () => {
        path.join = originalJoin;
        cleanupTest();
    };
}

// Test Suite
console.log("🧪 Starting CLIB Core Tests...\n");

// Test 1: Initialization
console.log("1. Testing Initialization:");
const restoreMock = mockCore();
const clib = new ClibCore();

// Test 2: Default State
console.log("2. Testing Default State:");
const display = clib.getDisplay();
if (display.ascii === "^_^" && display.message === "Ready to help") {
    console.log("   ✅ Default state correct");
} else {
    console.log("   ❌ Default state incorrect");
    process.exit(1);
}

// Test 3: State Persistence
console.log("3. Testing State Persistence:");
clib.setState("working");
if (fs.existsSync(TEST_STATE_PATH)) {
    console.log("   ✅ State file created");
    
    const data = JSON.parse(fs.readFileSync(TEST_STATE_PATH, 'utf8'));
    if (data.state === "working" && data.muted === false) {
        console.log("   ✅ State data correct");
    } else {
        console.log("   ❌ State data incorrect");
        process.exit(1);
    }
} else {
    console.log("   ❌ State file not created");
    process.exit(1);
}

// Test 4: State Loading
console.log("4. Testing State Loading:");
const clib2 = new ClibCore();
clib2.loadState();
const display2 = clib2.getDisplay();
if (display2.ascii === "¬_¬" && display2.message === "Working hard") {
    console.log("   ✅ State loaded correctly");
} else {
    console.log("   ❌ State load failed");
    process.exit(1);
}

// Test 5: Mute Functionality
console.log("5. Testing Mute Functionality:");
clib2.toggleMute();
const mutedDisplay = clib2.getDisplay();
if (mutedDisplay.ascii === "-_-" && mutedDisplay.message === "Taking a nap") {
    console.log("   ✅ Mute works correctly");
} else {
    console.log("   ❌ Mute failed");
    process.exit(1);
}

// Test 6: Error State
console.log("6. Testing Error State:");
clib2.toggleMute(); // Unmute first
clib2.setState("error");
const errorDisplay = clib2.getDisplay();
if (errorDisplay.ascii === "?_?" && errorDisplay.message === "Something's wrong") {
    console.log("   ✅ Error state works");
} else {
    console.log("   ❌ Error state failed");
    process.exit(1);
}

// Test 7: Invalid State Handling
console.log("7. Testing Invalid State Handling:");
const result = clib2.setState("invalid");
if (result === false) {
    console.log("   ✅ Invalid state rejected");
} else {
    console.log("   ❌ Invalid state accepted");
    process.exit(1);
}

// Test 8: Status Object
console.log("8. Testing Status Object:");
const status = clib2.getStatus();
if (status.state === "error" && status.muted === false) {
    console.log("   ✅ Status object correct");
} else {
    console.log("   ❌ Status object incorrect");
    process.exit(1);
}

// Cleanup and success
restoreMock();
console.log("\n🎉 All tests passed! CLIB Core is working correctly.");