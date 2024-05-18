import React, {useEffect, useState} from 'react';
import Calendar from './Calendar';
import {addMonths, endOfMonth, startOfYear} from "date-fns";
import './App.css';
import {Holiday} from "./Models/Holidays";
import axios from "axios";

const App: React.FC = () => {
  const monthsShown = 5;

  const [startMonth, setStartMonth] = useState(startOfYear(new Date()));
  const [endMonth, setEndMonth] = useState(endOfMonth(addMonths(startMonth, monthsShown)));
  const [holidays, setHolidays] = useState<Holiday[]>([]);

  useEffect(() => {
    axios.get(`http://localhost:3001/api/holidays`, {
      params: {
          startDate: startMonth,
          endDate: endMonth,
      },
    })
        .then((response) => {
          let holidays = response.data.filter((holiday: Holiday) => holiday.nationalHoliday);

          setHolidays(holidays);
        })
        .catch((error) => {
          console.error('Error fetching holidays', error);
          setHolidays([])
        });
  }, [startMonth, endMonth]);

  const handleBack = () => {
    setStartMonth(prevStart => {
      const newStart = new Date(prevStart);
      newStart.setMonth(newStart.getMonth() - monthsShown);
      return newStart;
    });
    setEndMonth(prevEnd => {
      const newEnd = new Date(prevEnd);
      newEnd.setMonth(newEnd.getMonth() - monthsShown);
      return newEnd;
    });
  };

  const handleForward = () => {
    setStartMonth(prevStart => {
      const newStart = new Date(prevStart);
      newStart.setMonth(newStart.getMonth() + monthsShown);
      return newStart;
    });
    setEndMonth(prevEnd => {
      const newEnd = new Date(prevEnd);
      newEnd.setMonth(newEnd.getMonth() + monthsShown);
      return newEnd;
    });
  };

  return (
      <div className="App">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px' }}>
          <button onClick={handleBack}>Previous months</button>
          <h1>Holiday Calendar</h1>
          <button onClick={handleForward}>Next months</button>
        </div>
        <Calendar startMonth={startMonth} endMonth={endMonth} holidays={holidays} />
      </div>
  );
};

export default App;