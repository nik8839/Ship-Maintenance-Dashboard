import React, { createContext, useContext, useEffect, useState } from 'react';

const JobsContext = createContext();

export const JobsProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const storedJobs = JSON.parse(localStorage.getItem("jobs")) || [];
    setJobs(storedJobs);
  }, []);

  const saveJobs = (updatedJobs) => {
    setJobs(updatedJobs);
    localStorage.setItem("jobs", JSON.stringify(updatedJobs));
  };

  const addJob = (job) => {
    const updatedJobs = [...jobs, job];
    saveJobs(updatedJobs);
  };

  const updateJob = (jobId, updatedFields) => {
    const updatedJobs = jobs.map((job) =>
      job.id === jobId ? { ...job, ...updatedFields } : job
    );
    saveJobs(updatedJobs);
  };

  const deleteJob = (jobId) => {
    const updatedJobs = jobs.filter((job) => job.id !== jobId);
    saveJobs(updatedJobs);
  };

  return (
    <JobsContext.Provider value={{ jobs, addJob, updateJob, deleteJob }}>
      {children}
    </JobsContext.Provider>
  );
};

export const useJobs = () => useContext(JobsContext);
