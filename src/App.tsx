import { useMemo } from "react";
import { Outlet } from "react-router-dom";
import AppFooter from "./components/AppFooter";
import MainNav from "./components/MainNav";
import ThemeSelect from "./components/ThemeSelect";
import { getActiveAlerts } from "./data/mockData";

export default function App() {
  const alertCount = useMemo(() => getActiveAlerts().length, []);

  const alertsNavAriaLabel = useMemo(
    () => (alertCount > 0 ? `Alerts, ${alertCount} active` : "Alerts"),
    [alertCount]
  );

  return (
    <div className="text-foreground flex min-h-0 flex-1 flex-col">
      <a
        href="#main-content"
        className="focus-visible:ring-accent bg-background text-foreground border-border fixed left-4 top-4 z-50 -translate-y-20 rounded-control border px-3 py-2 text-sm font-medium opacity-0 transition-transform focus:translate-y-0 focus:opacity-100 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        Skip to main content
      </a>
      <header className="border-border flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-b px-5 py-4">
        <div className="flex min-w-0 flex-wrap items-center gap-x-6 gap-y-2">
          <p className="font-display text-foreground m-0 shrink-0 text-2xl font-bold tracking-tight">
            agriQ Operator
          </p>
          <MainNav alertCount={alertCount} alertsNavAriaLabel={alertsNavAriaLabel} />
        </div>
        <ThemeSelect />
      </header>
      <main
        id="main-content"
        tabIndex={-1}
        className="mx-auto w-full max-w-6xl flex-1 scroll-mt-4 px-5 py-8 outline-none"
      >
        <Outlet />
      </main>
      <AppFooter />
    </div>
  );
}
