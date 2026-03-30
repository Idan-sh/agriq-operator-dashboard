import MainNavLinks from "./MainNavLinks";

type MainNavProps = {
  alertCount: number;
  alertsNavAriaLabel: string;
};

export default function MainNav({ alertCount, alertsNavAriaLabel }: MainNavProps) {
  return (
    <nav
      className="border-border flex flex-wrap items-center gap-2 border-l pl-4 max-sm:w-full max-sm:border-l-0 max-sm:border-t max-sm:pt-1.5 max-sm:pl-0"
      aria-label="Main"
    >
      <MainNavLinks
        variant="desktop"
        alertCount={alertCount}
        alertsNavAriaLabel={alertsNavAriaLabel}
      />
    </nav>
  );
}
