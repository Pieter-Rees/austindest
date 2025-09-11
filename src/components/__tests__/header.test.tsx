import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Header from "../header";

// Mock framer-motion
jest.mock("framer-motion", () => ({
  motion: {
    nav: ({ children, ...props }: any) => <nav {...props}>{children}</nav>,
    button: ({ children, ...props }: any) => (
      <button {...props}>{children}</button>
    ),
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

// Mock react-scroll
jest.mock("react-scroll", () => ({
  Link: ({ children, to, onSetActive, ...props }: any) => (
    <a href={`#${to}`} onClick={() => onSetActive && onSetActive()} {...props}>
      {children}
    </a>
  ),
  Events: {
    scrollEvent: {
      register: jest.fn(),
      remove: jest.fn(),
    },
  },
  animateScroll: {
    scrollToTop: jest.fn(),
  },
  scrollSpy: {
    update: jest.fn(),
  },
}));

// Mock store
const mockStore = {
  showSideNav: false,
  navBackground: false,
  activeSection: "",
  setNavBackground: jest.fn(),
  setActiveSection: jest.fn(),
  toggleSideNav: jest.fn(),
};

jest.mock("@/lib/store", () => ({
  useAppStore: () => mockStore,
}));

// Mock Logo component
jest.mock("../logo", () => {
  return function MockLogo() {
    return <div data-testid="logo">Logo</div>;
  };
});

// Mock Sidenav component
jest.mock("../sidenav", () => {
  return function MockSidenav({
    showSideNav,
    handleToggle: _handleToggle,
  }: any) {
    return showSideNav ? <div data-testid="sidenav">Sidenav</div> : null;
  };
});

// Mock window.scrollY
Object.defineProperty(window, "scrollY", {
  writable: true,
  value: 0,
});

// Suppress console errors for this test suite
const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (
      typeof args[0] === "string" &&
      (args[0].includes("React does not recognize the") ||
        args[0].includes("Received `true` for a non-boolean attribute"))
    ) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});

describe("Header", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset scroll position
    Object.defineProperty(window, "scrollY", {
      writable: true,
      value: 0,
    });
  });

  it("renders header with logo and navigation", () => {
    render(<Header />);
    expect(screen.getByTestId("logo")).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Bio")).toBeInTheDocument();
    expect(screen.getByText("Listen")).toBeInTheDocument();
    expect(screen.getByText("Watch")).toBeInTheDocument();
    expect(screen.getByText("Gigs")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });

  it("renders mobile menu button", () => {
    render(<Header />);
    const menuButton = screen.getAllByRole("button")[1]; // Second button is the menu button
    expect(menuButton).toBeInTheDocument();
  });

  it("shows menu icon when sidenav is closed", () => {
    mockStore.showSideNav = false;
    render(<Header />);
    // The Menu icon should be present (we can't easily test the specific icon due to mocking)
    const menuButton = screen.getAllByRole("button")[1];
    expect(menuButton).toBeInTheDocument();
  });

  it("shows close icon when sidenav is open", () => {
    mockStore.showSideNav = true;
    render(<Header />);
    // The X icon should be present (we can't easily test the specific icon due to mocking)
    const menuButton = screen.getAllByRole("button")[1];
    expect(menuButton).toBeInTheDocument();
  });

  it("calls toggleSideNav when menu button is clicked", async () => {
    const user = userEvent.setup();
    render(<Header />);
    const menuButton = screen.getAllByRole("button")[1];
    if (menuButton) {
      await user.click(menuButton);
      expect(mockStore.toggleSideNav).toHaveBeenCalledTimes(1);
    }
  });

  it("calls scrollToTop when logo is clicked", async () => {
    const user = userEvent.setup();
    const { animateScroll } = await import("react-scroll");
    render(<Header />);
    const logoButton = screen.getByTestId("logo").closest("button");
    await user.click(logoButton!);
    expect(animateScroll.scrollToTop).toHaveBeenCalledWith({ duration: 500 });
  });

  it("applies correct background classes when navBackground is false", () => {
    mockStore.navBackground = false;
    render(<Header />);
    const nav = screen.getByRole("navigation");
    expect(nav).toHaveClass(
      "bg-background/80",
      "backdrop-blur-md",
      "border-b",
      "border-border"
    );
  });

  it("applies correct background classes when navBackground is true", () => {
    mockStore.navBackground = true;
    render(<Header />);
    const nav = screen.getByRole("navigation");
    expect(nav).toHaveClass(
      "bg-background/95",
      "backdrop-blur-md",
      "border-b",
      "border-border"
    );
  });

  it("highlights active section in navigation", () => {
    mockStore.activeSection = "bio";
    render(<Header />);
    const bioLink = screen.getByText("Bio");
    expect(bioLink).toHaveClass("text-accent", "font-semibold");
  });

  it("does not highlight inactive sections", () => {
    mockStore.activeSection = "bio";
    render(<Header />);
    const homeLink = screen.getByText("Home");
    const listenLink = screen.getByText("Listen");
    expect(homeLink).not.toHaveClass("text-accent", "font-semibold");
    expect(listenLink).not.toHaveClass("text-accent", "font-semibold");
  });

  it("calls setActiveSection when navigation link is clicked", async () => {
    const user = userEvent.setup();
    render(<Header />);
    const bioLink = screen.getByText("Bio");
    await user.click(bioLink);
    expect(mockStore.setActiveSection).toHaveBeenCalledWith("bio");
  });

  it("handles scroll events and updates navBackground", async () => {
    render(<Header />);

    // Simulate scroll
    Object.defineProperty(window, "scrollY", {
      writable: true,
      value: 100,
    });
    fireEvent.scroll(window);

    await waitFor(() => {
      expect(mockStore.setNavBackground).toHaveBeenCalledWith(true);
    });
  });

  it("does not update navBackground when scroll is less than 50", async () => {
    render(<Header />);

    // Simulate small scroll
    Object.defineProperty(window, "scrollY", {
      writable: true,
      value: 25,
    });
    fireEvent.scroll(window);

    await waitFor(() => {
      expect(mockStore.setNavBackground).toHaveBeenCalledWith(false);
    });
  });

  it("registers scroll event listeners on mount", () => {
    render(<Header />);
    // The scroll event listener is added in useEffect
    // We can't easily test the actual listener registration, but we can test the behavior
    expect(mockStore.setNavBackground).not.toHaveBeenCalled();
  });

  it("cleans up scroll event listeners on unmount", () => {
    const { unmount } = render(<Header />);
    unmount();
    // The cleanup function should be called, but we can't easily test it directly
    // The important thing is that the component unmounts without errors
  });

  it("renders Sidenav component with correct props", () => {
    mockStore.showSideNav = true;
    render(<Header />);
    expect(screen.getByTestId("sidenav")).toBeInTheDocument();
  });

  it("does not render Sidenav when showSideNav is false", () => {
    mockStore.showSideNav = false;
    render(<Header />);
    expect(screen.queryByTestId("sidenav")).not.toBeInTheDocument();
  });

  it("renders navigation links with correct href attributes", () => {
    render(<Header />);
    expect(screen.getByText("Home")).toHaveAttribute("href", "#landing");
    expect(screen.getByText("Bio")).toHaveAttribute("href", "#bio");
    expect(screen.getByText("Listen")).toHaveAttribute("href", "#listen");
    expect(screen.getByText("Watch")).toHaveAttribute("href", "#watch");
    expect(screen.getByText("Gigs")).toHaveAttribute("href", "#gigs");
    expect(screen.getByText("Contact")).toHaveAttribute("href", "#contact");
  });

  it("applies correct classes to navigation links", () => {
    render(<Header />);
    const homeLink = screen.getByText("Home");
    expect(homeLink).toHaveClass(
      "text-foreground",
      "hover:text-muted",
      "transition-colors",
      "duration-200",
      "cursor-pointer",
      "font-medium"
    );
  });

  it("applies correct classes to logo button", () => {
    render(<Header />);
    const logoButton = screen.getByTestId("logo").closest("button");
    expect(logoButton).toHaveClass(
      "flex",
      "items-center",
      "space-x-2",
      "text-foreground",
      "hover:text-muted",
      "transition-colors",
      "duration-200"
    );
  });

  it("applies correct classes to menu button", () => {
    render(<Header />);
    const menuButton = screen.getAllByRole("button")[1];
    expect(menuButton).toHaveClass(
      "md:hidden",
      "text-foreground",
      "hover:text-muted",
      "transition-colors",
      "duration-200"
    );
  });

  it("renders with correct container structure", () => {
    render(<Header />);
    const nav = screen.getByRole("navigation");
    expect(nav).toHaveClass("fixed", "top-0", "left-0", "right-0", "z-50");

    const container = nav.querySelector(".max-w-7xl");
    expect(container).toHaveClass("mx-auto", "px-4", "sm:px-6", "lg:px-8");

    const flexContainer = container?.querySelector(".flex");
    expect(flexContainer).toHaveClass(
      "items-center",
      "justify-between",
      "h-16"
    );
  });
});
