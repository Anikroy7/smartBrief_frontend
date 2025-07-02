import React from 'react'
import { useUpdateSummaryMutation } from '../../../redux/api/summaryApi';
import type { TSummary } from '../../../types';
import toast from 'react-hot-toast';

export default function EditSummaryModal({ summary, setShowEditModal , editedSummary, setEditedSummary }: { summary: TSummary, setShowEditModal: React.Dispatch<React.SetStateAction<boolean>>, editedSummary: string, setEditedSummary: React.Dispatch<React.SetStateAction<string>> }) {


    const [updateSummary, { isLoading: updating }] = useUpdateSummaryMutation();


    const handleUpdate = async () => {
        try {
            await updateSummary({
                summaryId: summary._id!,
                updatedData: { summaryText: editedSummary },
            }).unwrap();
            toast.success("Summary updated");
            setShowEditModal(false);
        } catch (err) {
            toast.error("Failed to update summary");
        }
    };
    return (
        <>
            <dialog open className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Edit Summary</h3>
                    <textarea
                        className="textarea w-full mt-4"
                        rows={6}
                        value={editedSummary}
                        onChange={(e) => setEditedSummary(e.target.value)}
                    />
                    <div className="modal-action">
                        <button className="btn" onClick={() => setShowEditModal(false)}>
                            Cancel
                        </button>
                        <button
                            className="btn btn-success"
                            onClick={handleUpdate}
                            disabled={updating}
                        >
                            {updating ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                </div>
            </dialog>
        </>
    )
}
