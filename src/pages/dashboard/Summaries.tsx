// pages/dashboard/Summaries.tsx
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../redux/hook';
import { useGetUserSummariesQuery, useDeleteSummaryMutation } from '../../redux/api/summaryApi';
import moment from 'moment';
import toast from 'react-hot-toast';

const Summaries = () => {
  const { userId, role } = useAppSelector(state => state.auth);
  const [summaries, setSummaries] = useState([]);

  const { data: summariesData } = useGetUserSummariesQuery(undefined);
  const [deleteSummary] = useDeleteSummaryMutation();

  console.log(summariesData);

  const handleDelete = async (id: string) => {
    const confirm = window.confirm("Are you sure to delete?");
    if (!confirm) return;

    try {
      await deleteSummary(id);
      setSummaries(prev => prev.filter(summary => summary._id !== id));
      toast.success("Summary deleted!");
    } catch {
      toast.error("Delete failed.");
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Your Summaries</h2>
      {summariesData?.data?.length === 0 ? (
        <p>No summaries yet.</p>
      ) : (
        summariesData?.data?.map(summary => (
          <div key={summary._id} className="border rounded p-4 shadow bg-base-100">
            <p className="text-sm text-gray-500">
              Created: {moment(summary.createdAt).format('LLL')} |
              Updated: {moment(summary.updatedAt).fromNow()}
            </p>
            <p className="text-sm">
              Word Count: Original: {summary.originalText.split(" ").length},
              Summary: {summary.summaryText?.split(" ").length || 0}
            </p>

            <p className="mt-2 whitespace-pre-wrap">{summary.summaryText}</p>

            <div className="flex gap-3 mt-3">
              <button className="btn btn-sm btn-outline" onClick={() => {/* open reprompt modal */ }}>
                Re-prompt
              </button>
              {(role === 'editor' || role === 'admin' || summary.user === userId) && (
                <>
                  <button className="btn btn-sm btn-warning">Edit</button>
                  <button className="btn btn-sm btn-error" onClick={() => handleDelete(summary._id)}>
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Summaries;
