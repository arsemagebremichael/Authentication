import { render, screen } from '@testing-library/react';
import TrainingTable from './index';

describe('TrainingTable', () => {
  const sessions = [
    {
      session: 'Hygiene and sanitation',
      location: 'Juja, Nairobi',
      community: 'Community 1',
      registered: 9,
      start: '10-12-2025',
      end: '20-12-2025',
    },
    {
      session: 'Hygiene and sanitation',
      location: 'Juja, Nairobi',
      community: 'Community 1',
      registered: 9,
      start: '10-12-2025',
      end: '20-12-2025',
    },
  ];

  test('renders the table with correct headers and data', () => {
    render(<TrainingTable />);
    
    expect(screen.getByText('Training Sessions')).toBeInTheDocument();
    expect(screen.getByText('Location')).toBeInTheDocument();
    expect(screen.getByText('Communities')).toBeInTheDocument();
    expect(screen.getByText('Registered')).toBeInTheDocument();
    expect(screen.getByText('Starting-date')).toBeInTheDocument();
    expect(screen.getByText('Ending-date')).toBeInTheDocument();

    sessions.forEach(s => {
      expect(screen.getAllByText(s.session)[0]).toBeInTheDocument();
      expect(screen.getAllByText(s.location)[0]).toBeInTheDocument();
      expect(screen.getAllByText(s.community)[0]).toBeInTheDocument();
      expect(screen.getAllByText(s.registered)[0]).toBeInTheDocument();
      expect(screen.getAllByText(s.start)[0]).toBeInTheDocument();
      expect(screen.getAllByText(s.end)[0]).toBeInTheDocument();
    });
  });

  test('applies alternating row classes', () => {
    render(<TrainingTable />);
    
    const rows = screen.getAllByRole('row');
    
    expect(rows[1]).toHaveClass('even-row');
    expect(rows[2]).toHaveClass('odd-row');
  });
});
