import { User } from "lucide-react";
import Tooltip from "./Tooltip";

/** Circular profile placeholder until a real photo or account flow exists. */
export default function UserAvatarPlaceholder() {
  return (
    <Tooltip content="Not signed in" variant="chrome">
      <div
        className="border-border bg-card text-muted-foreground flex size-9 shrink-0 items-center justify-center rounded-full border shadow-panel sm:size-10"
        aria-hidden
      >
        <User className="size-4 sm:size-[1.125rem]" strokeWidth={1.75} aria-hidden />
      </div>
    </Tooltip>
  );
}
