import { useLayoutEffect, useMemo, useRef, useState } from "react";
import type { OperatorAlert } from "../../types";
import { alertSeverityToTone, getStatusPillToneClasses } from "../../ui/statusPill";

function severityLabel(severity: OperatorAlert["severity"]): string {
  return severity === "critical" ? "Critical" : "Warning";
}

function AlertsSummaryBar({ alerts }: { alerts: OperatorAlert[] }) {
  const { critical, warning } = useMemo(() => {
    let c = 0;
    let w = 0;
    for (const a of alerts) {
      if (a.severity === "critical") c += 1;
      else w += 1;
    }
    return { critical: c, warning: w };
  }, [alerts]);

  if (alerts.length === 0) return null;

  return (
    <div className="border-border bg-card mb-6 flex flex-wrap items-center gap-x-6 gap-y-2 rounded-surface border px-4 py-3">
      <p className="text-foreground m-0 text-sm tabular-nums">
        <span className="font-semibold">{alerts.length}</span>{" "}
        <span className="text-muted-foreground font-normal">active alerts</span>
      </p>
      <div className="bg-border hidden h-4 w-px sm:block" aria-hidden />
      <div className="flex flex-wrap items-center gap-3 text-xs">
        <span
          className={[
            "rounded-full border px-2 py-0.5 font-medium tabular-nums",
            getStatusPillToneClasses("critical")
          ].join(" ")}
        >
          {critical} critical
        </span>
        <span
          className={[
            "rounded-full border px-2 py-0.5 font-medium tabular-nums",
            getStatusPillToneClasses("warn")
          ].join(" ")}
        >
          {warning} warning
        </span>
      </div>
    </div>
  );
}

function AlertRow({ alert }: { alert: OperatorAlert }) {
  const leftBorder =
    alert.severity === "critical" ? "border-l-status-critical" : "border-l-status-warn";

  const [isOpen, setIsOpen] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const contentInnerRef = useRef<HTMLDivElement | null>(null);

  // Measure content once so the opening animation can transition smoothly (table cells + `max-height`
  // can otherwise behave inconsistently across browsers).
  useLayoutEffect(() => {
    if (!isOpen) return;
    const el = contentInnerRef.current;
    if (!el) return;
    setContentHeight(el.scrollHeight);
  }, [isOpen]);

  return (
    <tr className="border-border border-b transition-colors last:border-b-0 hover:bg-card/60">
      <td className={["align-top border-l-4 py-3 pl-4 pr-3", leftBorder].join(" ")}>
        <span
          className={[
            "inline-flex whitespace-nowrap rounded-full border px-2 py-0.5 text-xs font-medium",
            getStatusPillToneClasses(alertSeverityToTone(alert.severity))
          ].join(" ")}
        >
          {severityLabel(alert.severity)}
        </span>
      </td>
      <td className="text-foreground align-top py-3 pr-4 text-sm font-medium">{alert.pileName}</td>
      <td className="align-top py-3 pr-4">
        <div className="text-foreground text-sm font-medium leading-snug">{alert.title}</div>
        <p className="text-muted-foreground mt-1 max-w-xl text-xs leading-relaxed">
          {alert.readingSummary}
        </p>
        <div className="border-border text-foreground mt-3 rounded-control border bg-background/80">
          <button
            type="button"
            onClick={() => setIsOpen((v) => !v)}
            className="w-full cursor-pointer list-none px-3 py-2 text-left text-xs font-medium outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            aria-expanded={isOpen}
          >
            Next steps ({alert.nextSteps.length})
          </button>

          <div
            className={[
              "overflow-hidden transition-[height,opacity] duration-200 ease-out",
              "will-change-[height,opacity]",
            ].join(" ")}
            style={{
              height: isOpen ? contentHeight : 0,
              opacity: isOpen ? 1 : 0,
            }}
          >
            <div ref={contentInnerRef}>
              <ol className="text-muted-foreground border-border list-decimal space-y-1.5 border-t px-3 pb-3 pt-3 pl-8 text-xs leading-relaxed">
                {alert.nextSteps.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </td>
      <td className="text-foreground align-top py-3 pr-4 font-mono text-xs leading-relaxed tabular-nums">
        {alert.sensorIds.join(", ")}
      </td>
    </tr>
  );
}

type AlertsPanelProps = {
  alerts: OperatorAlert[];
};

export default function AlertsPanel({ alerts }: AlertsPanelProps) {
  if (alerts.length === 0) {
    return <p className="text-muted-foreground text-sm">No active alerts.</p>;
  }

  return (
    <div
      role="region"
      aria-live="polite"
      aria-label="Active alerts"
    >
      <AlertsSummaryBar alerts={alerts} />
      <div className="border-border overflow-x-auto rounded-surface border bg-background">
        <table className="w-full min-w-[42rem] border-collapse text-left">
          <caption className="sr-only">Active alerts by severity, location, and affected sensors</caption>
          <thead>
            <tr className="border-border bg-card/80 border-b text-xs">
              <th scope="col" className="text-muted-foreground px-4 py-2.5 pr-3 font-medium">
                Severity
              </th>
              <th scope="col" className="text-muted-foreground py-2.5 pr-4 font-medium">
                Location
              </th>
              <th scope="col" className="text-muted-foreground py-2.5 pr-4 font-medium">
                Alert
              </th>
              <th scope="col" className="text-muted-foreground py-2.5 pr-4 font-medium">
                Sensors
              </th>
            </tr>
          </thead>
          <tbody>
            {alerts.map((alert) => (
              <AlertRow key={alert.id} alert={alert} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
