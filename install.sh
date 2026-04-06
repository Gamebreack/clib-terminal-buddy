#!/bin/bash

# Buddy System Installer
# Portable installation script

echo "Installing CLIB - Command Line Interface Buddy..."

# Determine installation directory
if [ -z "$BUDDY_DIR" ]; then
    BUDDY_DIR="$(pwd)"
fi

echo "Installation directory: $BUDDY_DIR"

# Create necessary directories
mkdir -p "$BUDDY_DIR/scripts"

# Ensure scripts directory exists
mkdir -p "$BUDDY_DIR/scripts"

# Create symlink if it doesn't exist
if [ ! -f "$BUDDY_DIR/scripts/buddy" ]; then
    ln -sf "../scripts/clib-cli.js" "$BUDDY_DIR/scripts/buddy"
fi

echo "Files copied successfully!"
echo ""
echo "Next steps:"
echo "1. Run the setup script:"
echo "   ./setup.sh"
echo "2. Restart your terminal or run: source ~/.bashrc"
echo ""
echo "Installation complete!"
