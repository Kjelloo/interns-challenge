import React, {useEffect, useState} from 'react';
import Calendar from './Calendar';
import {addMonths, subMonths} from "date-fns";
import './App.css';
import {Holiday} from "./Models/Holidays";
import axios from "axios";

const App: React.FC = () => {
  const [startMonth, setStartMonth] = useState(new Date());
  const [endMonth, setEndMonth] = useState(addMonths(new Date(), 2));
  const [holidays, setHolidays] = useState<Holiday[]>([]);


  useEffect(() => {
    axios.get(`http://localhost:3001/api/holidays`, {
      params: {
          startDate: startMonth,
          endDate: endMonth,
      },
      headers: {
        Authorization: 'Bearer e77248cf-e5d9-474e-a122-a4b1e4754f23',
      },
    })
        .then((response) => {
          setHolidays(response.data);
        })
        .catch((error) => {
          console.error('Error fetching holidays', error);
          setHolidays([])
        });
  }, [startMonth, endMonth]);

  const handleBack = () => {
    setStartMonth(prevStart => {
      const newStart = new Date(prevStart);
      newStart.setMonth(newStart.getMonth() - 3);
      return newStart;
    });
    setEndMonth(prevEnd => {
      const newEnd = new Date(prevEnd);
      newEnd.setMonth(newEnd.getMonth() - 3);
      return newEnd;
    });
  };

  const handleForward = () => {
    setStartMonth(prevStart => {
      const newStart = new Date(prevStart);
      newStart.setMonth(newStart.getMonth() + 3);
      return newStart;
    });
    setEndMonth(prevEnd => {
      const newEnd = new Date(prevEnd);
      newEnd.setMonth(newEnd.getMonth() + 3);
      return newEnd;
    });
  };

  return (
      <div className="App">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px' }}>
          <button onClick={handleBack}>Previous 3 Months</button>
          <h1>Holiday Calendar</h1>
          <button onClick={handleForward}>Next 3 Months</button>
        </div>
        <Calendar startMonth={startMonth} endMonth={endMonth} holidays={holidays} />
      </div>
  );
};

export default App;