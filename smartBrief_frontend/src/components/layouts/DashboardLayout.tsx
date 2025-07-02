import { Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/hook";
import { Toaster } from "react-hot-toast";
import { logout, setUser } from "../../redux/features/authSlice";
import { Menu } from "lucide-react"; // Lucide icon
import Sidebar from "../dashboard/Sidebar";
import { useEffect } from "react";

export default function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const storedUserInfo = localStorage.getItem("userInfo");
  const userInfo = storedUserInfo ? JSON.parse(storedUserInfo) : null;

  useEffect(() => {
    if (userInfo?.email) {
      dispatch(setUser({ ...userInfo }));
    }
  }, [userInfo]);

  const handleLogout = () => {
    dispatch(logout({}));
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  return (
    <>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          {/* Navbar */}
          <div className="w-full bg-base-200 px-6 py-4 flex justify-between items-center">
            <label htmlFor="my-drawer-2" className="btn btn-ghost drawer-button lg:hidden">
              <Menu className="w-6 h-6" />
            </label>
            <h1 className="text-xl font-bold">Dashboard</h1>
            <button onClick={handleLogout} className="btn btn-sm btn-error text-white">
              Logout
            </button>
          </div>

          {/* Page content */}
          <div className="p-4 overflow-y-auto flex-1">
            <Outlet />
          </div>
        </div>

        {/* Sidebar */}
        <Sidebar />
      </div>

      <Toaster />
    </>
  );
}
