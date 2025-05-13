import MaintenanceCalendar from '../components/Calendar/MaintenanceCalendar';
import JobList from '../components/Jobs/JobList';
import { useState } from 'react';

const MaintenanceCalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Maintenance Calendar</h2>

      <MaintenanceCalendar onSelectDate={setSelectedDate} />

      {selectedDate && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">
            Jobs on {selectedDate.toDateString()}:
          </h3>
          <JobList filterDate={selectedDate} />
        </div>
      )}
    </div>
  );
};

export default MaintenanceCalendarPage;
