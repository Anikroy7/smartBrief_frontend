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
