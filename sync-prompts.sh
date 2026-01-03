#!/bin/bash

# ==============================================================================
# SYNC GITHUB COPILOT PROMPTS & AGENTS TO CLAUDE
# Maps .github/prompts/*.prompt.md -> .claude/commands/*.md
# Maps .github/agents/*.agent.md   -> .claude/agents/*.md
# ==============================================================================

# 1. Define Directories
GITHUB_PROMPTS=".github/prompts"
GITHUB_AGENTS=".github/agents"
CLAUDE_COMMANDS=".claude/commands"
CLAUDE_AGENTS=".claude/agents"

# Helper function to create symlinks
link_files() {
    local src_dir=$1
    local dest_dir=$2
    local src_ext=$3   # e.g., ".prompt.md"
    local dest_ext=".md"

    echo "📂 Scanning $src_dir..."

    if [ ! -d "$src_dir" ]; then
        echo "   ⚠️  Source directory '$src_dir' not found. Skipping."
        return
    fi

    # Ensure destination exists
    mkdir -p "$dest_dir"

    # Loop through source files
    count=0
    for src_file in "$src_dir"/*"$src_ext"; do
        # Check if glob matched nothing
        [ -e "$src_file" ] || continue

        # 1. Extract filename (e.g., "refactor.prompt.md")
        filename=$(basename "$src_file")
        
        # 2. Extract base name (e.g., "refactor")
        base_name="${filename%$src_ext}"
        
        # 3. Define target path (e.g., ".claude/commands/refactor.md")
        target_file="$dest_dir/$base_name$dest_ext"

        # 4. Define relative path for the symlink (points back to github folder)
        # We assume .claude/xyz is 2 levels deep, so we go up 2 levels (../../)
        rel_path="../../$src_file"

        # SAFETY CHECK: If target exists and is a REAL file (not a symlink), skip it
        if [ -f "$target_file" ] && [ ! -L "$target_file" ]; then
            echo "   ❌ SKIPPED: '$target_file' is a real file. Rename or delete it to sync."
            continue
        fi

        # Create/Update the Symlink
        # -s = symbolic, -f = force (update existing links), -n = treat dest as file if it is a link to directory
        ln -snf "$rel_path" "$target_file"
        echo "   ✅ Linked: $base_name ($src_ext) → $target_file"
        ((count++))
    done

    if [ $count -eq 0 ]; then
        echo "   (No files found to sync)"
    fi
    echo ""
}

echo "=========================================="
echo "🔄 Syncing GitHub Copilot to Claude Code..."
echo "=========================================="

# Run Sync for Commands
link_files "$GITHUB_PROMPTS" "$CLAUDE_COMMANDS" ".prompt.md"

# Run Sync for Agents
link_files "$GITHUB_AGENTS" "$CLAUDE_AGENTS" ".agent.md"

echo "🎉 Done!"