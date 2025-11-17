import { useEffect, useState } from 'react';
import { fetchBranches, type Branch } from '../../services/branches.service';
import BranchCard from './BranchCard';

type Props = {
  onSelect?: (id: number) => void;
  manualList?: Branch[]; 
};

export default function BranchList({ onSelect, manualList }: Props) {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (manualList) {
      setBranches(manualList);
      return;
    }
    setLoading(true);
    fetchBranches()
      .then(setBranches)
      .catch((e: any) => setError(e?.message || 'Failed to load branches'))
      .finally(() => setLoading(false));
  }, [manualList]);

  if (loading) return <div>Loading branches…</div>;
  if (error) return <div className="text-red-600">{error}</div>;
  if (!branches || branches.length === 0) return <div className="text-gray-500">No branches found</div>;

  return (
    <div className="space-y-3">
      {branches.map((b) => (
        <BranchCard key={b.id} branch={b} onSelect={onSelect} />
      ))}
    </div>
  );
}
