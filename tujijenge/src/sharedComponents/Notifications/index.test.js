import { render, screen, fireEvent } from '@testing-library/react';
import Notification from './index';

jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: ({ icon }) => <i className={`fa ${icon.iconName}`} />,
}));

describe('Notification', () => {
  const mockNotifications = [
    { message: 'Notification 1' },
    { message: 'Notification 2' },
  ];

  test('renders the bell icon and notification badge', () => {
    render(<Notification notifications={mockNotifications} />);
    
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText(mockNotifications.length)).toBeInTheDocument();
  });

  test('toggles the dropdown when the bell icon is clicked', () => {
    render(<Notification notifications={mockNotifications} />);
    
    const bellButton = screen.getByRole('button');
    fireEvent.click(bellButton);
    
    expect(screen.getByText('Notification 1')).toBeInTheDocument();
    
    fireEvent.click(bellButton);
    
    expect(screen.queryByText('Notification 1')).not.toBeInTheDocument();
  });

  test('closes the dropdown when clicking outside', () => {
    render(<Notification notifications={mockNotifications} />);
    
    const bellButton = screen.getByRole('button');
    fireEvent.click(bellButton);
    
    expect(screen.getByText('Notification 1')).toBeInTheDocument();
    
    fireEvent.mouseDown(document);
    
    expect(screen.queryByText('Notification 1')).not.toBeInTheDocument();
  });

  test('displays a message when there are no notifications', () => {
    render(<Notification notifications={[]} />);
    
    const bellButton = screen.getByRole('button');
    fireEvent.click(bellButton);
    
    expect(screen.getByText('No new notifications')).toBeInTheDocument();
  });
});