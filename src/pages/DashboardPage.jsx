import { useJobs } from '../contexts/JobsContext';
import { useShips } from '../contexts/ShipsContext';

const DashboardPage = () => {
  const { jobs } = useJobs();
  const { ships } = useShips();
  const allComponents = ships.flatMap(ship => ship.components || []);



  const totalShips = ships.length;
  const jobsInProgress = jobs.filter(j => j.status === 'In Progress').length;
  const jobsCompleted = jobs.filter(j => j.status === 'Completed').length;

  const overdueComponents = allComponents.filter(c => {
    const job = jobs.find(j => j.componentId === c.id);
    if (!job) return false;
    return new Date(job.scheduledDate) < new Date() && job.status !== 'Completed';
  });

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold">KPIs Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-4 shadow">Total Ships: {totalShips}</div>
        <div className="bg-white rounded-xl p-4 shadow">Jobs In Progress: {jobsInProgress}</div>
        <div className="bg-white rounded-xl p-4 shadow">Jobs Completed: {jobsCompleted}</div>
      </div>

     <div className="mt-6">
  <h3 className="text-xl font-bold">Components with Overdue Maintenance:</h3>
  {overdueComponents.length > 0 ? (
    <ul className="list-disc pl-6 space-y-2">
      {overdueComponents.map((comp) => {
        const ship = ships.find((ship) =>
          ship.components?.some((c) => c.id === comp.id)
        );

        const job = jobs.find((j) => j.componentId === comp.id);

        return (
          <li key={comp.id}>
            <div><strong>Component:</strong> {comp.name}</div>
            <div><strong>Ship:</strong> {ship?.name || "Unknown Ship"}</div>
            <div><strong>Scheduled Date:</strong> {new Date(job?.scheduledDate).toLocaleDateString()}</div>
            <div><strong>Status:</strong> {job?.status || "Unknown"}</div>
          </li>
        );
      })}
    </ul>
  ) : (
    <p>None</p>
  )}
</div>

    </div>
  );
};

export default DashboardPage;
