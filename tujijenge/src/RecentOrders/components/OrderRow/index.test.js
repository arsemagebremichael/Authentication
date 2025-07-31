import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import OrderRow from './index';

// Suppress console warnings and logs during tests
const originalConsole = { ...console };
console.error = jest.fn();
console.warn = jest.fn();
console.info = jest.fn();
console.debug = jest.fn();

// Mock external dependencies
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

jest.mock('react-icons/fa', () => ({
  FaChevronDown: () => <span data-testid="chevron-down">▼</span>,
  FaChevronUp: () => <span data-testid="chevron-up">▲</span>,
}));

// Mock data
const mockOrder = {
  id: 1,
  community: 'Test Community',
  date: '2023-01-01',
  total: 25.99,
  products: ['Product A x2', 'Product B x1', 'Product C x3'],
  status: 'pending',
  communityId: '123'
};

describe('OrderRow Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset console mocks
    console.error.mockClear();
    console.warn.mockClear();
    console.info.mockClear();
    console.debug.mockClear();
  });

  afterEach(() => {
    // Restore original console after each test
    console.error.mockClear();
    console.warn.mockClear();
    console.info.mockClear();
    console.debug.mockClear();
  });

  test('renders order row with correct data', () => {
    render(
      <MemoryRouter>
        <OrderRow 
          order={mockOrder} 
          onMarkDelivered={jest.fn()} 
        />
      </MemoryRouter>
    );

    // Check community name
    expect(screen.getByText('Test Community')).toBeInTheDocument();
    
    // Check order date
    expect(screen.getByText('2023-01-01')).toBeInTheDocument();
    
    // Check total price
    expect(screen.getByText('25.99')).toBeInTheDocument();
    
    // Check item count
    expect(screen.getByText('6 items')).toBeInTheDocument();
    
    // Check status
    expect(screen.getByText('Mark Delivered')).toBeInTheDocument();
    
    // Check view customers button
    expect(screen.getByText('View Customers')).toBeInTheDocument();
  });

  test('handles empty products gracefully', () => {
    const orderWithNoProducts = {
      ...mockOrder,
      products: []
    };
    
    render(
      <MemoryRouter>
        <OrderRow 
          order={orderWithNoProducts} 
          onMarkDelivered={jest.fn()} 
        />
      </MemoryRouter>
    );

    // Should show "No items ordered" in dropdown
    fireEvent.click(screen.getByTestId('items-cell'));
    expect(screen.getByText('No items ordered')).toBeInTheDocument();
  });

  test('toggles expand/collapse functionality', () => {
    render(
      <MemoryRouter>
        <OrderRow 
          order={mockOrder} 
          onMarkDelivered={jest.fn()} 
        />
      </MemoryRouter>
    );

    const itemsCell = screen.getByTestId('items-cell');
    
    // Initially not expanded
    expect(screen.queryByTestId('order-details-dropdown')).not.toBeInTheDocument();
    
    // Click to expand
    fireEvent.click(itemsCell);
    expect(screen.getByTestId('order-details-dropdown')).toBeInTheDocument();
    expect(screen.getByTestId('chevron-up')).toBeInTheDocument();
    
    // Click again to collapse
    fireEvent.click(itemsCell);
    expect(screen.queryByTestId('order-details-dropdown')).not.toBeInTheDocument();
    expect(screen.getByTestId('chevron-down')).toBeInTheDocument();
  });

  test('calls onMarkDelivered when button is clicked', () => {
    const mockMarkDelivered = jest.fn();
    
    render(
      <MemoryRouter>
        <OrderRow 
          order={mockOrder} 
          onMarkDelivered={mockMarkDelivered} 
        />
      </MemoryRouter>
    );

    // Click the Mark Delivered button
    fireEvent.click(screen.getByText('Mark Delivered'));
    
    expect(mockMarkDelivered).toHaveBeenCalledWith(mockOrder.id);
  });

  test('displays delivered status when order is delivered', () => {
    const deliveredOrder = {
      ...mockOrder,
      status: 'delivered'
    };
    
    render(
      <MemoryRouter>
        <OrderRow 
          order={deliveredOrder} 
          onMarkDelivered={jest.fn()} 
        />
      </MemoryRouter>
    );

    expect(screen.getByText('Delivered')).toBeInTheDocument();
    expect(screen.queryByText('Mark Delivered')).not.toBeInTheDocument();
  });

  test('calls navigate when View Customers button is clicked', () => {
    const mockNavigate = jest.fn();
    jest.mocked(require('react-router-dom').useNavigate).mockReturnValue(mockNavigate);
    
    render(
      <MemoryRouter>
        <OrderRow 
          order={mockOrder} 
          onMarkDelivered={jest.fn()} 
        />
      </MemoryRouter>
    );

    // Click the View Customers button
    fireEvent.click(screen.getByText('View Customers'));
    
    expect(mockNavigate).toHaveBeenCalledWith('/group-orders/123');
  });

  test('closes dropdown when clicking outside', () => {
    render(
      <MemoryRouter>
        <OrderRow 
          order={mockOrder} 
          onMarkDelivered={jest.fn()} 
        />
      </MemoryRouter>
    );

    // Expand the dropdown
    fireEvent.click(screen.getByTestId('items-cell'));
    expect(screen.getByTestId('order-details-dropdown')).toBeInTheDocument();
    
    // Click outside to close
    fireEvent.mouseDown(document.body);
    expect(screen.queryByTestId('order-details-dropdown')).not.toBeInTheDocument();
  });

  test('handles click on dropdown content without closing', () => {
    render(
      <MemoryRouter>
        <OrderRow 
          order={mockOrder} 
          onMarkDelivered={jest.fn()} 
        />
      </MemoryRouter>
    );

    // Expand the dropdown
    fireEvent.click(screen.getByTestId('items-cell'));
    expect(screen.getByTestId('order-details-dropdown')).toBeInTheDocument();
    
    // Click inside dropdown content (should not close)
    const dropdown = screen.getByTestId('order-details-dropdown');
    fireEvent.mouseDown(dropdown);
    
    // Dropdown should still be open
    expect(screen.getByTestId('order-details-dropdown')).toBeInTheDocument();
  });

  test('calculates total items correctly', () => {
    const orderWithQuantities = {
      ...mockOrder,
      products: ['Product A x2', 'Product B x5', 'Product C x1']
    };
    
    render(
      <MemoryRouter>
        <OrderRow 
          order={orderWithQuantities} 
          onMarkDelivered={jest.fn()} 
        />
      </MemoryRouter>
    );

    // Check that total items is calculated correctly (2 + 5 + 1 = 8)
    expect(screen.getByText('8 items')).toBeInTheDocument();
  });

  test('handles malformed product entries gracefully', () => {
    const orderWithMalformedProducts = {
      ...mockOrder,
      products: ['Product A', 'Product B x', 'Product C xinvalid']
    };
    
    render(
      <MemoryRouter>
        <OrderRow 
          order={orderWithMalformedProducts} 
          onMarkDelivered={jest.fn()} 
        />
      </MemoryRouter>
    );

    // Expand the row
    fireEvent.click(screen.getByTestId('items-cell'));
    
    // Should handle malformed entries gracefully (default to quantity 1)
    expect(screen.getByText('Product A')).toBeInTheDocument();
    expect(screen.getByText('Product B')).toBeInTheDocument();
    expect(screen.getByText('Product C')).toBeInTheDocument();
  });
});