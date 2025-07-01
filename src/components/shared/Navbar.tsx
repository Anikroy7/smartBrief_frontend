import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { logout } from "../../redux/features/authSlice";


const Navbar = () => {

    const user = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();
    const navigate = useNavigate()
    const handleLogout = () => {
        dispatch(logout({}));
        localStorage.removeItem('userInfo');
        navigate('/login')
    }
    console.log(user, 'user in navbar');
    return (
        <div className="navbar bg-base-100 shadow-md">
            <div className="flex-1">
                <Link to="/" className="text-xl font-bold">
                    SmartBrief
                </Link>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1 gap-2">

                    {user?.email && (
                        <>
                            <li><Link to="/dashboard">Dashboard</Link></li>
                            <li><Link to="/summarize">Summarize</Link></li>
                            <li><Link to="/history">History</Link></li>
                            <li><Link to="/credits">Credits</Link></li>

                            {/* Role-based items */}
                            {user.role === 'admin' && (
                                <li><Link to="/admin/users">User Management</Link></li>
                            )}
                            {(user.role === 'admin' || user.role === 'editor') && (
                                <li><Link to="/admin/summaries">Manage Summaries</Link></li>
                            )}
                            {user?.role === 'reviewer' && (
                                <li><Link to="/review/summaries">All Summaries</Link></li>
                            )}

                            <li><Link to="/profile">Profile</Link></li>
                            <li><button onClick={() => handleLogout()} >Logout</button></li>
                        </>
                    )}

                    {!user?.email && (
                        <>
                            <li><Link to="/login">Login</Link></li>
                            <li><Link to="/register">Register</Link></li>
                        </>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Navbar;
