import { apiFetch } from './api';

// book a new appointment
export async function bookAppointment(payload: any) {
  return apiFetch('/appointments', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
}

// fetch appointments by confirmation code
export async function fetchAppointmentByConfirmation(confirmationCode: string) {
  return apiFetch(`/appointments/${encodeURIComponent(confirmationCode)}`, {
    method: 'GET',
  }
);
}