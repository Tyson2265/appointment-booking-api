import type { Slot } from '../../types';
import { formatTime } from '../../utils/format';

type Props = {
  slot: Slot;
  selected?: boolean;
  onSelect?: (s: Slot) => void;
};

export default function SlotItem({ slot, selected, onSelect }: Props) {
  return (
    <button
      onClick={() => onSelect?.(slot)}
      className={`w-full text-left p-3 rounded-md border ${selected ? 'bg-orange-600 text-white' : 'bg-white'}`}
      aria-pressed={selected}
    >
      <div className="font-medium">{formatTime(slot.startTime)}</div>
      <div className="text-xs text-gray-500">{new Date(slot.startTime).toDateString()}</div>
    </button>
  );
}