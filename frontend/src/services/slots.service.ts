import { apiFetch } from './api';
import type { Slot } from '../types/index';

// fetch available slots for a branch on a specific date
export async function fetchSlots(branchId: number, date?: string): Promise<Slot[]> {
  const q = new URLSearchParams();
  if (branchId) q.set('branchId', String(branchId));
  if (date) q.set('date', date);
  const path = '/slots' + (q.toString() ? `?${q.toString()}` : '');
  return apiFetch<Slot[]>(path);
}