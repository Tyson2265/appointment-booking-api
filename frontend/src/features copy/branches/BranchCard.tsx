import type { Branch } from '../../services/branches.service';

type Props = {
  branch: Branch;
  onSelect?: (id: number) => void;
};

export default function BranchCard({ branch, onSelect }: Props) {
  return (
    <div className="p-3 border rounded flex items-start justify-between">
      <div>
        <div className="font-medium">{branch.name}</div>
        {branch.address && <div className="text-sm text-gray-500">{branch.address}</div>}
      </div>
      {onSelect && (
        <button
          onClick={() => onSelect(branch.id)}
          className="ml-4 px-3 py-1 text-sm rounded border bg-gray-50"
        >
          Select
        </button>
      )}
    </div>
  );
}