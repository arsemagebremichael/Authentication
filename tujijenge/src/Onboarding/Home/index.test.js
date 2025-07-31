import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Welcome from ".";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Welcome component", () => {
  beforeAll(() => {
    // Suppress React Router v7 warnings
    jest.spyOn(console, "warn").mockImplementation((message) => {
      if (
        message.includes("v7_startTransition") ||
        message.includes("v7_relativeSplatPath")
      ) {
        return;
      }
      console.warn(message);
    });
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  beforeEach(() => {
    jest.clearAllMocks();
    render(
      <MemoryRouter>
        <Welcome />
      </MemoryRouter>
    );
  });

  it("renders the logo images and text", () => {
    const logos = screen.getAllByAltText(/tuijenge logo/i);
    expect(logos).toHaveLength(2);
    expect(logos[0]).toHaveAttribute("src", "/assets/logo.png");
    expect(logos[0]).toHaveClass("logo-stacked");
    expect(logos[1]).toHaveAttribute("src", "/assets/logohorizontal.png");
    expect(logos[1]).toHaveClass("logo-horizontal");

    expect(screen.getByText(/welcome to/i)).toBeInTheDocument();
  });

  it("renders Supplier and Trainer buttons", () => {
    expect(screen.getByRole("button", { name: /supplier/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /trainer/i })).toBeInTheDocument();
  });

  it("navigates to correct signin pages after button clicks", () => {
    fireEvent.click(screen.getByRole("button", { name: /supplier/i }));
    expect(mockNavigate).toHaveBeenCalledWith("/signin?role=supplier");

    fireEvent.click(screen.getByRole("button", { name: /trainer/i }));
    expect(mockNavigate).toHaveBeenCalledWith("/signin?role=trainer");
  });
});