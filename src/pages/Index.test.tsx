import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Index from "./Index";

// Mock react-router-dom
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("Index Page", () => {
  const renderWithRouter = (component: React.ReactElement) => {
    return render(<BrowserRouter>{component}</BrowserRouter>);
  };

  it("renders main heading", () => {
    renderWithRouter(<Index />);
    expect(screen.getByText("RECAP")).toBeInTheDocument();
  });

  it("renders subtitle", () => {
    renderWithRouter(<Index />);
    expect(
      screen.getByText(
        "Reinsurance Engine for Calculations, Administration & Processing",
      ),
    ).toBeInTheDocument();
  });

  it("renders navigation buttons", () => {
    renderWithRouter(<Index />);
    expect(screen.getByText("Sign in")).toBeInTheDocument();
    expect(screen.getByText("Register")).toBeInTheDocument();
  });

  it("renders CTA buttons", () => {
    renderWithRouter(<Index />);
    expect(screen.getByText("Reinsurer Details")).toBeInTheDocument();
    expect(screen.getByText("Policy Details")).toBeInTheDocument();
  });

  it("renders business capabilities section", () => {
    renderWithRouter(<Index />);
    expect(screen.getByText("Business Capabilities")).toBeInTheDocument();
    expect(screen.getByText("Evaluate Treaty Rules")).toBeInTheDocument();
    expect(screen.getByText("Assign Policies")).toBeInTheDocument();
    expect(screen.getByText("Audit & Reporting")).toBeInTheDocument();
  });
});
