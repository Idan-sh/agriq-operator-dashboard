export default function AppFooter() {
  return (
    <footer
      role="contentinfo"
      aria-label="Site footer"
      className="border-border mt-auto border-t px-5 py-6"
    >
      <div className="text-muted-foreground mx-auto flex max-w-6xl flex-col gap-2 text-xs leading-relaxed sm:flex-row sm:items-center sm:justify-between">
        <p className="m-0">Pilewatch Operator — grain storage monitoring</p>
        <p className="m-0">Demonstration: mock data only (not connected to live sensors)</p>
      </div>
    </footer>
  );
}
