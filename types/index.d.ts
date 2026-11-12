export type Effort = string | null

declare module 'claude-code' {
  interface PluginState {
    'model-effort-line': { effort: Effort }
  }
}
