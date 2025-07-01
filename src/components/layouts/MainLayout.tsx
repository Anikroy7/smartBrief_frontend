import { Toaster } from "react-hot-toast";
import Navbar from "../shared/Navbar";
import { useAppDispatch } from "../../redux/hook";
import { useEffect } from "react";
import { setUser } from "../../redux/features/authSlice";

export default function MainLayout({ children }: { children: React.ReactNode }) {

    const dispatch = useAppDispatch()
    //login condition
    const storedUserInfo = localStorage.getItem('userInfo');
    const userInfo = storedUserInfo ? JSON.parse(storedUserInfo) : null;

    useEffect(() => {
        if (userInfo?.email) {
            // console.log('from main layout, ', userInfo)
            dispatch(setUser({ ...userInfo }));
        }
    }, [userInfo])

    return (
        <>
            <Navbar />
            {children}
            <Toaster />
            <footer className="footer footer-center p-4 bg-base-300 text-base-content">
                <div>
                    <p>Copyright © 2023 - All right reserved</p>
                </div>
            </footer>
        </>
    )
}
