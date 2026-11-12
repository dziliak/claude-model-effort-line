# claude-model-effort-line

A Claude Code mod that shows the current model and effort level at the left of the footer, on the line with the permission mode (`⏵⏵ auto mode on`).

The model is the main loop's, as `/model` shows it. The effort comes from the `/config` effort row when there is one, otherwise from the effort the last request was sent with, so it can appear only after the first turn.

## Install

At the prompt of a terminal session:

```
/plugin install model-effort-line --marketplace dziliak/claude-model-effort-line
```

Answer `y` to add the marketplace, then pick a scope.

From a shell:

```
claude plugin install model-effort-line --marketplace dziliak/claude-model-effort-line
```

In the desktop app, where `/plugin` does not run: click + next to the prompt box, then Plugins, Add marketplace with `dziliak/claude-model-effort-line`, then Add plugin.

This repository is private: the install works only for people who can read it on GitHub and whose machine already holds a git credential for github.com (an SSH key, or `gh auth login` then `gh auth setup-git`).
