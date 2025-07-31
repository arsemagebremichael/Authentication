import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import Orders from ".";


const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => {
  const actual = jest.requireActual("react-router-dom");
  
  return {
    ...actual,
    useNavigate: () => mockedUsedNavigate,
    BrowserRouter: (props) => (
      <actual.BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
        {...props}
      />
    ),
  };
});

describe("Orders component", () => {
  let container;
  beforeEach(() => {
    mockedUsedNavigate.mockReset();
    const renderResult = render(
      <BrowserRouter>
        <Orders />
      </BrowserRouter>
    );
    container = renderResult.container;
  });

  test("renders all main UI elements correctly", () => {
    expect(screen.getByAltText(/tuijenge logo/i)).toBeInTheDocument();
    expect(screen.getByText(/manage bulk orders/i)).toBeInTheDocument();
    expect(screen.getByText(/manage orders from mama mbogas community in bulk/i)).toBeInTheDocument();
    expect(screen.getByText(/skip/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /continue/i })).toBeInTheDocument();
    expect(screen.getByAltText(/spinach/i)).toBeInTheDocument();
    // Check number of pagination dots
    const dots = container.querySelectorAll(".pagination-dots .dot");
    expect(dots.length).toBe(4);
    const activeDot = container.querySelector(".pagination-dots .dot.active");
    expect(activeDot).toBeInTheDocument();
  });

  test("clicking skip navigates to /home", async () => {
    const skipLink = screen.getByText(/skip/i);
    await userEvent.click(skipLink);
    expect(mockedUsedNavigate).toHaveBeenCalledWith("/home");
  });

  test("clicking continue navigates to /verification", async () => {
    const continueBtn = screen.getByRole("button", { name: /continue/i });
    await userEvent.click(continueBtn);
    expect(mockedUsedNavigate).toHaveBeenCalledWith("/verification");
  });
});