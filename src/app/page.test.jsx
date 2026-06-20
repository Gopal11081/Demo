import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Home from "./page";

// Mock next/navigation using a stable object reference to prevent infinite render loops in useEffect
const mockPush = vi.fn();
const stableRouter = {
  push: mockPush,
};

vi.mock("next/navigation", () => ({
  useRouter() {
    return stableRouter;
  },
}));

describe("Home Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it("shows session checking state and redirects to login if unauthenticated", async () => {
    render(<Home />);
    
    // Check for loading state text
    expect(screen.getByText("Checking session...")).toBeInTheDocument();

    // Verify it redirects
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/login");
    });
  });

  it("renders welcome screen if authenticated", async () => {
    // Mock user in localStorage
    localStorage.setItem("test_user", JSON.stringify({ email: "admin" }));
    
    render(<Home />);

    // Wait for the render of authenticated elements
    await waitFor(() => {
      expect(screen.getByRole("heading", { name: "Hello" })).toBeInTheDocument();
      expect(screen.getByText(/admin/i)).toBeInTheDocument();
    });
  });

  it("clears localStorage and redirects on clicking Logout", async () => {
    localStorage.setItem("test_user", JSON.stringify({ email: "admin" }));
    
    render(<Home />);

    // Wait for render of Logout button
    await waitFor(() => {
      expect(screen.getByRole("button", { name: /log out/i })).toBeInTheDocument();
    });

    const logoutButton = screen.getByRole("button", { name: /log out/i });
    fireEvent.click(logoutButton);

    // Verify logout
    expect(localStorage.getItem("test_user")).toBeNull();
    expect(mockPush).toHaveBeenCalledWith("/login");
  });
});
