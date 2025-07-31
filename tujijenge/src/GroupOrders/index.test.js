import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import GroupOrders from './index';
import { useFetchOrders } from '../hooks/useFetchGroupOrders';
import { useReferenceData } from '../hooks/useReferenceData';
import { useNavigate, useParams } from 'react-router-dom';

// Mock react-router-dom hooks
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
  useParams: jest.fn(),
}));

// Mock custom hooks
jest.mock('../hooks/useFetchGroupOrders', () => ({
  useFetchOrders: jest.fn(),
}));
jest.mock('../hooks/useReferenceData', () => ({
  useReferenceData: jest.fn(),
}));

// Mock sample order data
const mockOrders = [
  {
    id: '1',
    mamamboga: '101',
    total: 100,
    date: '2023-10-01',
    products: ['Apple x2', 'Banana x1'],
  },
  {
    id: '2',
    mamamboga: '102',
    total: 200,
    date: '2023-10-02',
    products: ['Orange x3'],
  },
];

// Mock reference data
const mockReferenceData = {
  communities: {
    1: 'Community A',
  },
  customers: {
    101: { first_name: 'Jane', last_name: 'Doe', address: '123 Main St' },
    102: { first_name: 'John', last_name: 'Smith', address: '456 Oak Ave' },
  },
};

describe('GroupOrders Component', () => {
  let mockNavigate;

  beforeEach(() => {
    mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);
    useParams.mockReturnValue({ groupId: '1' });
    useFetchOrders.mockReturnValue({
      orders: mockOrders,
      loading: false,
      error: null,
    });
    useReferenceData.mockReturnValue({
      referenceData: mockReferenceData,
      loading: false,
      error: null,
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
    });
    render(<GroupOrders />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('renders reference data loading state', () => {
    useReferenceData.mockReturnValue({
      referenceData: {},
      loading: true,
      error: null,
    });
    render(<GroupOrders />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('renders error state', () => {
    useFetchOrders.mockReturnValue({
      orders: [],
      loading: false,
      error: 'Failed to fetch orders',
    });
    render(<GroupOrders />);

    expect(screen.getByText('Error: Failed to fetch orders')).toBeInTheDocument();
  });

  test('renders reference data error state', () => {
    useReferenceData.mockReturnValue({
      referenceData: {},
      loading: false,
      error: 'Failed to fetch reference data',
    });
    render(<GroupOrders />);

    expect(screen.getByText('Error: Failed to fetch reference data')).toBeInTheDocument();
  });

  test('renders group title and orders when data is available', () => {
    render(<GroupOrders />);

    expect(screen.getByText('Community A Orders')).toBeInTheDocument();
    expect(screen.getByText('Order ID')).toBeInTheDocument();
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(screen.getByText('John Smith')).toBeInTheDocument();
    expect(screen.getByText('123 Main St')).toBeInTheDocument();
    expect(screen.getByText('2 items')).toBeInTheDocument();
    expect(screen.getByText('1 item')).toBeInTheDocument();
  });

  test('renders fallback group title when community data is missing', () => {
    useReferenceData.mockReturnValue({
      referenceData: { communities: {}, customers: mockReferenceData.customers },
      loading: false,
      error: null,
    });
    render(<GroupOrders />);

    expect(screen.getByText('Group 1 Orders')).toBeInTheDocument();
  });

  test('renders no orders message when orders array is empty', () => {
    useFetchOrders.mockReturnValue({
      orders: [],
      loading: false,
      error: null,
    });
    render(<GroupOrders />);

    expect(screen.getByText('No orders found for this group')).toBeInTheDocument();
  });


  test('navigates back when clicking back arrow', () => {
    render(<GroupOrders />);

    const backArrow = screen.getByText('←');
    fireEvent.click(backArrow);

    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});