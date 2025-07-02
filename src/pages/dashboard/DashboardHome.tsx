
import { useAppSelector } from "../../redux/hook";
import AdminHome from "./AdminHome";
import UserHome from "./UserHome";

const DashboardHome = () => {
  const userInfo = useAppSelector(state => state.auth);
  return (
    <>
      {userInfo.role === 'admin' ? <AdminHome /> : <UserHome />}
    </>
  );
};

export default DashboardHome;
