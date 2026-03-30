import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { createPortal } from "react-dom";
import {
  useCallback,
  useEffect,
  useId,
  useState,
  type MouseEvent as ReactMouseEvent
} from "react";
import {
  PANEL_MOTION_TRANSITION,
  REDUCED_MOTION_TRANSITION
} from "../ui/motionShared";
import MainNavLinks from "./MainNavLinks";

type MobileNavMenuProps = {
  alertCount: number;
  alertsNavAriaLabel: string;
};

export default function MobileNavMenu({ alertCount, alertsNavAriaLabel }: MobileNavMenuProps) {
  const menuId = useId();
  const reducedMotion = useReducedMotion();
  const transition = reducedMotion ? REDUCED_MOTION_TRANSITION : PANEL_MOTION_TRANSITION;
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleToggle = useCallback((e: ReactMouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsOpen((o) => !o);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, handleClose]);

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  const headerOffset = "var(--app-header-height, 6rem)";

  return (
    <>
      <button
        type="button"
        className="border-border bg-card text-foreground hover:bg-accent-soft inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-control border shadow-panel outline-none transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        aria-expanded={isOpen}
        aria-controls={menuId}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        onClick={handleToggle}
      >
        {isOpen ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
      </button>

      {createPortal(
        <AnimatePresence>
          {isOpen ? (
            <>
              <motion.button
                key="mobile-nav-backdrop"
                type="button"
                aria-label="Close menu"
                className="fixed left-0 right-0 bottom-0 z-[45] bg-black/40"
                style={{ top: headerOffset }}
                initial={reducedMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={reducedMotion ? undefined : { opacity: 0 }}
                transition={transition}
                onClick={handleClose}
              />

              <motion.div
                key="mobile-nav-panel"
                id={menuId}
                role="navigation"
                aria-label="Main"
                className="fixed left-0 right-0 z-[50] w-full max-h-[min(70vh,calc(100dvh-var(--app-header-height,6rem)-1rem))] overflow-y-auto border-border bg-background border-b shadow-panel"
                style={{ top: headerOffset }}
                initial={reducedMotion ? false : { opacity: 0, y: -14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reducedMotion ? undefined : { opacity: 0, y: -14 }}
                transition={transition}
              >
                <div className="mx-auto max-w-7xl px-5 py-4">
                  <MainNavLinks
                    variant="mobile"
                    alertCount={alertCount}
                    alertsNavAriaLabel={alertsNavAriaLabel}
                    onNavigate={handleClose}
                  />
                </div>
              </motion.div>
            </>
          ) : null}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
