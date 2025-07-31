import React, { createContext, useState, useContext, useEffect } from 'react';

const EventsContext = createContext({});

export const useEvents = () => 
  useContext(EventsContext);

const LOCAL_STORAGE_KEY_CONTEXT_EVENTS = 'contextSharedEvents';

const initialEventsData = [
  { id:1, title: 'Event 1', date: '2025-07-01' }, 
  { id:2, title: 'Event 2', date: '2025-07-15' },
];

export const EventsProvider = ({ children }) => {
  const [events, setEvents] = useState(() => {
    const storedEvents = localStorage.getItem(LOCAL_STORAGE_KEY_CONTEXT_EVENTS);
    if (storedEvents) {
      try {
        return JSON.parse(storedEvents);
      } catch (error) {
        console.error("Error parsing events from local storage", error);
        return initialEventsData;
      }
    }
    return initialEventsData;
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_CONTEXT_EVENTS, JSON.stringify(events));
  }, [events]);


  const addEvent = (newEventData) => { 
    setEvents(prevEvents => [...prevEvents, { ...newEventData, id: Date.now().toString() }]);
  };

  const updateEvent = (eventId, updatedEventData) => {
    setEvents(prevEvents =>
      prevEvents.map(event =>
        event.id === eventId ? { ...event, ...updatedEventData } : event
      )
    );
  };

  const deleteEvent = (eventId) => {
    setEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
  };

  const value = {
    events,      
    addEvent,    
    updateEvent,  
    deleteEvent, 
  };

  return <EventsContext.Provider value={value}>{children}</EventsContext.Provider>;
};
