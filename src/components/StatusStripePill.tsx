import type { ComponentPropsWithoutRef, ReactNode } from "react";
import type { StatusPillTone } from "../ui/statusPill";
import { statusStripePillClassName } from "../ui/statusPill";

export type StatusStripePillProps = {
  tone: StatusPillTone;
  variant?: "badge" | "filter";
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<"span">, "children">;

/**
 * Shared status chip: neutral frame + left stripe + light tint (matches sensor tile language).
 */
export default function StatusStripePill({
  tone,
  variant = "badge",
  className,
  children,
  ...rest
}: StatusStripePillProps) {
  return (
    <span
      className={[statusStripePillClassName(tone, variant), className].filter(Boolean).join(" ")}
      {...rest}
    >
      {children}
    </span>
  );
}
