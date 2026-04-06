# Installation Guide

## Quick Start

1. **Clone or download** the buddy-system project
2. **Run the installer**:
   ```bash
   cd buddy-system
   ./install.sh
   ```
3. **Run the setup**:
   ```bash
   ./setup.sh
   ```
4. **Restart your terminal** or run:
   ```bash
   source ~/.bashrc
   ```

## Manual Installation

### 1. Copy Files
Copy these files to your desired location:
- `clib-core.js` - Core logic
- `scripts/buddy-cli.js` - CLI interface
- `scripts/buddy-prompt-safe.js` - Prompt integration

### 2. Add to PATH
Add this to your `~/.bashrc`:
```bash
export PATH="/path/to/buddy-system/scripts:$PATH"
```

### 3. Bash Integration
Add this to your `~/.bashrc`:
```bash
# CLIB - Command Line Interface Buddy Integration
if [[ $- == *i* ]]; then
    update_buddy_prompt() {
        export BUDDY_STATUS="$(/path/to/buddy-system/scripts/buddy-prompt-safe.js 2>/dev/null || echo '^_^ Ready')"
    }
    export PROMPT_COMMAND="update_buddy_prompt"
    export PS1="\[\033[01;32m\]\u@\h\[\033[00m\]:\[\033[01;34m\]\w\[\033[00m\] \[\033[01;33m\]\$BUDDY_STATUS\[\033[00m\]\$ "
fi
```

### 4. Restart Terminal
Restart your terminal or run:
```bash
source ~/.bashrc
```

## File Structure
```
buddy-system/
├── clib-core.js          # Core state management
├── install.sh            # Installation script
├── setup.sh             # Bashrc setup script  
├── test-buddy.js         # Test suite
├── README.md            # Project documentation
└── INSTALL.md           # This file
```

## Verification

After installation, verify it works:

```bash
buddy status              # Should show current status
buddy set working         # Change to working state
buddy mute                # Toggle mute mode
```

Your terminal prompt should now show the buddy status!

## Troubleshooting

### PATH Issues
If `buddy` command isn't found:
```bash
export PATH="/path/to/buddy-system/scripts:$PATH"
source ~/.bashrc
```

### Prompt Not Updating
If the prompt doesn't update dynamically:
1. Check that PROMPT_COMMAND is set: `echo $PROMPT_COMMAND`
2. Verify the setup script ran correctly
3. Restart your terminal

### File Permissions
Ensure scripts are executable:
```bash
chmod +x /path/to/buddy-system/scripts/*.js
chmod +x /path/to/buddy-system/*.sh
```

## Uninstallation

1. Remove the buddy sections from your `~/.bashrc`
2. Remove the scripts directory from your PATH
3. Delete the buddy-system files

## Support

If you encounter issues:
1. Check the test suite: `node test-buddy.js`
2. Verify file paths in your bashrc
3. Ensure scripts are executable

Enjoy your new buddy status bar! 🎉