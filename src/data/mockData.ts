/**
 * Task 2 mock data: hardcode the assignment table (Emek North / South / East / West).
 * TODO: populate from the agriQ take-home PDF.
 */

export type PileStatus = 'OK' | 'Warning' | 'Critical'

export interface PileMock {
  id: string
  name: string
  status: PileStatus
}

export const MOCK_PILES: PileMock[] = []
