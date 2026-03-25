import type { AlertSeverity, PileStatus } from '../types'

/** Tone for status pill surfaces (badge / chip recipe). */
export type StatusPillTone = 'ok' | 'warn' | 'critical'

/** Border + fill + text for a 1px bordered status pill (15% / 40% recipe). */
export function getStatusPillToneClasses(tone: StatusPillTone): string {
  switch (tone) {
    case 'ok':
      return 'bg-status-ok/15 text-status-ok border-status-ok/40'
    case 'warn':
      return 'bg-status-warn/15 text-status-warn border-status-warn/40'
    case 'critical':
      return 'bg-status-critical/15 text-status-critical border-status-critical/40'
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
