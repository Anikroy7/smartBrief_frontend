import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/hook";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { logout, setUser } from "../../redux/features/authSlice";

export default function Dashboard() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const paths = location.pathname.split("/");

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
      <section>
        <div className="flex h-screen">
          {/* Sidebar */}
          <div className="flex-[10%] drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
              <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">
                Open drawer
              </label>
            </div>
            <div className="drawer-side z-40">
              <ul className=" min-h-full w-72 p-4">
                <div className="font-bold text-2xl text-center my-2">
                  <Link to="/">SmartBrief</Link>
                </div>

                <li>
                  <Link
                    to="/dashboard"
                    className={`btn btn-wide justify-start mt-4 hover:bg-gray-900 hover:text-white ${
                      paths.length < 3 && "bg-black text-white"
                    }`}
                  >
                    Dashboard
                  </Link>
                </li>

                <li>
                  <Link
                    to="/dashboard/summaries"
                    className={`btn btn-wide justify-start mt-2 hover:bg-gray-900 hover:text-white ${
                      paths.includes("summaries") && "bg-black text-white"
                    }`}
                  >
                    Summaries
                  </Link>
                </li>

                {userInfo?.role === "admin" && (
                  <li>
                    <Link
                      to="/dashboard/users"
                      className={`btn btn-wide justify-start mt-2 hover:bg-gray-900 hover:text-white ${
                        paths.includes("users") && "bg-black text-white"
                      }`}
                    >
                      User Management
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-[90%] flex flex-col">
            {/* Navbar */}
            <nav className="bg-base-200 px-6 py-4">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold">Dashboard</h1>
               
              </div>
            </nav>

            {/* Page Content */}
            <div className="p-6 overflow-y-auto flex-1">
              <Outlet />
            </div>
          </div>
        </div>
      </section>
      <Toaster />
    </>
  );
}
