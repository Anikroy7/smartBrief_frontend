import { useGetMyInfoQuery } from "../../redux/api/authApi";
import { FileText } from "lucide-react";
import { useGetMySummariesQuery } from "../../redux/api/summaryApi";

const UserHome = () => {


    const { data: usersData, isLoading: userLoading } = useGetMyInfoQuery(undefined);
    const { data: summariesData, isLoading: summariesLoading } = useGetMySummariesQuery(undefined);

    const totalSummaries = summariesData?.data?.length || 0;
    console.log(usersData)
    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-6">Dashboard Overview</h2>

            {(userLoading || summariesLoading) ? (
                <div className="text-gray-500">Loading dashboard data...</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {/* Total Summaries */}
                    <div className="bg-gradient-to-br from-sky-500 to-green-600 text-white p-6 rounded-2xl shadow-md flex items-center gap-4">
                        <FileText className="w-10 h-10" />
                        <div>
                            <p className="text-lg font-semibold">Total Summaries</p>
                            <p className="text-3xl font-bold">{totalSummaries}</p>
                        </div>
                    </div>
                    <div className="bg-gradient-to-br from-sky-500 to-blue-600 text-white p-6 rounded-2xl shadow-md flex items-center gap-4">
                        <FileText className="w-10 h-10" />
                        <div>
                            <p className="text-lg font-semibold">Total Credits</p>
                            <p className="text-3xl font-bold">{usersData?.data?.credits}</p>
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

export default UserHome;
