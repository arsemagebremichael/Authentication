import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import SearchBar from './index.js';




describe("SearchBar", () => {
    it("renders input with value and calls onChange", () => {
      const onChange = jest.fn();
      render(<SearchBar value="banana" onChange={onChange} onSearch={() => {}} />);
      expect(screen.getByDisplayValue("banana")).toBeInTheDocument();
      fireEvent.change(screen.getByDisplayValue("banana"), { target: { value: "apple" } });
      expect(onChange).toHaveBeenCalled();
    });
  
    it("calls onSearch when Enter is pressed", () => {
      const onSearch = jest.fn();
      render(<SearchBar value="" onChange={() => {}} onSearch={onSearch} />);
      fireEvent.keyDown(screen.getByPlaceholderText(/Search for a product/i), { key: "Enter" });
      expect(onSearch).toHaveBeenCalled();
    });
  
  });


