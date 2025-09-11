import { render, screen } from "@testing-library/react";

import { Loading, PageLoading, SectionLoading } from "../Loading";

describe("Loading", () => {
  describe("Loading component", () => {
    it("should render with default props", () => {
      render(<Loading />);

      const spinner = document.querySelector("svg");
      expect(spinner).toBeInTheDocument();
      expect(screen.getByText("Loading...")).toBeInTheDocument();
    });

    it("should render with different sizes", () => {
      const sizes = ["sm", "md", "lg"] as const;

      sizes.forEach(size => {
        const { unmount } = render(<Loading size={size} />);
        const spinner = document.querySelector("svg");
        expect(spinner).toBeInTheDocument();
        unmount();
      });
    });

    it("should render with custom text", () => {
      render(<Loading text="Custom loading text" />);

      expect(screen.getByText("Custom loading text")).toBeInTheDocument();
    });

    it("should accept custom className", () => {
      render(<Loading className="custom-class" />);

      const container = screen.getByText("Loading...").closest("div");
      expect(container).toHaveClass("custom-class");
    });

    it("should have correct size classes", () => {
      const { rerender } = render(<Loading size="sm" />);
      const spinner = document.querySelector("svg");
      expect(spinner).toHaveClass("h-4", "w-4");

      rerender(<Loading size="md" />);
      const spinnerMd = document.querySelector("svg");
      expect(spinnerMd).toHaveClass("h-6", "w-6");

      rerender(<Loading size="lg" />);
      const spinnerLg = document.querySelector("svg");
      expect(spinnerLg).toHaveClass("h-8", "w-8");
    });

    it("should render without text when not provided", () => {
      render(<Loading text="" />);

      const spinner = document.querySelector("svg");
      expect(spinner).toBeInTheDocument();
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });
  });

  describe("PageLoading component", () => {
    it("should render correctly", () => {
      render(<PageLoading />);

      expect(screen.getByText("Loading Austin Dest...")).toBeInTheDocument();
    });

    it("should have correct classes", () => {
      render(<PageLoading />);

      const container = screen
        .getByText("Loading Austin Dest...")
        .closest("div");
      expect(container).toHaveClass(
        "flex",
        "flex-col",
        "items-center",
        "justify-center",
        "space-y-2"
      );
    });
  });

  describe("SectionLoading component", () => {
    it("should render with default props", () => {
      render(<SectionLoading />);

      expect(screen.getByText("Loading...")).toBeInTheDocument();
    });

    it("should render with different heights", () => {
      const heights = ["sm", "md", "lg", "xl", "full"] as const;

      heights.forEach(height => {
        const { unmount } = render(<SectionLoading height={height} />);
        expect(screen.getByText("Loading...")).toBeInTheDocument();
        unmount();
      });
    });

    it("should accept custom className", () => {
      render(<SectionLoading className="custom-class" />);

      const container = screen
        .getByText("Loading...")
        .closest("div")?.parentElement;
      expect(container).toHaveClass("custom-class");
    });

    it("should have correct height classes", () => {
      const { rerender } = render(<SectionLoading height="sm" />);
      const container = screen
        .getByText("Loading...")
        .closest("div")?.parentElement;
      expect(container).toHaveClass("h-48");

      rerender(<SectionLoading height="md" />);
      const containerMd = screen
        .getByText("Loading...")
        .closest("div")?.parentElement;
      expect(containerMd).toHaveClass("h-96");

      rerender(<SectionLoading height="lg" />);
      const containerLg = screen
        .getByText("Loading...")
        .closest("div")?.parentElement;
      expect(containerLg).toHaveClass("h-[32rem]");

      rerender(<SectionLoading height="xl" />);
      const containerXl = screen
        .getByText("Loading...")
        .closest("div")?.parentElement;
      expect(containerXl).toHaveClass("h-[40rem]");

      rerender(<SectionLoading height="full" />);
      const containerFull = screen
        .getByText("Loading...")
        .closest("div")?.parentElement;
      expect(containerFull).toHaveClass("h-screen");
    });
  });
});
