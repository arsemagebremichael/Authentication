import React from 'react';
import { render, fireEvent, screen} from '@testing-library/react';
import TrainingCalendar from './index';
import { useEvents } from '../context/useEvents';

jest.mock('../sharedComponents/Button', () => (props) => (
  <button {...props}>{props.label || props.children}</button>
));


jest.mock('../context/useEvents');

const mockEvents = [
  { id: '1', title: 'Training 1', date: '2025-07-16' },
  { id: '2', title: 'Training 2', date: '2025-07-20' },
];

const addEvent = jest.fn();
const updateEvent = jest.fn();
const deleteEvent = jest.fn();

beforeEach(() => {
  useEvents.mockReturnValue({
    events: mockEvents,
    addEvent,
    updateEvent,
    deleteEvent,
  });
  addEvent.mockClear();
  updateEvent.mockClear();
  deleteEvent.mockClear();
});

describe('TrainingCalendar', () => {
  test('renders calendar header and grid', () => {
    render(<TrainingCalendar />);
    expect(screen.getByText('Training sessions schedules')).toBeInTheDocument();
    expect(screen.getByText('Training 1')).toBeInTheDocument();
  });

  test('navigates months with arrows', () => {
    render(<TrainingCalendar />);
    const nextButton = screen.getByRole('button', { name: '>' });
    fireEvent.click(nextButton);
   
  });

  test('opens modal when a day is clicked', () => {
    render(<TrainingCalendar />);
    const eventCell = screen.getByText('Training 1').closest('.calendar-cell');
    fireEvent.click(eventCell);
    expect(screen.getByText('Edit Training Session')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Training 1')).toBeInTheDocument();
  });

  test('adds a new event', () => {
    render(<TrainingCalendar />);
    const dayCells = screen.getAllByText(/^\d{2}$/);
    const emptyCell = dayCells.find(
      cell => !cell.closest('.calendar-cell').classList.contains('has-training')
    );
    fireEvent.click(emptyCell.closest('.calendar-cell'));
    expect(screen.getByText('Add Training Session')).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText(/Title:/i), { target: { value: 'New Training' } });
    fireEvent.click(screen.getByRole('button', { name: 'Add' }));
    expect(addEvent).toHaveBeenCalled();
  });


  test('deletes an event', () => {
    render(<TrainingCalendar />);
    const eventCell = screen.getByText('Training 1').closest('.calendar-cell');
    fireEvent.click(eventCell);
    fireEvent.click(screen.getByRole('button', { name: 'Delete' }));
    expect(deleteEvent).toHaveBeenCalledWith('1');
  });

  test('closes modal with cancel button', () => {
    render(<TrainingCalendar />);
    const eventCell = screen.getByText('Training 1').closest('.calendar-cell');
    fireEvent.click(eventCell);
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(screen.queryByText('Edit Training Session')).not.toBeInTheDocument();
  });
});