import { useEffect, useState } from 'react';
import SlotList from '../features copy/slots/SlotList';
import BookingForm from '../features copy/appointments/BookingForm';
import { fetchSlots } from '../services/slots.service';
import { fetchBranches , type Branch  } from '../services/branches.service';
import type { Slot } from '../types';
import '../styles/auth.css';

function addDays(iso: string, days: number) {
  const d = new Date(iso);
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

export default function Booking() {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [selectedBranchId, setSelectedBranchId] = useState<number>(Number);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [date, setDate] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [confirmation, setConfirmation] = useState<string | null>(null);

  // Load all branches on mount
  useEffect(() => {
    async function loadBranches() {
      try {
        const data = await fetchBranches();
        setBranches(data);
        if (data && data.length > 0) setSelectedBranchId(data[0].id); // default to first branch
      } catch (err: any) {
        setError('Failed to load branches');
        console.error(err);
      }
    }
    loadBranches();
  }, []);

  // Load slots when branch or date changes
  useEffect(() => {
    if (!selectedBranchId) return;

    let cancelled = false;

    async function loadSlots() {
      setLoading(true);
      setError(null);
      setSlots([]);
      try {
        if (date) {
          const data = await fetchSlots(selectedBranchId, date);
          if (!cancelled) setSlots(data || []);
          return;
        }

        // If no date selected, auto find next available date with slots
        const todayIso = new Date().toISOString().slice(0, 10);
        for (let i = 0; i <= 30; i++) {
          const probeDate = addDays(todayIso, i);
          const data = await fetchSlots(selectedBranchId, probeDate);
          if (data && data.length > 0) {
            if (!cancelled) {
              setDate(probeDate);
              setSlots(data);
            }
            return;
          }
        }
      } catch (e: any) {
        if (!cancelled) setError(e.message || 'Failed to load slots');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadSlots();
    return () => {
      cancelled = true;
    };
  }, [selectedBranchId, date]);

  return (
    <div className="branches-container">
      <div className="branches-inner">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {/* Left Side - Intro */}
          <div className="auth-hero">
            <div style={{ fontSize: 14, opacity: 0.9 }}>Capitec Appointments</div>
            <h2 style={{ fontSize: 28, opacity: 0.95 }}>Available Slots</h2>
            <p>Choose a branch and date to view available slots and make a booking.</p>
          </div>

          {/* Right Side - Slot selection and booking */}
          <div className="list-card">
            <h3 className="text-lg font-semibold mb-3">Select Branch</h3>
            <select
              className="auth-input mb-4"
              value={selectedBranchId ?? ''}
              onChange={(e) => {
                setSelectedBranchId(Number(e.target.value));
                setDate('');
                setSlots([]);
                setSelectedSlot(null);
                setShowBookingForm(false);
              }}
            >
              {branches.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>

            {/* Date picker */}
            <div className="mb-4 flex items-center gap-3">
              <label className="text-sm text-gray-600">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                  setSelectedSlot(null);
                  setShowBookingForm(false);
                }}
                className="auth-input"
                style={{ maxWidth: 200 }}
              />
              <button
                onClick={() => {
                  setDate('');
                  setSelectedSlot(null);
                  setShowBookingForm(false);
                  setConfirmation(null);
                }}
                className="auth-secondary"
              >
                Auto
              </button>
            </div>

            {/* Slots Display */}
            {loading ? (
              <div className="text-center py-8">Loading available slots…</div>
            ) : error ? (
              <div className="auth-error">{error}</div>
            ) : !showBookingForm ? (
              <>
                <SlotList
                  slots={slots}
                  selectedId={selectedSlot?.id ?? null}
                  onSelect={setSelectedSlot}
                />
                <div className="mt-4">
                  <button
                    disabled={!selectedSlot}
                    className="auth-primary"
                    onClick={() => selectedSlot && setShowBookingForm(true)}
                    style={{
                      opacity: selectedSlot ? 1 : 0.6,
                      cursor: selectedSlot ? 'pointer' : 'not-allowed',
                    }}
                  >
                    Book Selected Slot
                  </button>
                </div>
                {slots.length === 0 && (
                  <div className="mt-3 text-sm text-gray-500 text-center">
                    No slots found for the next 30 days.
                  </div>
                )}
              </>
            ) : (
              selectedSlot && (
                <BookingForm
                  slotId={Number(selectedSlot.id)}
                  onBooked={(code) => {
                    setConfirmation(code);
                    setSelectedSlot(null);
                    setShowBookingForm(false);
                  }}
                />
              )
            )}

            {confirmation && (
              <div className="mt-4 text-center text-green-600 font-medium">
                Booking confirmed! Code: {confirmation}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
