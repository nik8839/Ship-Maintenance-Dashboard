import React from 'react';
import JobList from '../components/Jobs/JobList';
import JobForm from '../components/Jobs/JobForm';

const JobsPage = () => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Maintenance Jobs</h2>
      <JobForm />
      <JobList />
    </div>
  );
};

export default JobsPage;
