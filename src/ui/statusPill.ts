import type { AlertSeverity, PileStatus } from '../types'

/** Tone for status stripe pills (sensor-tile language: neutral frame + left stripe + light tint). */
export type StatusPillTone = 'ok' | 'warn' | 'critical'

/**
 * Shared class recipe for {@link StatusStripePill} and interactive parents (e.g. filter buttons).
 */
export function statusStripePillClassName(
  tone: StatusPillTone,
  variant: 'badge' | 'filter'
): string {
  const pad =
    variant === 'filter' ? 'min-h-[2rem] px-2.5 py-1.5' : 'px-2 py-0.5'
  const base = [
    'inline-flex shrink-0 items-center rounded-surface border border-border text-xs font-medium tabular-nums',
    pad
  ].join(' ')
  switch (tone) {
    case 'critical':
      return `${base} border-l-4 border-l-status-critical bg-status-critical/10 text-foreground`
    case 'warn':
      return `${base} border-l-4 border-l-status-warn bg-status-warn/10 text-foreground`
    case 'ok':
      return `${base} border-l-4 border-l-status-ok bg-status-ok/10 text-status-ok`
  }
}

export function pileStatusToTone(status: PileStatus): StatusPillTone {
  switch (status) {
    case 'OK':
      return 'ok'
    case 'Warning':
      return 'warn'
    case 'Critical':
      return 'critical'
  }
}

export function alertSeverityToTone(severity: AlertSeverity): StatusPillTone {
  return severity === 'critical' ? 'critical' : 'warn'
}
