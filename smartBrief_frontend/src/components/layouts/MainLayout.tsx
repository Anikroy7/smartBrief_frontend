import { Toaster } from "react-hot-toast";
import Navbar from "../shared/Navbar";
import { useAppDispatch } from "../../redux/hook";
import { useEffect } from "react";
import { setUser } from "../../redux/features/authSlice";

export default function MainLayout({ children }: { children: React.ReactNode }) {
    const dispatch = useAppDispatch();

    const storedUserInfo = localStorage.getItem("userInfo");
    const userInfo = storedUserInfo ? JSON.parse(storedUserInfo) : null;

    useEffect(() => {
        if (userInfo?.email) {
            dispatch(setUser({ ...userInfo }));
        }
    }, [userInfo]);

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Toaster />
            <footer className="footer footer-center p-4 bg-base-300 text-base-content">
                <div>
                    <p>Copyright © 2023 - All right reserved</p>
                </div>
            </footer>
        </div>
    );
}
