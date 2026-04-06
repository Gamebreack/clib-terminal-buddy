const fs = require('fs');
const path = require('path');

class ClibCore {
    constructor() {
        this.statePath = path.join(__dirname, 'memory', 'clib_state.json');
        this.states = {
            idle: { ascii: "^_^", message: "Ready to help" },
            working: { ascii: "¬_¬", message: "Working hard" },
            muted: { ascii: "-_-", message: "Taking a nap" },
            error: { ascii: "?_?", message: "Something's wrong" }
        };
        this.currentState = 'idle';
        this.muted = false;
    }

    // Core: Load state from file
    loadState() {
        try {
            if (fs.existsSync(this.statePath)) {
                const data = fs.readFileSync(this.statePath, 'utf8');
                const state = JSON.parse(data);
                this.currentState = state.state || 'idle';
                this.muted = state.muted || false;
                return true;
            }
        } catch (error) {
            // Silent fail - use defaults
        }
        return false;
    }

    // Core: Save state to file
    saveState() {
        try {
            const stateDir = path.dirname(this.statePath);
            if (!fs.existsSync(stateDir)) {
                fs.mkdirSync(stateDir, { recursive: true });
            }
            
            const stateData = {
                state: this.currentState,
                muted: this.muted,
                last_updated: Date.now()
            };
            
            fs.writeFileSync(this.statePath, JSON.stringify(stateData, null, 2));
            return true;
        } catch (error) {
            return false;
        }
    }

    // Core: Get current display
    getDisplay() {
        if (this.muted) {
            return this.states.muted;
        }
        return this.states[this.currentState] || this.states.idle;
    }

    // Core: Set state
    setState(state) {
        if (this.states[state]) {
            this.currentState = state;
            this.saveState();
            return true;
        }
        return false;
    }

    // Core: Toggle mute
    toggleMute() {
        this.muted = !this.muted;
        this.saveState();
        return this.muted;
    }

    // Core: Get status object
    getStatus() {
        return {
            state: this.currentState,
            muted: this.muted,
            display: this.getDisplay()
        };
    }
}

module.exports = ClibCore;