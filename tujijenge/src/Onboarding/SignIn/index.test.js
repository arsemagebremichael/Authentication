import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import SignIn from ".";

const mockLogin = jest.fn();

jest.mock("../../hooks/useLogin", () => ({
  useLogin: jest.fn(),
}));

describe("SignIn component", () => {
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
    jest.mocked(require("../../hooks/useLogin").useLogin).mockReturnValue({
      login: mockLogin,
      error: null,
      loading: false,
    });
  });

  const renderWithRouter = (initialEntries = ["/signin"]) =>
    render(
      <MemoryRouter initialEntries={initialEntries}>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </MemoryRouter>
    );

  it("renders with role from URL param", () => {
    renderWithRouter(["/signin?role=trainer"]);
    expect(screen.getByText(/sign in as Trainer/i)).toBeInTheDocument();
    expect(screen.getByLabelText("Email:")).toBeInTheDocument();
    expect(screen.getByLabelText("Password:")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  it("defaults to 'User' role when no role param is provided", () => {
    renderWithRouter(["/signin"]);
    expect(screen.getByText(/sign in as User/i)).toBeInTheDocument();
  });

  it("shows validation errors when submitting empty form", async () => {
    renderWithRouter();
    fireEvent.click(screen.getByRole("button", { name: /login/i }));
    expect(await screen.findByText(/please enter your email/i)).toBeInTheDocument();
    expect(screen.getByText(/please enter your password/i)).toBeInTheDocument();
    expect(mockLogin).not.toHaveBeenCalled();
  });

  it("calls login with correct arguments on valid submit", async () => {
    renderWithRouter(["/signin?role=supplier"]);
    fireEvent.change(screen.getByLabelText("Email:"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Password:"), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));
    await waitFor(() =>
      expect(mockLogin).toHaveBeenCalledWith("test@example.com", "password123", "supplier")
    );
  });

  it("displays error message when login error exists", () => {
    jest.mocked(require("../../hooks/useLogin").useLogin).mockReturnValue({
      login: mockLogin,
      error: "Invalid credentials",
      loading: false,
    });
    renderWithRouter();
    expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
  });

  it("disables login button when loading", () => {
    jest.mocked(require("../../hooks/useLogin").useLogin).mockReturnValue({
      login: mockLogin,
      error: null,
      loading: true,
    });
    renderWithRouter();
    expect(screen.getByRole("button", { name: /login/i })).toBeDisabled();
  });
});