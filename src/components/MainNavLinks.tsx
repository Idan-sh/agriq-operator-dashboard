import { motion, useReducedMotion } from "framer-motion";
import { useCallback } from "react";
import { NavLink } from "react-router-dom";

const SEGMENT_TAP = { scale: 0.94 as const };
const SEGMENT_TAP_TRANSITION = { type: "spring" as const, stiffness: 520, damping: 32 };
const PILL_LAYOUT_TRANSITION = { type: "spring" as const, stiffness: 400, damping: 30 };

export type MainNavLinksProps = {
  alertCount: number;
  alertsNavAriaLabel: string;
  variant: "desktop" | "mobile";
  /** Close mobile menu after navigation */
  onNavigate?: () => void;
};

export default function MainNavLinks({
  alertCount,
  alertsNavAriaLabel,
  variant,
  onNavigate
}: MainNavLinksProps) {
  const reducedMotion = useReducedMotion();

  const handleNavigate = useCallback(() => {
    onNavigate?.();
  }, [onNavigate]);

  if (variant === "mobile") {
    return (
      <ul className="m-0 flex list-none flex-col gap-1 p-0">
        <li>
          <NavLink
            to="/"
            end
            onClick={handleNavigate}
            className={({ isActive }) =>
              [
                "block rounded-control px-3 py-3 text-base font-medium outline-none transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                isActive ? "bg-accent-soft text-foreground" : "text-foreground hover:bg-accent-soft"
              ].join(" ")
            }
          >
            Sites
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/alerts"
            aria-label={alertsNavAriaLabel}
            onClick={handleNavigate}
            className={({ isActive }) =>
              [
                "flex items-center gap-3 rounded-control px-3 py-3 text-base font-medium outline-none transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                isActive ? "bg-accent-soft text-foreground" : "text-foreground hover:bg-accent-soft"
              ].join(" ")
            }
          >
            <span>Alerts</span>
            {alertCount > 0 ? (
              <span
                className="border-border bg-card text-muted-foreground inline-flex min-w-[1.25rem] items-center justify-center rounded-full border px-1.5 py-0.5 text-xs font-medium tabular-nums"
                aria-hidden
              >
                {alertCount}
              </span>
            ) : null}
          </NavLink>
        </li>
      </ul>
    );
  }

  const tapTransition = reducedMotion ? { duration: 0 } : SEGMENT_TAP_TRANSITION;
  const pillTransition = reducedMotion ? { duration: 0 } : PILL_LAYOUT_TRANSITION;

  return (
    <div className="inline-flex flex-wrap items-center gap-2">
      <motion.div
        className="inline-block shrink-0"
        whileTap={reducedMotion ? undefined : SEGMENT_TAP}
        transition={tapTransition}
      >
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            [
              "group relative z-10 inline-flex min-h-9 shrink-0 items-center rounded-control px-2.5 py-1.5 text-sm font-medium outline-none transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              isActive ? "text-foreground" : "text-foreground hover:bg-accent-soft"
            ].join(" ")
          }
        >
          {({ isActive }) => (
            <>
              {isActive ? (
                <motion.div
                  layoutId="main-nav-active"
                  className="border-border bg-background group-hover:bg-accent-soft absolute inset-0 rounded-control border transition-colors duration-150"
                  transition={pillTransition}
                  aria-hidden
                />
              ) : null}
              <span className="relative z-10">Sites</span>
            </>
          )}
        </NavLink>
      </motion.div>

      <motion.div
        className="inline-block shrink-0"
        whileTap={reducedMotion ? undefined : SEGMENT_TAP}
        transition={tapTransition}
      >
        <NavLink
          to="/alerts"
          aria-label={alertsNavAriaLabel}
          className={({ isActive }) =>
            [
              "group relative z-10 inline-flex min-h-9 shrink-0 items-center gap-2 rounded-control px-2.5 py-1.5 text-sm font-medium outline-none transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              isActive ? "text-foreground" : "text-foreground hover:bg-accent-soft"
            ].join(" ")
          }
        >
          {({ isActive }) => (
            <>
              {isActive ? (
                <motion.div
                  layoutId="main-nav-active"
                  className="border-border bg-background group-hover:bg-accent-soft absolute inset-0 rounded-control border transition-colors duration-150"
                  transition={pillTransition}
                  aria-hidden
                />
              ) : null}
              <span className="relative z-10 flex items-center gap-2">
                <span>Alerts</span>
                {alertCount > 0 ? (
                  <span
                    className="border-border bg-card text-muted-foreground inline-flex min-w-[1.25rem] items-center justify-center rounded-full border px-1.5 py-0.5 text-xs font-medium tabular-nums"
                    aria-hidden
                  >
                    {alertCount}
                  </span>
                ) : null}
              </span>
            </>
          )}
        </NavLink>
      </motion.div>
    </div>
  );
}
