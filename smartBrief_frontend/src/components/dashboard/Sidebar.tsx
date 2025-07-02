
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../redux/hook'

export default function Sidebar() {
    const userInfo = useAppSelector(state => state.auth);
    const paths = location.pathname.split("/");
    console.log('userInfo,', userInfo);

    return (
        <>
            {/* Sidebar */}
            <div className="drawer-side z-50">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <ul className="menu p-4 w-72 min-h-full bg-base-100 text-base-content">
                    <div className="font-bold text-2xl text-center mb-4">
                        <Link to="/">SmartBrief</Link>
                    </div>

                    <li>
                        <Link
                            to="/dashboard"
                            className={`btn btn-wide justify-start mt-2 hover:bg-gray-900 hover:text-white ${paths.length < 3 && "bg-black text-white"
                                }`}
                        >
                            Dashboard
                        </Link>
                    </li>

                    <li>
                        <Link
                            to="/dashboard/summaries"
                            className={`btn btn-wide justify-start mt-2 hover:bg-gray-900 hover:text-white ${paths.includes("summaries") && "bg-black text-white"
                                }`}
                        >
                            Summary Management
                        </Link>
                    </li>

                    {userInfo?.role === "admin" && (
                        <li>
                            <Link
                                to="/dashboard/users"
                                className={`btn btn-wide justify-start mt-2 hover:bg-gray-900 hover:text-white ${paths.includes("users") && "bg-black text-white"
                                    }`}
                            >
                                User Management
                            </Link>
                        </li>
                    )}
                </ul>
            </div>
        </>
    )
}
