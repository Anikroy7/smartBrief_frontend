import { useState } from "react";
import type { TSummary } from "../../types";
import moment from "moment";
import EditSummaryModal from "../../components/ui/modal/EditSummaryModal";
import DeleteSummaryModal from "../../components/ui/modal/DeleteSummaryModal";
import RePromptModal from "../../components/ui/modal/RePromptModal";
import { useAppSelector } from "../../redux/hook";

export default function SummaryCard({ summary }: { summary: TSummary }) {
    const { role } = useAppSelector((state) => state.auth);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [editedSummary, setEditedSummary] = useState(summary.summaryText || "");
    const [showRePromptModal, setShowRePromptModal] = useState(false);



    return (
        <>
            <div key={summary._id} className="border rounded p-4 shadow bg-base-100">
                <p className="text-sm text-gray-500">
                    Created: {moment(summary.createdAt).format("LLL")} | Updated:{" "}
                    {moment(summary.updatedAt).fromNow()}
                </p>
                <p className="text-sm">
                    Word Count: Original: {summary.originalText.split(" ").length}, Summary:{" "}
                    {summary.summaryText?.split(" ").length || 0}
                </p>
                <p className="text-sm my-2">
                    Prompt: {summary.prompt}
                </p>

                <p className="mt-2 whitespace-pre-wrap">{summary.summaryText}</p>

                <div className="flex gap-3 mt-3">

                    {(role === "admin" || role === "editor" || role === "user") && (
                        <>
                            <button
                                className="btn btn-sm btn-outline"
                                onClick={() => setShowRePromptModal(true)}
                            >
                                Re-prompt
                            </button>
                            <button
                                className="btn btn-sm btn-warning"
                                onClick={() => {
                                    setEditedSummary(summary.summaryText || "");
                                    setShowEditModal(true);
                                }}
                            >
                                Edit
                            </button>
                            <button
                                className="btn btn-sm btn-error"
                                onClick={() => setShowDeleteModal(true)}
                            >
                                Delete
                            </button>
                        </>)}
                </div>
            </div>

            {/* Edit Modal */}
            {showEditModal && (
                <EditSummaryModal setShowEditModal={setShowEditModal} summary={summary} editedSummary={editedSummary} setEditedSummary={setEditedSummary} />
            )}

            {/* Delete Modal */}
            {showDeleteModal && (
                <DeleteSummaryModal summary={summary} setShowDeleteModal={setShowDeleteModal} />
            )}

            {/* RePrompt Modal */}
            {showRePromptModal && (
                <RePromptModal summary={summary} setShowRePromptModal={setShowRePromptModal} />
            )}

        </>
    );
}
