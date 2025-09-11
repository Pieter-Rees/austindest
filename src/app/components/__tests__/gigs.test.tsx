import { render, screen } from "@testing-library/react";

import Gigs from "../gigs";

describe("Gigs Component", () => {
  it("renders gigs component", () => {
    render(<Gigs />);

    expect(screen.getByText("Gigs")).toBeInTheDocument();
  });

  it("displays upcoming gigs section", () => {
    render(<Gigs />);

    expect(screen.getByText("Upcoming")).toBeInTheDocument();
  });

  it("displays passed gigs section", () => {
    render(<Gigs />);

    expect(screen.getByText("Passed")).toBeInTheDocument();
  });

  it("renders gig data correctly", () => {
    render(<Gigs />);

    expect(screen.getByText("30 Love")).toBeInTheDocument();
    expect(screen.getByText("Rotterdam")).toBeInTheDocument();
    expect(screen.getByText("Play Festival")).toBeInTheDocument();
    expect(screen.getByText("Leeuwarden")).toBeInTheDocument();
  });

  it("renders gigs with info links", () => {
    render(<Gigs />);

    const adeLink = screen.getByText("ADE (TBA)");
    expect(adeLink).toBeInTheDocument();
    expect(adeLink.closest("a")).toHaveAttribute(
      "href",
      "https://www.amsterdam-dance-event.nl/"
    );
    expect(adeLink.closest("a")).toHaveAttribute("target", "_blank");
    expect(adeLink.closest("a")).toHaveAttribute("rel", "noreferrer");
  });

  it("renders gigs without info as disabled", () => {
    render(<Gigs />);

    const disabledGig = screen.getByText("30 Love");
    expect(disabledGig.closest("span")).toHaveClass("cursor-not-allowed");
  });

  it("renders Facebook links for gigs with link", () => {
    render(<Gigs />);

    const facebookLinks = screen.getAllByRole("link", { name: "" });
    const facebookLink = facebookLinks.find(
      link =>
        link.getAttribute("href") ===
        "https://www.facebook.com/amsterdamdanceevent"
    );
    expect(facebookLink).toBeInTheDocument();
    expect(facebookLink).toHaveAttribute("target", "_blank");
    expect(facebookLink).toHaveAttribute("rel", "noreferrer");
  });

  it("renders Facebook SVG icons", () => {
    render(<Gigs />);

    const facebookSvg = document.querySelector('svg[id="Layer_1"]');
    expect(facebookSvg).toBeInTheDocument();
    expect(facebookSvg).toHaveAttribute("id", "Layer_1");
    expect(facebookSvg).toHaveAttribute("viewBox", "0 0 512.002 512.002");
  });

  it("displays dates in correct format", () => {
    render(<Gigs />);

    expect(screen.getAllByText("06•04•2024")).toHaveLength(2);
    expect(screen.getAllByText("25•05•2024")).toHaveLength(2);
    expect(screen.getAllByText("13•04•2024")).toHaveLength(2);
  });

  it("renders responsive table structure", () => {
    render(<Gigs />);

    const table = screen.getByRole("table");
    expect(table).toBeInTheDocument();
    expect(table).toHaveClass(
      "w-full",
      "border-separate",
      "lg:border-spacing-4",
      "table-auto"
    );
  });

  it("applies correct styling classes", () => {
    render(<Gigs />);

    const title = screen.getByText("Gigs");
    expect(title).toBeInTheDocument();

    const upcomingHeader = screen.getByText("Upcoming");
    expect(upcomingHeader).toHaveClass("mb-4");

    const upcomingHeaderRow = upcomingHeader.closest("tr");
    expect(upcomingHeaderRow).toHaveClass("flex");

    const upcomingHeaderThead = upcomingHeaderRow?.closest("thead");
    expect(upcomingHeaderThead).toHaveClass(
      "flex",
      "justify-start",
      "sm:justify-center",
      "lg:text-xl",
      "2xl:text-2xl",
      "font-bold"
    );
  });

  it("handles gigs with and without links", () => {
    render(<Gigs />);

    const gigsWithLinks = screen.getAllByText(/ADE \(TBA\)/);
    expect(gigsWithLinks).toHaveLength(1);

    const gigsWithoutLinks = screen.getAllByText(/30 Love/);
    expect(gigsWithoutLinks).toHaveLength(1);
  });

  it("renders mobile responsive date display", () => {
    render(<Gigs />);

    const mobileDates = screen.getAllByText("06•04•2024");
    expect(mobileDates).toHaveLength(2);

    // Check that mobile dates have correct classes
    const mobileDate = mobileDates.find(date => {
      const parent = date.closest("div");
      return parent && parent.textContent === "06•04•2024";
    });

    if (mobileDate) {
      const parent = mobileDate.closest("div");
      expect(parent).toHaveClass("block", "sm:hidden");
    }
  });
});
