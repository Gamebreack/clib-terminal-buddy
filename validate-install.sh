#!/bin/bash

# Validation script for clib system installation

echo "🔍 Validating Buddy System Installation..."
echo ""

# Check if scripts are in PATH
if command -v clib >/dev/null 2>&1; then
    echo "✅ clib command found in PATH"
else
    echo "❌ clib command not found in PATH"
    echo "   Make sure scripts directory is in your PATH"
fi

# Check if PROMPT_COMMAND is set
if [ -n "$PROMPT_COMMAND" ]; then
    echo "✅ PROMPT_COMMAND is set: $PROMPT_COMMAND"
else
    echo "❌ PROMPT_COMMAND is not set"
fi

# Check if BUDDY_STATUS variable exists
if [ -n "$BUDDY_STATUS" ]; then
    echo "✅ BUDDY_STATUS variable exists: $BUDDY_STATUS"
else
    echo "❌ BUDDY_STATUS variable not set"
fi

# Test clib command functionality
echo ""
echo "🧪 Testing clib commands:"

if command -v clib >/dev/null 2>&1; then
    echo "   clib status: $(clib status 2>/dev/null)"
    echo "   clib show: $(clib show 2>/dev/null | head -1)"
else
    echo "   clib command not available"
fi

echo ""
echo "Validation complete!"
echo "If any checks failed, run: source ~/.bashrc"