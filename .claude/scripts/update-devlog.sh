#!/bin/bash
# Hook PostToolUse — appelé par Claude Code après chaque outil Bash.
# Si la commande contenait "git commit", ajoute une entrée horodatée dans DEVLOG.md.

REPO="/Users/juh/Documents/GitHub/juh-ecomm"
DEVLOG="$REPO/.claude/DEVLOG.md"

INPUT=$(cat)
COMMAND=$(python3 -c "
import sys, json
try:
    d = json.load(sys.stdin)
    print(d.get('tool_input', {}).get('command', ''))
except:
    print('')
" <<< "$INPUT" 2>/dev/null || echo "")

if echo "$COMMAND" | grep -qE "git commit"; then
    DATE=$(date '+%Y-%m-%d %H:%M')
    BRANCH=$(git -C "$REPO" rev-parse --abbrev-ref HEAD 2>/dev/null || echo "?")
    LAST_COMMIT=$(git -C "$REPO" log --oneline -1 2>/dev/null || echo "?")

    printf "\n#### %s — \`%s\`\n- %s\n" "$DATE" "$BRANCH" "$LAST_COMMIT" >> "$DEVLOG"
fi
