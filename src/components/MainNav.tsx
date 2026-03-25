import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { getStatusPillToneClasses } from "../ui/statusPill";

const SEGMENT_TAP = { scale: 0.94 as const };
const SEGMENT_TAP_TRANSITION = { type: "spring" as const, stiffness: 520, damping: 32 };
const PILL_LAYOUT_TRANSITION = { type: "spring" as const, stiffness: 400, damping: 30 };
const LABEL_SPRING = { type: "spring" as const, stiffness: 450, damping: 28 };

type MainNavProps = {
  alertCount: number;
  alertsNavAriaLabel: string;
};

export default function MainNav({ alertCount, alertsNavAriaLabel }: MainNavProps) {
  return (
    <nav
      className="border-border flex flex-wrap items-center gap-3 border-l pl-6 max-sm:w-full max-sm:border-l-0 max-sm:border-t max-sm:pt-2 max-sm:pl-0"
      aria-label="Main"
    >
      <div className="inline-flex flex-wrap items-center gap-3">
        <motion.div className="inline-block" whileTap={SEGMENT_TAP} transition={SEGMENT_TAP_TRANSITION}>
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              [
                "relative z-10 inline-flex min-h-[2.5rem] items-center rounded-control px-3 py-2 text-sm font-medium outline-none transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:min-h-[2.75rem]",
                isActive
                  ? "text-foreground ring-1 ring-transparent hover:ring-accent/40"
                  : "text-muted-foreground hover:bg-card hover:text-foreground"
              ].join(" ")
            }
          >
            {({ isActive }) => (
              <>
                {isActive ? (
                  <motion.div
                    layoutId="main-nav-active"
                    className="border-border bg-background absolute inset-0 rounded-control border"
                    transition={PILL_LAYOUT_TRANSITION}
                    aria-hidden
                  />
                ) : null}
                <motion.span
                  className="relative z-10"
                  initial={false}
                  animate={{
                    opacity: isActive ? 1 : 0.45,
                    scale: isActive ? 1 : 0.92
                  }}
                  transition={LABEL_SPRING}
                >
                  Sites
                </motion.span>
              </>
            )}
          </NavLink>
        </motion.div>

        <motion.div className="inline-block" whileTap={SEGMENT_TAP} transition={SEGMENT_TAP_TRANSITION}>
          <NavLink
            to="/alerts"
            aria-label={alertsNavAriaLabel}
            className={({ isActive }) =>
              [
                "relative z-10 inline-flex min-h-[2.5rem] items-center gap-2 rounded-control px-3 py-2 text-sm font-medium outline-none transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:min-h-[2.75rem]",
                isActive
                  ? "text-foreground ring-1 ring-transparent hover:ring-accent/40"
                  : "text-muted-foreground hover:bg-card hover:text-foreground"
              ].join(" ")
            }
          >
            {({ isActive }) => (
              <>
                {isActive ? (
                  <motion.div
                    layoutId="main-nav-active"
                    className="border-border bg-background absolute inset-0 rounded-control border"
                    transition={PILL_LAYOUT_TRANSITION}
                    aria-hidden
                  />
                ) : null}
                <span className="relative z-10 flex items-center gap-2">
                  <motion.span
                    initial={false}
                    animate={{
                      opacity: isActive ? 1 : 0.45,
                      scale: isActive ? 1 : 0.92
                    }}
                    transition={LABEL_SPRING}
                  >
                    Alerts
                  </motion.span>
                  {alertCount > 0 ? (
                    <span
                      className={[
                        "inline-flex min-w-[1.25rem] items-center justify-center rounded-full border px-1.5 py-0.5 text-xs font-medium tabular-nums",
                        getStatusPillToneClasses("critical")
                      ].join(" ")}
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
    </nav>
  );
}
