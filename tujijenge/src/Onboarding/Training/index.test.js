import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Training from ".";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("Training component", () => {
  const mockNavigate = jest.fn();

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
    jest.mocked(require("react-router-dom").useNavigate).mockReturnValue(mockNavigate);
    render(
      <MemoryRouter>
        <Training />
      </MemoryRouter>
    );
  });

  test("renders all main elements", () => {
    expect(screen.getByAltText(/Tuijenge Logo/i)).toBeInTheDocument();
    expect(screen.getByText(/Train Mama Mbogas/i)).toBeInTheDocument();
    expect(screen.getByText(/A platform that connects Mama Mbogas with a training agency/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /continue/i })).toBeInTheDocument();
    expect(screen.getByAltText(/Spinach/i)).toBeInTheDocument();

    const dots = [
      ...screen.getAllByTestId("pagination-dot"),
      ...screen.getAllByTestId("pagination-dot-active"),
    ];
    expect(dots).toHaveLength(4);
    expect(screen.getByTestId("pagination-dot-active")).toBeInTheDocument();
  });

  test("clicking skip navigates to /home", () => {
    const skipLink = screen.getByText(/skip/i);
    fireEvent.click(skipLink);
    expect(mockNavigate).toHaveBeenCalledWith("/home");
  });

  test("clicking continue button navigates to /orders", () => {
    const continueButton = screen.getByRole("button", { name: /continue/i });
    fireEvent.click(continueButton);
    expect(mockNavigate).toHaveBeenCalledWith("/orders");
  });
});