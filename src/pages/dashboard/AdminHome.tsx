import { useGetUsersQuery } from "../../redux/api/authApi";
import { FileText, Coins } from "lucide-react";
import { useGetUserSummariesQuery } from "../../redux/api/summaryApi";

const AdminHome = () => {

  const { data: summariesData, isLoading: summariesLoading } = useGetUserSummariesQuery(undefined);
  const { data: usersData, isLoading: userLoading } = useGetUsersQuery(undefined);

  const totalSummaries = summariesData?.data?.length || 0;
  const totaUsers= usersData?.data?.length 

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Dashboard Overview</h2>

      {(summariesLoading || userLoading) ? (
        <div className="text-gray-500">Loading dashboard data...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* Total Summaries */}
          <div className="bg-gradient-to-br from-sky-500 to-blue-600 text-white p-6 rounded-2xl shadow-md flex items-center gap-4">
            <FileText className="w-10 h-10" />
            <div>
              <p className="text-lg font-semibold">Total Summaries</p>
              <p className="text-3xl font-bold">{totalSummaries}</p>
            </div>
          </div>

          {/* Credits */}
          <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 text-white p-6 rounded-2xl shadow-md flex items-center gap-4">
            <Coins className="w-10 h-10" />
            <div>
              <p className="text-lg font-semibold">Total users</p>
              <p className="text-3xl font-bold">{totaUsers}</p>
            </div>
          </div>
        </div>
      )}

      <div className="mt-8 ">
        Welcome to your dashboard! Here you can manage your users, summaries.
      </div>
    </div>
  );
};

export default AdminHome;
