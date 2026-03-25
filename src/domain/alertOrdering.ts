import type { AlertSeverity, OperatorAlert } from "../types";

function severityRank(s: AlertSeverity): number {
  return s === "critical" ? 0 : 1;
}

/** Critical first, then warning; same severity sorted by pile name. */
export function sortAlertsBySeverityThenPile(alerts: OperatorAlert[]): OperatorAlert[] {
  return [...alerts].sort((a, b) => {
    const bySev = severityRank(a.severity) - severityRank(b.severity);
    if (bySev !== 0) return bySev;
    return a.pileName.localeCompare(b.pileName, undefined, { sensitivity: "base" });
  });
}
