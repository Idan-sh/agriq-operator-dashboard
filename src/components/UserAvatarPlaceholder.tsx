import { User } from "lucide-react";
import Tooltip from "./Tooltip";

/** Circular profile placeholder until a real photo or account flow exists. */
export default function UserAvatarPlaceholder() {
  return (
    <Tooltip content="Not signed in" variant="chrome">
      <div
        className="border-border bg-card text-muted-foreground flex size-10 shrink-0 items-center justify-center rounded-full border shadow-panel sm:size-12"
        aria-hidden
      >
        <User className="size-5 sm:size-6" strokeWidth={1.75} aria-hidden />
      </div>
    </Tooltip>
  );
}
