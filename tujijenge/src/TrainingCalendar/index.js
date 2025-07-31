import React, { useState } from 'react';
import {
  startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, format,
  isSameMonth, isSameDay, addMonths, parseISO,
} from 'date-fns';
import './styles.css';
import Button from '../sharedComponents/Button';
import { useEvents } from '../context/useEvents';

const months = [
  'January', 'February', 'March', 'April', 'May', 'June', 'July',
  'August', 'September', 'October', 'November', 'December',
];

const CalendarHeader = ({ currentMonth, onMonthChange }) => {
  const currentYear = currentMonth.getFullYear();
  const yearRange = 10;

  const years = Array.from({ length: yearRange * 2 + 1 }, (_, i) => currentYear - yearRange + i);

  const handleSelectChange = (e) => {
    const [year, monthIndex] = e.target.value.split('-');
    onMonthChange(new Date(parseInt(year), parseInt(monthIndex), 1));
  };

  const handlePrevMonth = () => onMonthChange(addMonths(currentMonth, -1));
  const handleNextMonth = () => onMonthChange(addMonths(currentMonth, 1));

  return (
    <div className="calendar-header">
      <h1>Training sessions schedules</h1>
      <div className="header-controls">
        <button onClick={handlePrevMonth} className="nav-button">&lt;</button>
        {/* Dropdown to select a specific month and year. */}
        <select
          value={`${currentMonth.getFullYear()}-${currentMonth.getMonth()}`}
          onChange={handleSelectChange}
          className="month-dropdown"
        >
          {/* Map through the years and months to create the options. */}
          {years.map((year) =>
            months.map((month, index) => (
              <option key={`${year}-${index}`} value={`${year}-${index}`}>
                {`${month} ${year}`}
              </option>
            ))
          )}
        </select>
        {/* Button to go to the next month. */}
        <button onClick={handleNextMonth} className="nav-button">&gt;</button>
      </div>
    </div>
  );
};

const CalendarGrid = ({ currentMonth, events, onDateClick }) => {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 0 });
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 0 });
  const today = new Date();

  // Renders the header row with the days of the week e.g. Sun, Mon
  const renderDaysHeader = () => {
    const days = [];
    const dateFormat = 'EEE';
    let day = startOfWeek(currentMonth, { weekStartsOn: 0 });
    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="calendar-day-name" key={i}>
          {format(addDays(day, i), dateFormat)}
        </div>
      );
    }
    return <div className="calendar-days">{days}</div>;
  };

  // Renders the individual cells for each day in the grid.
  const renderCells = () => {
    const rows = [];
    let days = [];
    let day = startDate;

    // Loops through the days of the month starting 
    //from the first to the last day of the month
    while (day <= endDate) {
      // Creates a row of 7 days.
      for (let i = 0; i < 7; i++) {
        const cellDate = new Date(day);
        //Checks whether there is an event on the current day.
        const event = events.find(e => e.date && isSameDay(parseISO(e.date), cellDate)); 
        //The find compares the parsed date and the cellDate whether they are same
        // Dynamically create class names for styling based on the cell's state.
        const cellClasses = `calendar-cell
        ${!isSameMonth(cellDate, monthStart) ? 'disabled' : '' } 
        ${event ? 'has-training' : ''}
        ${isSameDay(cellDate, today) ? 'current-day' : ''}`;

        //compares whether the start of the month and the specific cell in question are in the same month

        // Add the cell to the days array.
        days.push(
          <div
            className={cellClasses} // Applies the stylings applied in the cellClasses
            key={cellDate.toISOString()}
            onClick={() => onDateClick(cellDate, event)}
          >
            <span>{format(cellDate, 'dd')}</span>
            {event && <div className="training-type">{event.title}</div>}
          </div>
        );
        // Moves to the next day.
        day = addDays(day, 1);
      }
      // Adds the completed week to the rows array
      rows.push(<div className="calendar-row" key={day}>{days}</div>);
      days = [];
    }
    // Return the calendar with all the rows
    return <div className="calendar-body">{rows}</div>;
  };

  return (
    <>
      {renderDaysHeader()}
      {renderCells()}
    </>
  );
};


const EventModal = ({ isOpen, onClose, onSave, onDelete, event, selectedDate }) => {
  if (!isOpen) return null;


  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(e.target.title.value);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>{event ? 'Edit Training Session' : 'Add Training Session'}</h3>
        {/* If the cell has an event the modal says... */}
        <form onSubmit={handleSubmit}>
          <label>
            Title:
            <input type="text" name="title" defaultValue={event?.title || ''} required />
          </label>
          <label>Date: {format(selectedDate, 'MMMM dd, yyyy')}</label>
          <Button type="submit" variant="tertiary" label={event ? 'Update' : 'Add'} />
          {event && (
            <Button
              type="button"
              variant="tertiary"
              onClick={() => onDelete(event.id)}
              style={{ marginLeft: '10px' }}
              label="Delete"
            />
          )}
          {/* cancel button */}
          <Button type="button" variant="quaternary" onClick={onClose} label="Cancel" />
        </form>
      </div>
    </div>
  );
};

const TrainingCalendar = () => {
  const { events, addEvent, updateEvent, deleteEvent } = useEvents();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  const handleDateClick = (date, event) => {
    setSelectedDate(date);
    setEditingEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingEvent(null);
    setSelectedDate(null);
  };

 
  const handleSaveEvent = (title) => {
    const eventData = { title, date: format(selectedDate, 'yyyy-MM-dd') };

    if (editingEvent) {
      updateEvent(editingEvent.id, eventData);
    } else {
      addEvent(eventData);
    }
    handleCloseModal();
  };

  
  const handleDeleteEvent = (eventId) => {
    deleteEvent(eventId);
    handleCloseModal();
  };

  return (
    <div className="big-calendar">
      <CalendarHeader currentMonth={currentMonth} onMonthChange={setCurrentMonth} />
      <CalendarGrid currentMonth={currentMonth} events={events} onDateClick={handleDateClick} />
      <EventModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveEvent}
        onDelete={handleDeleteEvent}
        event={editingEvent}
        selectedDate={selectedDate}
        
      />
    </div>
  );
};

export default TrainingCalendar;