import { useState } from "react";
import toast from "react-hot-toast";
import { useUpdateUserMutation } from "../../../redux/api/authApi";

type Props = {
    userId: string;
    currentCredits?: number;
    setShowRechargeModal: (val: boolean) => void;
};

export default function RechargeCreditModal({
    userId,
    currentCredits = 0,
    setShowRechargeModal,
}: Props) {
    const [credit, setCredit] = useState<number>(0);
    const [updateUser, { isLoading }] = useUpdateUserMutation();
    console.log(userId);
    const handleRecharge = async () => {
        if (credit <= 0) {
            toast.error("Credit must be greater than 0");
            return;
        }

        try {
            await updateUser({
                userId,
                userData: {
                    $inc: { credits: credit },
                },
            }).unwrap();

            toast.success(`Credited ${credit} credits`);
            setShowRechargeModal(false);
        } catch (err) {
            toast.error("Failed to recharge credits");
        }
    };

    return (
        <dialog open className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Recharge Credits</h3>
                <p className="text-sm mb-2">Current credits: {currentCredits}</p>
                <input
                    type="number"
                    className="input input-bordered w-full"
                    placeholder="Enter credit amount"
                    value={credit}
                    onChange={(e) => setCredit(parseInt(e.target.value))}
                />
                <div className="modal-action">
                    <button className="btn" onClick={() => setShowRechargeModal(false)}>
                        Cancel
                    </button>
                    <button
                        className="btn btn-primary"
                        onClick={handleRecharge}
                        disabled={isLoading}
                    >
                        {isLoading ? "Recharging..." : "Recharge"}
                    </button>
                </div>
            </div>
        </dialog>
    );
}
