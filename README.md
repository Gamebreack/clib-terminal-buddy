# CLIB - Command Line Interface Buddy

A persistent status bar system for terminal integration, providing real-time ASCII art status updates in your bash prompt.

## Features

- **Real-time Updates**: Dynamic prompt integration using PROMPT_COMMAND
- **Multiple Personalities**: Four states with ASCII art (idle, working, muted, error)
- **Persistent State**: File-based storage maintains state between sessions
- **Safe Implementation**: No command execution vulnerabilities
- **Simple CLI**: Intuitive commands for state management

## Installation

The system is automatically integrated into your bashrc. No additional installation needed.

## Usage

### Basic Commands
```bash
buddy set working    # Change to working state
buddy set idle       # Change to idle state  
buddy set error      # Change to error state
buddy mute           # Toggle mute mode
buddy status         # Show current status
buddy show           # Show full ASCII display
```

### States
- **Idle**: `^_^` Ready to help
- **Working**: `¬_¬` Working hard  
- **Muted**: `-_-` Taking a nap
- **Error**: `?_?` Something's wrong

## Architecture

```
buddy-system/
├── clib-core.js     # Core state management
├── README.md         # Project documentation
└── scripts/
    ├── buddy-cli.js          # CLI interface
    └── buddy-prompt-safe.js  # Safe prompt integration
```

## Files

- **Core Logic**: `projects/buddy-system/clib-core.js`
- **CLI Interface**: `scripts/buddy-cli.js`  
- **Prompt Integration**: `scripts/buddy-prompt-safe.js`
- **State Storage**: `memory/buddy_state.json`
- **Bash Integration**: `~/.bashrc` (PROMPT_COMMAND section)

## Technical Details

### PROMPT_COMMAND Integration
The system uses bash's `PROMPT_COMMAND` to update the status before each prompt display, ensuring real-time updates without caching issues.

### State Persistence
State is stored in `memory/buddy_state.json` with atomic writes and proper error handling.

### Safety Features
- No colons in prompt output (prevents command execution)
- Proper error fallbacks
- File permission controls
- Graceful degradation

## Development

The system was developed on 2026-04-06 with a focus on:
1. Clean architecture and separation of concerns
2. Real-time dynamic updates  
3. Safety and reliability
4. User-friendly interface

## License

Part of the OpenClaw workspace. Free to use and modify.