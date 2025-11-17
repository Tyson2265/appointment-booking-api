import React, { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";

type Booking = {
  code: string;
  branchName: string;
  serviceName: string;
  slotTime: string;
  date: string;
  status: string;
  customerName: string;
  customerEmail: string;
};

interface BookingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingCode: string | null;
}

const BookingsModal: React.FC<BookingsModalProps> = ({ isOpen, onClose, bookingCode }) => {
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(false);

  console.log("BookingsModal booking:", booking);

  useEffect(() => {
    if (isOpen && bookingCode) {
      setLoading(true);
      fetch(`/api/appointment/${bookingCode}`)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch booking details");
          return res.json();
        })
        .then((data) => {
          console.log(data);  
          setBooking(data);
        })    
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [isOpen, bookingCode]);

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-lg rounded-2xl bg-white p-6 shadow-xl">
          <Dialog.Title className="text-xl font-semibold mb-4 text-gray-800">
            Booking Details
          </Dialog.Title>

          {loading ? (
            <p>Loading...</p>
          ) : booking ? (
            <div className="space-y-2">
              <p><strong>Code:</strong> {booking.code}</p>
              <p><strong>Branch:</strong> {booking.branchName}</p>
              <p><strong>Service:</strong> {booking.serviceName}</p>
              <p><strong>Date:</strong> {booking.date}</p>
              <p><strong>Time:</strong> {booking.slotTime}</p>
              <p><strong>Status:</strong> {booking.status}</p>
              <p><strong>Name:</strong> {booking.customerName}</p>
              <p><strong>Email:</strong> {booking.customerEmail}</p>
            </div>
          ) : (
            <p className="text-gray-500">No booking details found.</p>
          )}

          <div className="mt-6 text-right">
            <button
              onClick={onClose}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default BookingsModal;
