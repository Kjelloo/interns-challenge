import React, { useEffect, useState } from 'react';
import {
    format,
    addMonths,
    startOfMonth,
    endOfMonth,
    eachDayOfInterval,
    startOfWeek,
    endOfWeek,
    getWeek,
    isSameDay,
    addWeeks
} from 'date-fns';
import './Calendar.css';
import { da } from 'date-fns/locale';
import {Holiday} from "./Models/Holidays";
import {Month} from "./Models/Month";
import {Week} from "./Models/Week";

interface CalendarProps {
    startMonth: Date;
    endMonth: Date;
    holidays: Holiday[];
}

const Calendar: React.FC<CalendarProps> = ({ startMonth, endMonth, holidays }) => {
    const [dates, setDates] = useState<Month[]>([]);

    useEffect(() => {
        const months: Month[] = [];
        let current = startMonth;

        while (current <= endMonth) {
            const monthStart = startOfMonth(current);
            const monthEnd = endOfMonth(current);
            const weeks: Week[] = [];

            let weekStart = startOfWeek(monthStart, { weekStartsOn: 1 });
            while (weekStart <= monthEnd) {
                const weekEnd = endOfWeek(weekStart, { weekStartsOn: 1 });
                const days = eachDayOfInterval({
                    start: weekStart,
                    end: weekEnd
                }).map(date => (date >= monthStart && date <= monthEnd ? date : null));

                weeks.push({
                    weekNumber: getWeek(weekStart, { locale: da, weekStartsOn: 1 }),
                    days
                });

                weekStart = addWeeks(weekStart, 1); // Increment by a week
            }

            months.push({
                month: format(monthStart, 'MMMM yyyy', { locale: da }),
                weeks
            });

            current = addMonths(current, 1);
        }

        setDates(months);
    }, [startMonth, endMonth]);

    const isHoliday = (date: Date | null): Holiday | undefined => {
        return date ? holidays.find(holiday => isSameDay(new Date(holiday.date), date)) : undefined;
    };

    return (
        <div className="Calendar">
            {dates.map(month => (
                <div key={month.month}>
                    <h2>{month.month}</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)' }}>
                        <div>Week</div>
                        <div>Mon</div>
                        <div>Tue</div>
                        <div>Wed</div>
                        <div>Thu</div>
                        <div>Fri</div>
                        <div>Sat</div>
                        <div>Sun</div>
                        {month.weeks.map(week => (
                            <React.Fragment key={week.weekNumber}>
                                <div style={{ padding: '5px', border: '1px solid #ccc', fontWeight: 'bold' }}>
                                    {week.weekNumber}
                                </div>
                                {week.days.map((day, index) => (
                                    <div
                                        key={index}
                                        style={{
                                            padding: '5px',
                                            border: '1px solid #ccc',
                                            backgroundColor: day && isSameDay(day, new Date()) ? 'lightblue' : 'white',
                                            display: 'flex',
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'space-between'
                                        }}
                                    >
                                        <div>{day ? format(day, 'd') : ''}</div>
                                        {day && isHoliday(day) && (
                                            <div style={{ marginLeft: '10px', fontSize: '0.8em', color: '#d9534f' }}>
                                                {isHoliday(day)?.name}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Calendar;