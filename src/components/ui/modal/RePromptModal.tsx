import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  useLazyGetSummaryQuery,
  useRePromptSummaryMutation,
} from "../../../redux/api/summaryApi";
import type { TSummary } from "../../../types";

type Props = {
  summary: TSummary;
  setShowRePromptModal: (value: boolean) => void;
};

export default function RePromptModal({ summary, setShowRePromptModal }: Props) {
  const [prompt, setPrompt] = useState(summary.prompt || "Summarize it again");
  const [rePromptSummary, { isLoading: isSubmitting }] = useRePromptSummaryMutation();
  const [summaryId, setSummaryId] = useState<string | null>(null);
  const [polling, setPolling] = useState(false);
  const [triggerGetSummary] = useLazyGetSummaryQuery();

  const isButtonDisabled = isSubmitting || polling;

  const handleRePrompt = async () => {
    try {
      const res = await rePromptSummary({
        _id: summary._id,
        prompt,
        status: "pending",
        originalText: summary.originalText,
      }).unwrap();

      const newId = res?.data?._id;
      if (!newId) throw new Error("No summary ID returned from server");

      setSummaryId(newId);
      setPolling(true);
      toast.success("Submitted. Waiting for response...");
    } catch (err) {
      toast.error("Failed to re-prompt");
    }
  };

  useEffect(() => {
    if (!summaryId || !polling) return;

    const interval = setInterval(async () => {
      try {
        const res = await triggerGetSummary(summaryId).unwrap();

        if (res?.data?.status === "completed") {
          toast.success("Summary completed");
          setPolling(false);
          clearInterval(interval);
          setShowRePromptModal(false);
        } else if (res?.data?.status === "failed") {
          toast.error("Summarization failed.");
          setPolling(false);
          clearInterval(interval);
          setShowRePromptModal(false);
        }
      } catch (err) {
        console.error(err);
        toast.error("Polling error");
        setPolling(false);
        clearInterval(interval);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [summaryId, polling]);

  return (
    <dialog open className="modal">
      <div className="modal-box max-w-3xl">
        <h3 className="font-bold text-lg">Re-prompt Summary</h3>

        <div className="mt-4">
          <p className="text-sm font-semibold mb-1">Original Text:</p>
          <div className="p-3 bg-base-200 rounded overflow-y-auto max-h-48 whitespace-pre-wrap text-sm border">
            {summary.originalText}
          </div>
        </div>

        <div className="mt-4">
          <p className="text-sm font-semibold mb-1">New Prompt:</p>
          <textarea
            className="textarea textarea-bordered w-full"
            rows={4}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={isButtonDisabled}
          />
        </div>

        <div className="modal-action">
          <button
            className="btn"
            onClick={() => setShowRePromptModal(false)}
            disabled={isButtonDisabled}
          >
            Cancel
          </button>
          <button
            className="btn btn-primary"
            onClick={handleRePrompt}
            disabled={isButtonDisabled}
          >
            {isSubmitting
              ? "Submitting..."
              : polling
              ? "Waiting for result..."
              : "Submit"}
          </button>
        </div>
      </div>
    </dialog>
  );
}
