import React, { useState } from "react";
import { useJobs } from "../../contexts/JobsContext";
import { useAuth } from "../../contexts/AuthContext";
import { useShips } from "../../contexts/ShipsContext";

const JobList = () => {
  const { jobs, updateJob, deleteJob } = useJobs();
  const { user } = useAuth();
  const { ships } = useShips();

  const components = ships.flatMap((ship) => ship.components || []);

  const [filter, setFilter] = useState({ status: "", priority: "" });

  const filteredJobs = jobs.filter((job) => {
    return (
      (!filter.status || job.status === filter.status) &&
      (!filter.priority || job.priority === filter.priority)
    );
  });

  const handleStatusChange = (jobId, newStatus) => {
    updateJob(jobId, { status: newStatus });
  };

  const getEngineerName = (id) => {
    return user && user.id === id ? user.username : "Unknown";
  };

  const getComponentName = (id) => {
    const comp = components.find((c) => c.id === id);
    return comp ? comp.name : "Unknown";
  };

  if (jobs.length === 0) return <p>No jobs available.</p>;

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Jobs List</h3>

      <div className="flex gap-4 mb-4">
        <select
          onChange={(e) => setFilter({ ...filter, status: e.target.value })}
          className="border p-1"
        >
          <option value="">All Statuses</option>
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        <select
          onChange={(e) => setFilter({ ...filter, priority: e.target.value })}
          className="border p-1"
        >
          <option value="">All Priorities</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>

      {filteredJobs.map((job) => (
        <div key={job.id} className="border p-4 rounded mb-2">
          <p>
            <strong>Component:</strong> {getComponentName(job.componentId)}
          </p>
          <p>
            <strong>Job Type:</strong> {job.type}
          </p>
          <p>
            <strong>Priority:</strong> {job.priority}
          </p>
          <p>
            <strong>Status:</strong>
            <select
              value={job.status}
              onChange={(e) => handleStatusChange(job.id, e.target.value)}
              className="ml-2 border p-1"
            >
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </p>
          <p>
            <strong>Engineer:</strong> {getEngineerName(job.assignedEngineerId)}
          </p>
          <p>
            <strong>Scheduled:</strong> {job.scheduledDate}
          </p>
          <button
            onClick={() => deleteJob(job.id)}
            className="text-red-500 text-sm mt-2"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default JobList;
