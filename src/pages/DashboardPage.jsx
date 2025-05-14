import { useJobs } from "../contexts/JobsContext";
import { useShips } from "../contexts/ShipsContext";
import { useAuth } from "../contexts/AuthContext";
import { Link, Outlet } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";

const DashboardPage = () => {
  const { jobs } = useJobs();
  const { ships } = useShips();
  const { logout } = useAuth();
  const allComponents = ships.flatMap((ship) => ship.components || []);

  console.log("All components:", allComponents);
  console.log("Jobs:", jobs);

  const totalShips = ships.length;
  const jobsInProgress = jobs.filter((j) => j.status === "In Progress").length;
  const jobsCompleted = jobs.filter((j) => j.status === "Completed").length;

  const overdueComponents = allComponents.filter((c) => {
    const job = jobs.find((j) => j.componentId === c.id);
    console.log("Checking component:", c);
    console.log("Associated job:", job);
    if (!job) return false;
    const isOverdue =
      new Date(job.scheduledDate) < new Date() && job.status !== "Completed";
    console.log("Is overdue:", isOverdue);
    return isOverdue;
  });

  return (
    <ProtectedRoute permission="canAccessDashboard">
      <div className="p-6 space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex-1 text-center">
            <h2 className="text-2xl font-bold"> Dashboard</h2>
          </div>
          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 flex-none"
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            to="/dashboard/jobs"
            className="bg-blue-500 text-white p-4 rounded-lg shadow hover:bg-blue-600"
          >
            Manage Jobs
          </Link>
          <Link
            to="/ships"
            className="bg-green-500 text-white p-4 rounded-lg shadow hover:bg-green-600"
          >
            Manage Ships
          </Link>
          <Link
            to="/dashboard/calendar"
            className="bg-purple-500 text-white p-4 rounded-lg shadow hover:bg-purple-600"
          >
            View Calendar
          </Link>
        </div>

        {/* Render nested routes */}
        <Outlet />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-4 shadow">
            Total Ships: {totalShips}
          </div>
          <div className="bg-white rounded-xl p-4 shadow">
            Jobs In Progress: {jobsInProgress}
          </div>
          <div className="bg-white rounded-xl p-4 shadow">
            Jobs Completed: {jobsCompleted}
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-bold">
            Components with Overdue Maintenance:
          </h3>
          {overdueComponents.length > 0 ? (
            <ul className="list-disc pl-6 space-y-2">
              {overdueComponents.map((comp) => {
                const ship = ships.find((ship) =>
                  ship.components?.some((c) => c.id === comp.id)
                );

                const job = jobs.find((j) => j.componentId === comp.id);

                return (
                  <li key={comp.id}>
                    <div>
                      <strong>Component:</strong> {comp.name}
                    </div>
                    <div>
                      <strong>Ship:</strong> {ship?.name || "Unknown Ship"}
                    </div>
                    <div>
                      <strong>Scheduled Date:</strong>{" "}
                      {new Date(job?.scheduledDate).toLocaleDateString()}
                    </div>
                    <div>
                      <strong>Status:</strong> {job?.status || "Unknown"}
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p>None</p>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default DashboardPage;
