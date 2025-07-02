
import { useGetUserSummariesQuery } from '../../redux/api/summaryApi';
import type { TSummary } from '../../types';
import SummaryCard from '../summary/SummaryCard';

const AllSmmaries = () => {

  const { data: summariesData } = useGetUserSummariesQuery(undefined);
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">All Summaries</h2>
      {summariesData?.data?.length === 0 ? (
        <p>No summaries yet.</p>
      ) : (
        summariesData?.data?.map((summary:TSummary) => (
          <SummaryCard key={summary._id} summary={summary} />
        ))
      )}
    </div>
  );
};

export default AllSmmaries;
