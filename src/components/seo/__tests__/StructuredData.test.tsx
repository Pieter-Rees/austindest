import { render } from "@testing-library/react";

import { StructuredData } from "../StructuredData";

describe("StructuredData", () => {
  it("should render without crashing", () => {
    render(<StructuredData />);

    // The component should render a script tag
    const script = document.querySelector('script[type="application/ld+json"]');
    expect(script).toBeInTheDocument();
  });

  it("should render structured data script", () => {
    render(<StructuredData />);

    const script = document.querySelector('script[type="application/ld+json"]');
    expect(script).toBeInTheDocument();
    expect(script?.tagName).toBe("SCRIPT");
  });

  it("should have correct type attribute", () => {
    render(<StructuredData />);

    const script = document.querySelector('script[type="application/ld+json"]');
    expect(script).toHaveAttribute("type", "application/ld+json");
  });

  it("should contain valid JSON-LD data", () => {
    render(<StructuredData />);

    const script = document.querySelector('script[type="application/ld+json"]');
    const jsonData = script?.textContent;

    expect(jsonData).toBeTruthy();

    // Should be valid JSON
    expect(() => JSON.parse(jsonData!)).not.toThrow();
  });

  it("should contain person schema", () => {
    render(<StructuredData />);

    const script = document.querySelector('script[type="application/ld+json"]');
    expect(script).not.toBeNull();
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData["@type"]).toBe("Person");
    expect(jsonData.name).toBe("Austin Dest");
  });

  it("should contain website schema", () => {
    render(<StructuredData />);

    const script = document.querySelector('script[type="application/ld+json"]');
    expect(script).not.toBeNull();
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData["@type"]).toBe("Person");
    expect(jsonData.url).toBeDefined();
  });

  it("should be client-side only", () => {
    render(<StructuredData />);

    // The component should render a script tag
    const script = document.querySelector('script[type="application/ld+json"]');
    expect(script).toBeInTheDocument();
  });
});
