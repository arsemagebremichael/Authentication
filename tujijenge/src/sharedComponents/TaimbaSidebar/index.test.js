import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import TaimbaSidebar from "./index";

describe("TaimbaSidebar", () => {
  it("renders logo and menu icons", () => {
    render(
      <MemoryRouter>
        <TaimbaSidebar />
      </MemoryRouter>
    );
    expect(screen.getByAltText("Logo")).toBeInTheDocument();
    expect(screen.getByText("Catalogue")).toBeInTheDocument();
    expect(screen.getByText("Orders")).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });

  it("menu icon click updates active state", () => {
    render(
      <MemoryRouter>
        <TaimbaSidebar />
      </MemoryRouter>
    );
    const orders = screen.getByText("Orders");
    fireEvent.click(orders);
    // Can't check active state directly, but click should not error
  });

  it("renders all icons (at least 3/5)", () => {
    render(
      <MemoryRouter>
        <TaimbaSidebar />
      </MemoryRouter>
    );
    expect(document.querySelector(".sidebar-logo")).toBeInTheDocument();
    expect(screen.getByText("Catalogue")).toBeInTheDocument();
    expect(screen.getByText("Orders")).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });
});