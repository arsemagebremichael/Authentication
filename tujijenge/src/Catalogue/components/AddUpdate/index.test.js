import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import AddUpdateModal from "./index";

describe("AddUpdateModal", () => {
  const mockOnSave = jest.fn();
  const mockOnRemove = jest.fn();
  const mockOnClose = jest.fn();

  it("renders add mode and handles form submit", () => {
    render(
      <AddUpdateModal
        mode="add"
        product={null}
        category="FRUIT"
        onSave={mockOnSave}
        onRemove={mockOnRemove}
        onClose={mockOnClose}
      />
    );

    expect(screen.getByText("Add Fruit")).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/Product Name/i), { target: { value: "Banana" } });
    fireEvent.change(screen.getByLabelText(/Unit/i), { target: { value: "kg" } });
    fireEvent.change(screen.getByLabelText(/Product Price/i), { target: { value: "123" } });
    fireEvent.change(screen.getByLabelText(/Description/i), { target: { value: "Sweet" } });

    fireEvent.click(screen.getByRole("button", { name: /Add/i }));

    expect(mockOnSave).toHaveBeenCalled();
  });

  it("renders update mode, triggers remove, and shows confirm", () => {
    render(
      <AddUpdateModal
        mode="update"
        product={{
          product_id: 1,
          product_name: "Carrot",
          unit: "kg",
          product_price: "10",
          description: "Orange",
          image: "img.png",
          category: "VEG"
        }}
        category="VEG"
        onSave={mockOnSave}
        onRemove={mockOnRemove}
        onClose={mockOnClose}
      />
    );

    expect(screen.getByText("Update Vegetable")).toBeInTheDocument();
    expect(screen.getByAltText(/preview/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /Remove/i }));
    expect(screen.getByText(/Are you sure you want to remove/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /Yes, remove/i }));
    expect(mockOnRemove).toHaveBeenCalled();
  });

  it("calls onClose when close icon is clicked", () => {
    render(
      <AddUpdateModal
        mode="add"
        product={null}
        category="VEG"
        onSave={mockOnSave}
        onRemove={mockOnRemove}
        onClose={mockOnClose}
      />
    );
    fireEvent.click(screen.getByRole("button", { name: "" }));
    expect(mockOnClose).toHaveBeenCalled();
  });
});