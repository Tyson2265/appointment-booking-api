import { useLocation } from 'react-router-dom';

type LocationState = {
  confirmation?: string;
};

export default function Confirmation() {
  const { state } = useLocation();
  const s = (state as LocationState) || {};
  const code = s.confirmation ?? null;



  //const reverse = (str: string) => str.split('').reverse().join('');  

  return (
    <div className="max-w-md">
      <h2 className="text-xl font-semibold mb-4">Booking confirmed</h2>
      {code ? (
        <div>
          <p className="mb-2">Your confirmation code:</p>
          <div className="p-3 bg-green-50 border rounded font-mono">{code}</div>
        </div>
      ) : (
        <p>No confirmation code available. Check your email or bookings lookup.</p>
      )}
    </div>
  );
}