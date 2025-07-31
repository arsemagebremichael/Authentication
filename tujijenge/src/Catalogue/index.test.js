import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import CatalogueScreen from "./index";

jest.mock("./components/SearchBar", () => props => (
  <div data-testid="search-bar">
    <input
      data-testid="search-input"
      value={props.value}
      onChange={props.onChange}
      onKeyDown={e => {
        if (e.key === "Enter" && props.onSearch) props.onSearch();
      }}
      placeholder="Search for a product"
    />
    <div data-testid="notification-icon"></div>
  </div>
));
jest.mock("./components/ProductToggle", () => props => (
  <div>
    <button data-testid="veg-toggle" onClick={() => props.onSelect("VEG")}>Veg</button>
    <button data-testid="fruit-toggle" onClick={() => props.onSelect("FRUIT")}>Fruit</button>
  </div>
));
jest.mock("./components/ProductCard", () => props => (
  <div data-testid="product-card" onClick={props.onUpdate}>{props.product.product_name}</div>
));
jest.mock("./components/AddUpdate", () => props => (
  <div data-testid="add-update-modal">
    <button onClick={() => props.onSave({ product_name: "Tomato", unit: "kg", product_price: "45", description: "", category: "VEG" })}>Save</button>
    <button onClick={() => props.onRemove(1)}>Remove</button>
    <button onClick={props.onClose}>Close</button>
  </div>
));
jest.mock("../sharedComponents/Button", () => props => (
  <button className={`share-button ${props.variant}`} onClick={props.onClick}>{props.label}</button>
));
jest.mock("../hooks/useFetchProducts", () => ({
  useFetchProducts: () => ({
    loading: false,
    error: null,
    products: [
      { product_id: 1, product_name: "Tomato", category: "VEG" },
      { product_id: 2, product_name: "Apple", category: "FRUIT" }
    ],
    refetch: jest.fn()
  })
}));

describe("CatalogueScreen", () => {
  it("renders products and can switch category", () => {
    render(<CatalogueScreen />);
    expect(screen.getByText("Tomato")).toBeInTheDocument();
    fireEvent.click(screen.getByTestId("fruit-toggle"));
    expect(screen.getByText("Apple")).toBeInTheDocument();
  });

  it("opens add modal and triggers onSave", () => {
    render(<CatalogueScreen />);
    fireEvent.click(screen.getByText(/Add Vegetable/i));
    fireEvent.click(screen.getByText(/Save/i));
    expect(screen.getByTestId("add-update-modal")).toBeInTheDocument();
  });

  it("filters products by search", () => {
    render(<CatalogueScreen />);
    const input = screen.getByTestId("search-input");
    fireEvent.change(input, { target: { value: "tom" } });
    expect(screen.getByText("Tomato")).toBeInTheDocument();
    fireEvent.change(input, { target: { value: "zzz" } });
    expect(screen.queryByText("Tomato")).not.toBeInTheDocument();
  });


  it("handles product update", () => {
    render(<CatalogueScreen />);
    fireEvent.click(screen.getByText("Tomato")); 
    expect(screen.getByTestId("add-update-modal")).toBeInTheDocument();
  });

  it("handles modal close", async () => {
    render(<CatalogueScreen />);
    fireEvent.click(screen.getByText(/Add Vegetable/i));
    expect(screen.getByTestId("add-update-modal")).toBeInTheDocument();
    fireEvent.click(screen.getByText(/Close/i));
    await waitFor(() =>
      expect(screen.queryByTestId("add-update-modal")).not.toBeInTheDocument()
    );
  });
});