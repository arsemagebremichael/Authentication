import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from './index';

describe('SearchBar Component', () => {
  it('renders with correct placeholder and value', () => {
    render(<SearchBar searchTerm="Kilimani" setSearchTerm={() => {}} />);
    const input = screen.getByPlaceholderText('Search by group name, date, or location');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('Kilimani');
  });

  it('updates search term on change', () => {
    const setSearchTerm = jest.fn();
    render(<SearchBar searchTerm="Kilimani" setSearchTerm={setSearchTerm} />);
    const input = screen.getByPlaceholderText('Search by group name, date, or location');
    fireEvent.change(input, { target: { value: 'Nairobi' } });
    expect(setSearchTerm).toHaveBeenCalledWith('Nairobi');
  });
});