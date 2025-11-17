import React, { useState } from 'react';
import { bookAppointment } from '../../services/appointments.service';

type Props = {
  slotId?: number;
  onBooked?: (confirmationCode: string) => void;
};

export default function BookingForm({ slotId, onBooked }: Props) {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!slotId) {
      setError('No slot selected');
      return;
    }
    setLoading(true);
    try {
      const res: any = await bookAppointment({
        slotId,
        customerName: name,
        customerContact: contact,
      });
      // Try common response shapes
      const confirmation = res?.confirmationCode || res?.confirmation || res?.data?.confirmationCode || String(res);
      onBooked?.(confirmation);
      alert('Booked — confirmation: ' + confirmation);
    } catch (err: any) {
      setError(err?.message || 'Booking failed');
    } finally {
      setLoading(false);
    }
  }

   return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className="block text-sm text-gray-600">Full Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="auth-input"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-600">Contact Number</label>
        <input
          type="text"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          required
          className="auth-input"
        />
      </div>

      {error && (
        <div
          className="auth-success"
          style={{ background: '#ffebee', color: '#c62828' }}
        >
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="auth-primary"
        style={{ width: '100%' }}
      >
        {loading ? 'Booking...' : 'Continue'}
      </button>
    </form>
  );
}
