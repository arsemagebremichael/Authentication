import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import ProductCard from "./index";

describe("ProductCard", () => {
  const mockOnUpdate = jest.fn();

  it("renders product details with image", () => {
    render(
      <ProductCard
        product={{
          product_id: 1,
          product_name: "Banana",
          product_price: "15",
          image: "banana.png"
        }}
        onUpdate={mockOnUpdate}
      />
    );
    expect(screen.getByText("Banana")).toBeInTheDocument();
    expect(screen.getByText("15 Ksh")).toBeInTheDocument();
    expect(screen.getByAltText("Banana")).toBeInTheDocument();
  });

  it("renders placeholder image on error", () => {
    render(
      <ProductCard
        product={{
          product_id: 1,
          product_name: "Kiwi",
          product_price: "20",
          image: "bad.png"
        }}
        onUpdate={mockOnUpdate}
      />
    );
    const img = screen.getByAltText("Kiwi");
    fireEvent.error(img);
    expect(img.src).toContain("/placeholder.jpg");
  });

  it("triggers onUpdate when Update button clicked", () => {
    render(
      <ProductCard
        product={{
          product_id: 1,
          product_name: "Kiwi",
          product_price: "20"
        }}
        onUpdate={mockOnUpdate}
      />
    );
    fireEvent.click(screen.getByText("Update"));
    expect(mockOnUpdate).toHaveBeenCalled();
  });
});