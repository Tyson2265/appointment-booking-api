import SlotItem from './SlotItem';
import type { Slot } from '../../types';

type Props = {
  slots: Slot[];
  selectedId?: string | number | null;
  onSelect?: (s: Slot) => void;
  columns?: number;
};

export default function SlotList({ slots, selectedId, onSelect, columns = 3 }: Props) {
  if (!slots || slots.length === 0) {
    return <div className="p-4 text-center text-gray-500">No available slots</div>;
  }

  const colsClass = `grid grid-cols-1 sm:grid-cols-2 md:grid-cols-${columns} gap-3`;

  return (
    <div className={colsClass}>
      {slots.map((s) => (
        <SlotItem key={String(s.id)} slot={s} selected={selectedId === s.id} onSelect={onSelect} />
      ))}
    </div>
  );
}