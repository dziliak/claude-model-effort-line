import { atom, read, update } from 'claude-code'
import type { Register } from 'claude-code'

// The effort the last main-loop request was sent with; null before the first turn.
const effort = atom({ plugin: 'model-effort-line', key: 'effort' } as const, null)

export const register: Register = on => {
  on('turn.step', async function* ($, e, next) {
    if (e.agentId === undefined) {
      const sent = e.effort === undefined ? null : String(e.effort)
      await update($, effort, () => sent)
    }

    return yield* next(e)
  })

  on('ui.render', { component: 'PromptHint' }, async ($, e, next) => {
    const model = await $.session.model()
    // The model's saved effort is current before any turn and after a change; the last request's is the fallback.
    // shortcut: an effort set for this session only shows the saved one, read the last request's first if that matters.
    const saved = (await $.settings.read({ key: 'modelSettings' })) as Record<string, { effortLevel?: string }> | undefined
    const level = saved?.[model]?.effortLevel ?? (await read($, effort))

    const label = level == null || level === '' ? model : `${model} · ${String(level)}`

    // A tree here draws under the engine's line, so the label goes in as the line's own first row.
    return next({ ...e, props: { ...e.props, hint: `${label}\n${e.props.hint}` } })
  })
}
