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
    // The /config row is current before any turn and after an effort change; the last request's is the fallback.
    const row = (await $.config.list()).find(r => /effort/i.test(r.key))
    const level = row?.value ?? (await read($, effort))

    const label = level == null || level === '' ? model : `${model} · ${String(level)}`

    // A tree here draws under the engine's line, so the label goes in as the line's own first row.
    return next({ ...e, props: { ...e.props, hint: `${label}\n${e.props.hint}` } })
  })
}
