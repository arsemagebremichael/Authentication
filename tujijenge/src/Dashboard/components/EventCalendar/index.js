import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './styles.css';
import { useEvents } from '../../../context/useEvents'; 
import { parseISO, isSameDay } from 'date-fns'; 

export default function EventCalendar() {
  const [currentDisplayDate, setCurrentDisplayDate] = useState(new Date()); 

 
  const { events: contextEvents } = useEvents(); 
  

  const tileContent = ({ date: calendarDate, view }) => { 
    if (view === 'month') {
      const dayEventsFromContext = contextEvents.filter((event) => {
        if (!event.date) return false; 
        try {
          const eventDateObject = parseISO(event.date); 
          return isSameDay(eventDateObject, calendarDate); 
        } catch (e) {
          console.error("Error parsing event date in MyCalendar:", event.date, e);
          return false;
        }
      });

      return (
        <>
          {dayEventsFromContext.map((eventItem, i) => (
            <div key={eventItem.id || i} className='event-box'>
              {eventItem.title}
            </div>
          ))}
        </>
      );
    }
    return null; 
  };

  return (
    <div>
      <Calendar
        className='calendar'
        onChange={setCurrentDisplayDate} 
        value={currentDisplayDate}       
        tileContent={tileContent}      
      />
    </div>
  );
}

