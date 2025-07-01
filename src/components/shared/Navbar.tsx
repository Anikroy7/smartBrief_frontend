import { Link } from "react-router-dom";


const Navbar = () => {

    const isLoggedIn = false;
    const role = 'guest';

    return (
        <div className="navbar bg-base-100 shadow-md">
            <div className="flex-1">
                <Link to="/" className="text-xl font-bold">
                    SmartBrief
                </Link>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1 gap-2">
                    <li><Link to="/dashboard">Dashboard</Link></li>

                    {isLoggedIn && (
                        <>
                            <li><Link to="/summarize">Summarize</Link></li>
                            <li><Link to="/history">History</Link></li>
                            <li><Link to="/credits">Credits</Link></li>

                            {/* Role-based items */}
                            {role === 'admin' && (
                                <li><Link  to="/admin/users">User Management</Link></li>
                            )}
                            {(role === 'admin' || role === 'editor') && (
                                <li><Link to="/admin/summaries">Manage Summaries</Link></li>
                            )}
                            {role === 'reviewer' && (
                                <li><Link to="/review/summaries">All Summaries</Link></li>
                            )}

                            <li><Link to="/profile">Profile</Link></li>
                            <li><Link to="/logout">Logout</Link></li>
                        </>
                    )}

                    {!isLoggedIn && (
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
