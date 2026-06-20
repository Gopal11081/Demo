import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Login from "./page";

// Mock next/navigation using a stable object reference to prevent infinite render loops
const mockPush = vi.fn();
const stableRouter = {
  push: mockPush,
};

vi.mock("next/navigation", () => ({
  useRouter() {
    return stableRouter;
  },
}));

describe("Login Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it("renders the login form elements", () => {
    render(<Login />);
    
    // Check heading
    expect(screen.getByText("Welcome Back")).toBeInTheDocument();
    
    // Check inputs and button
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /sign in/i })).toBeInTheDocument();
  });

  it("shows error if form is submitted with empty fields", async () => {
    render(<Login />);
    
    const signInButton = screen.getByRole("button", { name: /sign in/i });
    fireEvent.click(signInButton);

    // Wait for validation error to appear
    await waitFor(() => {
      expect(screen.getByText("Please fill in all fields.")).toBeInTheDocument();
    });
  });

  it("shows error for invalid credentials", async () => {
    render(<Login />);
    
    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const signInButton = screen.getByRole("button", { name: /sign in/i });

    fireEvent.change(usernameInput, { target: { value: "wronguser" } });
    fireEvent.change(passwordInput, { target: { value: "wrongpass" } });
    fireEvent.click(signInButton);

    // Wait for invalid credentials error
    await waitFor(() => {
      expect(
        screen.getByText(/Invalid username or password/i)
      ).toBeInTheDocument();
    });
  });

  it("saves token and redirects to home on successful login", async () => {
    render(<Login />);
    
    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const signInButton = screen.getByRole("button", { name: /sign in/i });

    fireEvent.change(usernameInput, { target: { value: "admin" } });
    fireEvent.change(passwordInput, { target: { value: "admin123" } });
    fireEvent.click(signInButton);

    // Verify localStorage storage and router push redirection
    await waitFor(() => {
      expect(localStorage.getItem("test_user")).toContain("admin");
      expect(mockPush).toHaveBeenCalledWith("/");
    });
  });
});
