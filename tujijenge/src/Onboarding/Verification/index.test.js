import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import Verification from "./index";

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

describe("Verification component", () => {
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
    mockedUsedNavigate.mockReset();
    render(
      <BrowserRouter>
        <Verification />
      </BrowserRouter>
    );
  });

  test("renders all main elements", () => {
    expect(screen.getByAltText(/Tuijenge Logo/i)).toBeInTheDocument();
    expect(screen.getByAltText(/Spinach/i)).toBeInTheDocument();

    expect(screen.getByText(/Verify Mama Mbogas/i)).toBeInTheDocument();
    expect(screen.getByText(/Provide verification for Mama Mbogas who have been trained./i)).toBeInTheDocument();

    const dots = [
      ...screen.getAllByTestId("pagination-dot"),
      ...screen.getAllByTestId("pagination-dot-active"),
    ];
    expect(dots).toHaveLength(4);
    expect(screen.getByTestId("pagination-dot-active")).toBeInTheDocument();

    expect(screen.getByText(/skip/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /finish/i })).toBeInTheDocument();
  });

  test("clicking Skip navigates to /home", async () => {
    const skipLink = screen.getByText(/skip/i);
    await userEvent.click(skipLink);
    expect(mockedUsedNavigate).toHaveBeenCalledWith("/home");
  });

  test("clicking Finish button navigates to /home", async () => {
    const finishButton = screen.getByRole("button", { name: /finish/i });
    await userEvent.click(finishButton);
    expect(mockedUsedNavigate).toHaveBeenCalledWith("/home");
  });
});