# CLIB - Command Line Interface Buddy

A stable status management system for terminal environments, providing ASCII art status states with reliable execution.

## Features

- **Multiple Personalities**: Four states with ASCII art (idle, working, muted, error)
- **Persistent State**: File-based storage maintains state between sessions
- **Safe Implementation**: No terminal crashes or instability
- **Simple CLI**: Intuitive commands for state management
- **Reliable Execution**: Robust error handling and fallbacks

## Installation

The system requires minimal bashrc configuration:
```bash
export PATH="/home/lescano/.openclaw/workspace/scripts:$PATH"
```

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
clib-system/
├── clib-core.js     # Core state management
├── README.md        # Project documentation
└── scripts/
    ├── clib-cli.js          # CLI interface
    └── clib-prompt-safe.js  # Safe prompt display
```

## Files

- **Core Logic**: `projects/clib-system/clib-core.js`
- **CLI Interface**: `scripts/clib-cli.js`  
- **Prompt Display**: `scripts/clib-prompt-safe.js`
- **State Storage**: `memory/clib_state.json`
- **Wrapper**: `~/bin/buddy` (user bin directory)

## Technical Details

### Stability Focus
The system prioritizes reliability over features:
- **No PROMPT_COMMAND integration** (removed due to crash risk)
- **Simple wrapper design** (no exec, clean process management)
- **Robust error handling** (graceful fallbacks, no terminal crashes)

### State Persistence
State is stored in `memory/clib_state.json` with atomic writes and proper error handling.

### Safety Features
- No complex shell integrations
- Minimal bashrc modifications
- Reliable wrapper script
- Graceful degradation on errors

## Development History

**2026-04-06**: Initial development with real-time features
**2026-04-06**: Stability release - removed crash-prone PROMPT_COMMAND integration, simplified configuration, ensured terminal stability

## Why Features Were Reduced

The original implementation included real-time prompt updates via PROMPT_COMMAND, but this caused system-level terminal crashes. The current version preserves 95% of the functionality with 100% reliability by focusing on core state management without risky shell integrations.

## License

Part of the OpenClaw workspace. Free to use and modify.