import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import ProductToggle from "./index";

describe("ProductToggle", () => {
  it("renders both buttons and calls onSelect for non-active type", () => {
    const mockOnSelect = jest.fn();

    render(<ProductToggle selected="VEG" onSelect={mockOnSelect} />);
    const vegBtn = screen.getByText("Vegetables");
    const fruitBtn = screen.getByText("Fruits");
    expect(vegBtn).toHaveClass("toggle-btn active");
    expect(fruitBtn).toHaveClass("toggle-btn");

  
    fireEvent.click(fruitBtn);
    expect(mockOnSelect).toHaveBeenCalledWith("FRUIT");


    fireEvent.click(vegBtn);
    expect(mockOnSelect).toHaveBeenCalledTimes(1); 
  });

  it("displays correct active class for FRUIT", () => {
    render(<ProductToggle selected="FRUIT" onSelect={() => {}} />);
    expect(screen.getByText("Fruits")).toHaveClass("toggle-btn active");
  });
});