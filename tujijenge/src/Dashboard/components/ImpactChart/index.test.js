import { render, screen } from '@testing-library/react';
import ImpactChart from './index';
import { MemoryRouter } from 'react-router-dom';

jest.mock('react-chartjs-2', () => ({
  Doughnut: () => <div>Doughnut Chart</div>,
}));

jest.mock('../EventCalendar', () => () => <div>Calendar View</div>);

describe('ImpactChart', () => {
  test('renders the impact chart with correct data and structure', () => {
    render(
      <MemoryRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      
      }}
      >
        <ImpactChart />
      </MemoryRouter>
    );

    expect(screen.getByText('Impact')).toBeInTheDocument();

    expect(screen.getByText('Trained Mama Mboga')).toBeInTheDocument();
    expect(screen.getByText('Untrained Mama Mboga')).toBeInTheDocument();

    expect(screen.getByText('60%')).toBeInTheDocument();
    expect(screen.getByText('Trained')).toBeInTheDocument();

    expect(screen.getByText('Doughnut Chart')).toBeInTheDocument();
    expect(screen.getByText('Calendar View')).toBeInTheDocument();
  });
});
