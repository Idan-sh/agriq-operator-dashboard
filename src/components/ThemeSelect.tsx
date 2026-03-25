import { motion, useReducedMotion } from "framer-motion";
import { Monitor, Moon, Sun, type LucideIcon } from "lucide-react";
import { useCallback, type MouseEvent } from "react";
import type { ThemePreference } from "../types";
import { useTheme } from "../theme/useTheme";

function isThemePreference(value: string): value is ThemePreference {
  return value === "light" || value === "dark" || value === "system";
}

const OPTIONS: {
  value: ThemePreference;
  label: string;
  Icon: LucideIcon;
}[] = [
  { value: "light", label: "Light theme", Icon: Sun },
  { value: "dark", label: "Dark theme", Icon: Moon },
  { value: "system", label: "Match system theme", Icon: Monitor }
];

export default function ThemeSelect() {
  const { preference, setPreference } = useTheme();
  const reducedMotion = useReducedMotion();

  const handleThemeButtonClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      const raw = event.currentTarget.dataset.theme;
      if (raw == null || !isThemePreference(raw)) return;
      setPreference(raw);
    },
    [setPreference]
  );

  return (
    <fieldset className="m-0 min-w-0 shrink-0 border-0 p-0">
      <legend className="sr-only">Color theme</legend>
      <div className="border-border bg-card inline-flex rounded-panel border p-0.5 shadow-panel">
        {OPTIONS.map(({ value, label, Icon }) => {
          const selected = preference === value;
          return (
            <motion.button
              key={value}
              type="button"
              data-theme={value}
              onClick={handleThemeButtonClick}
              aria-pressed={selected}
              aria-label={label}
              title={label}
              className={`group relative z-10 flex min-w-9 items-center justify-center rounded-control px-2 py-1.5 outline-none transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:px-2.5 ${
                selected ? "" : "hover:bg-accent-soft"
              }`}
              whileTap={reducedMotion ? undefined : { scale: 0.88 }}
              transition={
                reducedMotion
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 520, damping: 32 }
              }
            >
              {selected ? (
                <motion.div
                  layoutId="theme-segment-active"
                  className="border-border bg-background group-hover:bg-accent-soft absolute inset-0 rounded-control border transition-colors duration-150"
                  transition={
                    reducedMotion
                      ? { duration: 0 }
                      : { type: "spring", stiffness: 400, damping: 30 }
                  }
                  aria-hidden
                />
              ) : null}
              <motion.span
                className="relative z-10"
                initial={false}
                animate={{
                  opacity: selected ? 1 : 0.45,
                  scale: selected ? 1 : 0.92
                }}
                transition={
                  reducedMotion
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 450, damping: 28 }
                }
              >
                <Icon
                  className={`size-4 sm:size-[1.125rem] ${
                    selected ? "text-foreground" : "text-muted-foreground"
                  }`}
                  strokeWidth={selected ? 2.25 : 2}
                  aria-hidden
                />
              </motion.span>
            </motion.button>
          );
        })}
      </div>
    </fieldset>
  );
}
