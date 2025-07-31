import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RecentOrders from './index';
import { useFetchOrders } from '../hooks/useFetchGroupOrders';
import { useNavigate } from 'react-router-dom';

// Mock the useNavigate hook
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

// Mock the useFetchOrders hook
jest.mock('../hooks/useFetchGroupOrders', () => ({
  useFetchOrders: jest.fn(),
}));

// Mock sample order data
const mockOrders = [
  {
    id: '1',
    community: 'Community A',
    orderDate: '2023-10-01',
    totalPrice: 100,
    items: 5,
    customers: 2,
    status: 'pending',
  },
  {
    id: '2',
    community: 'Community B',
    orderDate: '2023-10-02',
    totalPrice: 200,
    items: 10,
    customers: 3,
    status: 'pending',
  },
];

describe('RecentOrders Component', () => {
  let mockNavigate;

  beforeEach(() => {
    mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);
    useFetchOrders.mockReturnValue({
      orders: mockOrders,
      loading: false,
      error: null,
      updateOrder: jest.fn(),
      totalOrders: 2,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    document.body.innerHTML = ''; // Prevent duplicate renders
  });

  test('renders loading state', () => {
    useFetchOrders.mockReturnValue({
      orders: [],
      loading: true,
      error: null,
      updateOrder: jest.fn(),
      totalOrders: 0,
    });

    render(<RecentOrders />);

    expect(screen.getByText('Loading orders...')).toBeInTheDocument();
  });

  test('renders error state', () => {
    useFetchOrders.mockReturnValue({
      orders: [],
      loading: false,
      error: 'Failed to fetch orders',
      updateOrder: jest.fn(),
      totalOrders: 0,
    });

    render(<RecentOrders />);

    expect(screen.getByText('Error: Failed to fetch orders')).toBeInTheDocument();
  });

  test('renders orders when data is available', () => {
    render(<RecentOrders />);

    expect(screen.getByText('Recent Orders')).toBeInTheDocument();
    expect(screen.getByText('Community A')).toBeInTheDocument();
    expect(screen.getByText('Community B')).toBeInTheDocument();
    expect(screen.getByText('1-2 of 2 orders')).toBeInTheDocument();
  });

  test('renders no orders message when orders array is empty', () => {
    useFetchOrders.mockReturnValue({
      orders: [],
      loading: false,
      error: null,
      updateOrder: jest.fn(),
      totalOrders: 0,
    });

    render(<RecentOrders />);

    expect(screen.getByText('No orders found')).toBeInTheDocument();
  });

  test('updates search term when SearchBar is used', async () => {
    render(<RecentOrders />);

    const searchInput = screen.getByPlaceholderText(/search/i);
    fireEvent.change(searchInput, { target: { value: 'Community A' } });

    await waitFor(() => {
      expect(useFetchOrders).toHaveBeenCalledWith('Community A', 1, 10, null, true);
    });
  });

  test('handles pagination correctly', async () => {
    useFetchOrders.mockReturnValue({
      orders: mockOrders,
      loading: false,
      error: null,
      updateOrder: jest.fn(),
      totalOrders: 15, // More than one page
    });

    const { rerender } = render(<RecentOrders />);

    // Target the Previous button specifically within pagination-controls
    const prevButton = screen.getByRole('button', { name: /Previous/i });
    const nextButton = screen.getByRole('button', { name: /Next/i });

    // Previous button should be disabled on page 1
    expect(prevButton).toBeDisabled();

    // Click Next button
    fireEvent.click(nextButton);

    await waitFor(() => {
      expect(useFetchOrders).toHaveBeenCalledWith('', 2, 10, null, true);
    });

    // Update mock to reflect page 2
    useFetchOrders.mockReturnValue({
      orders: mockOrders,
      loading: false,
      error: null,
      updateOrder: jest.fn(),
      totalOrders: 15,
    });

    // Re-render to reflect page 2
    rerender(<RecentOrders />);

    // Previous button should now be enabled
    const updatedPrevButton = screen.getByRole('button', { name: /Previous/i });
    expect(updatedPrevButton).not.toBeDisabled();

    // Click Previous button
    fireEvent.click(updatedPrevButton);

    await waitFor(() => {
      expect(useFetchOrders).toHaveBeenCalledWith('', 1, 10, null, true);
    });
  });

  test('calls handleMarkDelivered when OrderRow triggers it', async () => {
    const mockUpdateOrder = jest.fn();
    useFetchOrders.mockReturnValue({
      orders: mockOrders,
      loading: false,
      error: null,
      updateOrder: mockUpdateOrder,
      totalOrders: 2,
    });

    render(<RecentOrders />);

    const markDeliveredButton = screen.getAllByRole('button', { name: /Mark Delivered/i })[0];
    fireEvent.click(markDeliveredButton);

    await waitFor(() => {
      expect(mockUpdateOrder).toHaveBeenCalledWith('1', 'delivered');
    });
  });

  test('disables Next button when on the last page', () => {
    useFetchOrders.mockReturnValue({
      orders: mockOrders,
      loading: false,
      error: null,
      updateOrder: jest.fn(),
      totalOrders: 10, // Exactly one page
    });

    render(<RecentOrders />);

    const nextButton = screen.getByRole('button', { name: /Next/i });
    expect(nextButton).toBeDisabled();
  });

});