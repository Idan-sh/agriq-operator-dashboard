/** Short panel transitions (fade / slide / scale); Material standard easing, ~150ms. */
export const PANEL_MOTION_TRANSITION = { duration: 0.15, ease: [0.4, 0, 0.2, 1] as const };

/** Use with `useReducedMotion()` so users with “reduce motion” get instant UI. */
export const REDUCED_MOTION_TRANSITION = { duration: 0 } as const;
