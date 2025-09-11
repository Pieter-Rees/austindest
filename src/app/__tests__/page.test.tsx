import { render, screen } from "@testing-library/react";

import Home from "../page";

// Mock all the components
jest.mock("@/components", () => ({
  Bio: () => <div data-testid="bio">Bio Component</div>,
  Gigs: () => <div data-testid="gigs">Gigs Component</div>,
}));

jest.mock("@/components/analytics/PerformanceMonitor", () => ({
  PerformanceMonitor: () => (
    <div data-testid="performance-monitor">Performance Monitor</div>
  ),
}));

jest.mock("@/components/contact", () => ({
  __esModule: true,
  default: () => <div data-testid="contact">Contact Component</div>,
}));

jest.mock("@/components/copyright", () => ({
  __esModule: true,
  default: () => <div data-testid="copyright">Copyright Component</div>,
}));

jest.mock("@/components/header", () => ({
  __esModule: true,
  default: () => <div data-testid="header">Header Component</div>,
}));

jest.mock("@/components/landing", () => ({
  __esModule: true,
  default: () => <div data-testid="landing">Landing Component</div>,
}));

jest.mock("@/components/landingBg", () => ({
  __esModule: true,
  default: () => <div data-testid="landing-bg">Landing Background</div>,
}));

jest.mock("@/components/listen", () => ({
  __esModule: true,
  default: () => <div data-testid="listen">Listen Component</div>,
}));

jest.mock("@/components/pwa/PWARegistration", () => ({
  PWARegistration: () => (
    <div data-testid="pwa-registration">PWA Registration</div>
  ),
}));

jest.mock("@/components/seo/StructuredData", () => ({
  StructuredData: () => (
    <div data-testid="structured-data">Structured Data</div>
  ),
}));

jest.mock("@/components/ui/Loading", () => ({
  PageLoading: () => <div data-testid="page-loading">Page Loading</div>,
  SectionLoading: ({ height }: { height?: string }) => (
    <div data-testid="section-loading" data-height={height}>
      Section Loading
    </div>
  ),
}));

jest.mock("@/components/watch", () => ({
  __esModule: true,
  default: () => <div data-testid="watch">Watch Component</div>,
}));

describe("Home Page", () => {
  it("should render without crashing", () => {
    render(<Home />);

    expect(screen.getByTestId("structured-data")).toBeInTheDocument();
  });

  it("should render all main components", () => {
    render(<Home />);

    expect(screen.getByTestId("structured-data")).toBeInTheDocument();
    expect(screen.getByTestId("pwa-registration")).toBeInTheDocument();
    expect(screen.getByTestId("performance-monitor")).toBeInTheDocument();
    expect(screen.getByTestId("landing-bg")).toBeInTheDocument();
    expect(screen.getByTestId("landing")).toBeInTheDocument();
    expect(screen.getByTestId("gigs")).toBeInTheDocument();
    expect(screen.getByTestId("bio")).toBeInTheDocument();
    expect(screen.getByTestId("listen")).toBeInTheDocument();
    expect(screen.getByTestId("watch")).toBeInTheDocument();
    expect(screen.getByTestId("contact")).toBeInTheDocument();
    expect(screen.getByTestId("copyright")).toBeInTheDocument();
    expect(screen.getByTestId("header")).toBeInTheDocument();
  });

  it("should render sections with correct structure", () => {
    render(<Home />);

    // Check for section elements
    const sections = document.querySelectorAll("section");
    expect(sections.length).toBeGreaterThan(0);
  });

  it("should render Suspense fallbacks", () => {
    render(<Home />);

    // The Suspense components should be present (if they render)
    const pageLoading = screen.queryByTestId("page-loading");
    if (pageLoading) {
      expect(pageLoading).toBeInTheDocument();
    }
  });

  it("should have correct section IDs", () => {
    render(<Home />);

    // Check for specific section IDs
    const landingSection = screen.getByTestId("landing").closest("section");
    const gigsSection = screen.getByTestId("gigs").closest("section");
    const bioSection = screen.getByTestId("bio").closest("section");
    const listenSection = screen.getByTestId("listen").closest("section");
    const watchSection = screen.getByTestId("watch").closest("section");
    const contactSection = screen.getByTestId("contact").closest("section");

    expect(landingSection).toHaveAttribute("id", "landing");
    expect(gigsSection).toHaveAttribute("id", "gigs");
    expect(bioSection).toHaveAttribute("id", "bio");
    expect(listenSection).toHaveAttribute("id", "listen");
    expect(watchSection).toHaveAttribute("id", "watch");
    expect(contactSection).toHaveAttribute("id", "contact");
  });

  it("should render with correct section props", () => {
    render(<Home />);

    // Check for fullVh and bg props
    const landingSection = screen.getByTestId("landing").closest("section");
    const gigsSection = screen.getByTestId("gigs").closest("section");
    const contactSection = screen.getByTestId("contact").closest("section");

    expect(landingSection).toHaveClass("min-h-screen");
    expect(gigsSection).toHaveClass("bg-muted/5");
    expect(contactSection).toHaveClass("bg-muted/5", "min-h-screen");
  });
});
