import React from 'react'
import { useDeleteSummaryMutation } from '../../../redux/api/summaryApi';
import type { TSummary } from '../../../types';
import toast from 'react-hot-toast';

export default function DeleteSummaryModal({ summary, setShowDeleteModal }: { summary: TSummary, setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>> }) {
    const [deleteSummary, { isLoading: deleting }] = useDeleteSummaryMutation();


    // Delete handler
    const handleDelete = async () => {
        try {
            await deleteSummary(summary._id!).unwrap();
            toast.success("Summary deleted");
            setShowDeleteModal(false);
        } catch {
            toast.error("Failed to delete summary");
        }
    };
    return (
        <>
            <dialog open className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg text-red-600">Confirm Delete</h3>
                    <p className="py-4">
                        Are you sure you want to delete this summary? This action cannot be undone.
                    </p>
                    <div className="modal-action">
                        <button className="btn" onClick={() => setShowDeleteModal(false)}>
                            Cancel
                        </button>
                        <button
                            className="btn btn-error"
                            onClick={handleDelete}
                            disabled={deleting}
                        >
                            {deleting ? "Deleting..." : "Confirm Delete"}
                        </button>
                    </div>
                </div>
            </dialog>
        </>
    )
}
