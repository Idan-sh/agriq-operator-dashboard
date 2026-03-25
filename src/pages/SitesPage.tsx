import { useCallback, useId, useMemo, useState } from "react";
import DropdownSelect from "../components/DropdownSelect";
import SitesPileDetailPanel from "../components/sites/SitesPileDetailPanel";
import SitesPileList from "../components/sites/SitesPileList";
import { sortPilesByStatusThenName } from "../domain/pileOrdering";
import { getPileById, getPilesForSite, getSiteById, getSites } from "../data/mockData";
import type { PileStatusFilter } from "../types";

export default function SitesPage() {
  const sites = useMemo(() => getSites(), []);

  const [selectedSiteId, setSelectedSiteId] = useState<string>(() => getSites()[0]?.id ?? "");

  const sortedPiles = useMemo(() => {
    if (!selectedSiteId) return [];
    return sortPilesByStatusThenName(getPilesForSite(selectedSiteId));
  }, [selectedSiteId]);

  const [statusFilter, setStatusFilter] = useState<PileStatusFilter>("all");
  const visiblePiles = useMemo(() => {
    if (statusFilter === "all") return sortedPiles;
    return sortedPiles.filter((p) => p.status === statusFilter);
  }, [sortedPiles, statusFilter]);

  const [selectedId, setSelectedId] = useState<string | null>(() => {
    const sid = getSites()[0]?.id;
    if (!sid) return null;
    const sorted = sortPilesByStatusThenName(getPilesForSite(sid));
    return sorted[0]?.id ?? null;
  });

  const selectedSite = useMemo(
    () => (selectedSiteId ? getSiteById(selectedSiteId) : undefined),
    [selectedSiteId]
  );

  const handleSiteSelect = useCallback(
    (siteId: string) => {
      setSelectedSiteId(siteId);
      const sorted = sortPilesByStatusThenName(getPilesForSite(siteId));
      const nextVisible =
        statusFilter === "all" ? sorted : sorted.filter((p) => p.status === statusFilter);
      setSelectedId((prev) => {
        if (prev != null && nextVisible.some((p) => p.id === prev)) return prev;
        return nextVisible[0]?.id ?? null;
      });
    },
    [statusFilter]
  );

  const handlePileSelect = useCallback((pileId: string) => {
    setSelectedId(pileId);
  }, []);

  /** One commit: new filter + selection that stays on the same pile when possible, else first visible. */
  const handleStatusFilterChange = useCallback(
    (next: PileStatusFilter) => {
      const nextVisible =
        next === "all" ? sortedPiles : sortedPiles.filter((p) => p.status === next);
      setStatusFilter(next);
      setSelectedId((prev) => {
        if (prev != null && nextVisible.some((p) => p.id === prev)) return prev;
        return nextVisible[0]?.id ?? null;
      });
    },
    [sortedPiles]
  );

  const handleShowAllPilesClick = useCallback(() => {
    handleStatusFilterChange("all");
  }, [handleStatusFilterChange]);

  const selected = useMemo(() => (selectedId ? getPileById(selectedId) : undefined), [selectedId]);

  const listSelectedId = selectedId ?? "";
  const siteSelectId = useId();

  const siteOptions = useMemo(() => sites.map((s) => ({ value: s.id, label: s.name })), [sites]);

  return (
    <div>
      <h1 className="text-foreground mb-2 text-2xl font-semibold tracking-tight">Sites</h1>
      <p className="text-muted-foreground mb-4 max-w-2xl text-base">
        <span className="text-foreground font-medium">Storage site</span> is the facility. One{" "}
        <span className="text-foreground font-medium">cell</span> is a single storage room. A{" "}
        <span className="text-foreground font-medium">pile</span> is a grain stack in that cell.
        Select a pile to see all thirty sensors (bottom, middle, top). Colored edges on a sensor tile
        highlight readings that need attention (amber or red). Safe readings use a plain tile.
      </p>
      <p className="text-muted-foreground mb-8 max-w-2xl border-border border-l-2 pl-3 text-xs leading-relaxed">
        <span className="text-foreground font-medium">How to read the numbers</span> — Each value is
        checked against safe limits. Stronger-looking text means a more serious reading. On a
        computer, hover a dotted value for the band name (OK, warning, or critical). On a phone or
        tablet, tap the value instead. Sensors that need attention may show a short message in the
        tile.
      </p>

      <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <div className="mb-3">
            <DropdownSelect
              id={siteSelectId}
              label="Storage site"
              value={selectedSiteId}
              options={siteOptions}
              onChange={handleSiteSelect}
            />
          </div>
          {selectedSite?.locationLine ? (
            <p className="text-muted-foreground mb-3 text-sm">{selectedSite.locationLine}</p>
          ) : null}
          <SitesPileList
            piles={visiblePiles}
            selectedId={listSelectedId}
            onPileSelect={handlePileSelect}
            statusFilter={statusFilter}
            onStatusFilterChange={handleStatusFilterChange}
          />
        </div>
        <div className="lg:col-span-7">
          {selected && selectedSite ? (
            <SitesPileDetailPanel pile={selected} site={selectedSite} />
          ) : visiblePiles.length === 0 ? (
            <div className="flex flex-col gap-3">
              <p className="text-muted-foreground m-0">No piles match this filter.</p>
              {statusFilter !== "all" ? (
                <button
                  type="button"
                  onClick={handleShowAllPilesClick}
                  className="text-foreground border-border bg-background hover:bg-card focus-visible:ring-accent self-start rounded-control border px-3 py-2 text-sm font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  Show all piles
                </button>
              ) : null}
            </div>
          ) : (
            <p className="text-muted-foreground">Select a pile to view sensors.</p>
          )}
        </div>
      </div>
    </div>
  );
}
