import { apiFetch } from './api';

export type Branch = {
  id: number;
  name: string;
  address?: string;
  phone?: string;
};
// Fetch all branches
export async function fetchBranches(): Promise<Branch[]> {
  try {
    // apiFetch attaches Authorization header (token) and handles errors consistently
    return await apiFetch<Branch[]>('/branches');
  } catch (err: any) {
    console.error('fetchBranches error:', err);
    // rethrow to let caller handle UI
    throw err;
}
}