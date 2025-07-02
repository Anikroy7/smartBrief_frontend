import toast from "react-hot-toast";
import { useDeleteUserMutation } from "../../../redux/api/authApi";

export default function DeleteUserModal({ confirmUserId }: { confirmUserId: string | null }) {
    const [deleteUser] = useDeleteUserMutation();

    const handleDeleteUser = async () => {
        if (!confirmUserId) return;

        try {
            await deleteUser(confirmUserId).unwrap();
            toast.success("User deleted");
        } catch  {
            toast.error("Failed to delete user");
        }
    };

    return (
        <>
            <dialog id="delete_confirm_modal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Are you sure?</h3>
                    <p className="py-4">You are about to delete this user. This action cannot be undone.</p>
                    <div className="modal-action">
                        <form method="dialog" className="flex gap-3">
                            <button className="btn">Cancel</button>
                            <button
                                type="button"
                                className="btn btn-error"
                                onClick={() => {
                                    handleDeleteUser();
                                    const modal = document.getElementById("delete_confirm_modal") as HTMLDialogElement | null;
                                    modal?.close();
                                }}
                            >
                                Confirm Delete
                            </button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    )
}
