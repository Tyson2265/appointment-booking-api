import{ useState } from 'react';
import { fetchAppointmentByConfirmation } from '../services/appointments.service';
import type { Appointment } from '../types/Appointment';
import '../../src/styles/auth.css';

export default function Appointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleFetch = async () => {
    if (!confirmationCode) {
      setError('Please enter a confirmation code.');
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const result = await fetchAppointmentByConfirmation(confirmationCode);
      setAppointments(result ? [result] : []);
    } catch (e) {
      console.error(e);
      setError('Failed to fetch appointment. Please check the code.');
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  console.log('Appointments:', appointments);

  return (
    <div className="appointments-page">
      <main className="branches-container">
        <div className="branches-inner">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <div className="auth-hero">
              <div style={{ fontSize: 12, opacity: 0.9 }}>Capitec</div>
              <h2>Appointments</h2>
              <p>Enter your confirmation code to view your appointment.</p>
            </div>
            <div className="list-card">
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Enter confirmation code"
                  value={confirmationCode}
                  onChange={(e) => setConfirmationCode(e.target.value)}
                  className="border p-2 w-full"
                />
                <button
                  onClick={handleFetch}
                  className="mt-2 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
                >
                  Search
                </button>
                {error && <div className="text-red-500 mt-2">{error}</div>}
              </div>

              {loading ? (
                <div className="text-center py-8">Loading…</div>
              ) : appointments.length === 0 ? (
                <div className="text-center py-8 text-gray-500">No appointments found.</div>
              ) : (
                <ul className="space-y-3">
                  {appointments.map((appt) => (
                    <li key={appt.appointmentId} className="appointment-item border p-3 rounded">
                      <div><strong>Customer Name:</strong> {appt.customerName}</div>
                      <div><strong>Contact:</strong> {appt.customerContact}</div>
                      <div><strong>Start Time:</strong> {appt.startTime ?? 'N/A'}</div>
                      <div><strong>Branch:</strong> {appt.branchName} - {appt.branchAddress}</div>
                    
                      <div><strong>Confirmation Code:</strong> {appt.confirmationCode}</div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
