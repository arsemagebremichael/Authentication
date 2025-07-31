import { render, screen } from '@testing-library/react';
import MyCalendar from './index';
import { useEvents } from '../../../context/useEvents';

jest.mock('../../../context/useEvents', () => ({
  useEvents: jest.fn(),
}));

jest.mock('react-calendar', () => {
  return function MockCalendar({ tileContent }) {
    return (
      <div>
        {tileContent({ date: new Date('2025-07-01T12:00:00.000Z'), view: 'month' })}
        {tileContent({ date: new Date('2025-07-15T12:00:00.000Z'), view: 'month' })}
      </div>
    );
  };
});

describe('MyCalendar', () => {
  test('renders events from context on the calendar', () => {
    useEvents.mockReturnValue({
      events: [
        { id: '1', title: 'Health', date: '2025-07-01T12:00:00.000Z' },
        { id: '2', title: 'Nutrition', date: '2025-07-15T12:00:00.000Z' },
      ],
    });

    render(<MyCalendar />);

    expect(screen.getByText('Health')).toBeInTheDocument();
    expect(screen.getByText('Nutrition')).toBeInTheDocument();
  });

  test('handles events with invalid dates gracefully', () => {
    useEvents.mockReturnValue({
      events: [
        { id: '1', title: 'Valid Event', date: '2025-07-01T12:00:00.000Z' },
        { id: '2', title: 'Invalid Event', date: 'invalid-date' },
      ],
    });

    render(<MyCalendar />);

    expect(screen.getByText('Valid Event')).toBeInTheDocument();
    expect(screen.queryByText('Invalid Event')).not.toBeInTheDocument();
  });
});
