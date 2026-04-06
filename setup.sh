#!/bin/bash

# Buddy System Setup Script
# Portable bashrc integration

BUDDY_DIR="$(dirname "$(dirname "$0")")"
SCRIPTS_DIR="$BUDDY_DIR/scripts"

# Add to PATH if not already there
if [[ ":$PATH:" != *":$SCRIPTS_DIR:"* ]]; then
    echo "Adding buddy scripts to PATH..."
    echo "export PATH=\"$SCRIPTS_DIR:\$PATH\"" >> ~/.bashrc
fi

# Add PROMPT_COMMAND integration
if ! grep -q "clib-prompt-safe" ~/.bashrc; then
    echo "Adding prompt integration to bashrc..."
    echo "" >> ~/.bashrc
    echo "# CLIB - Command Line Interface Buddy Integration" >> ~/.bashrc
    echo "if [[ \$- == *i* ]]; then" >> ~/.bashrc
    echo "    update_clib_prompt() {" >> ~/.bashrc
    echo "        export CLIB_STATUS=\"\$(\"$SCRIPTS_DIR/clib-prompt-safe.js\" 2>/dev/null || echo \"^_^ Ready\")\"" >> ~/.bashrc
    echo "    }" >> ~/.bashrc
    echo "    export PROMPT_COMMAND=\"update_clib_prompt\"" >> ~/.bashrc
    echo "    export PS1=\"\\[\\033[01;32m\\]\\u@\\h\\[\\033[00m\\]:\\[\\033[01;34m\\]\\w\\[\\033[00m\\] \\[\\033[01;33m\\]\\\$CLIB_STATUS\\[\\033[00m\\]\\\$ \"" >> ~/.bashrc
    echo "fi" >> ~/.bashrc
fi

echo "Setup complete! Restart your terminal or run: source ~/.bashrc"
