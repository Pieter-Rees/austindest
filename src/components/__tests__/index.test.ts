import * as Components from "../index";

describe("Components Index", () => {
  it("exports all layout components", () => {
    expect(Components.Header).toBeDefined();
    expect(Components.Sidenav).toBeDefined();
    expect(Components.Section).toBeDefined();
  });

  it("exports all page components", () => {
    expect(Components.Bio).toBeDefined();
    expect(Components.Contact).toBeDefined();
    expect(Components.Copyright).toBeDefined();
    expect(Components.Gigs).toBeDefined();
    expect(Components.Landing).toBeDefined();
    expect(Components.LandingBg).toBeDefined();
    expect(Components.Listen).toBeDefined();
    expect(Components.Logo).toBeDefined();
    expect(Components.Socials).toBeDefined();
    expect(Components.Watch).toBeDefined();
  });

  it("exports all UI components", () => {
    expect(Components.Button).toBeDefined();
    expect(Components.Container).toBeDefined();
    expect(Components.Image).toBeDefined();
    expect(Components.Loading).toBeDefined();
    expect(Components.PageLoading).toBeDefined();
    expect(Components.SectionLoading).toBeDefined();
    expect(Components.Title).toBeDefined();
    expect(Components.VideoPlayer).toBeDefined();
  });

  it("exports all feature components", () => {
    expect(Components.PerformanceMonitor).toBeDefined();
    expect(Components.PWARegistration).toBeDefined();
    expect(Components.StructuredData).toBeDefined();
  });

  it("exports components as functions or objects", () => {
    expect(typeof Components.Header).toBe("function");
    expect(typeof Components.Sidenav).toBe("function");
    expect(typeof Components.Section).toBe("function");
    expect(typeof Components.Bio).toBe("function");
    expect(typeof Components.Contact).toBe("function");
    expect(typeof Components.Copyright).toBe("function");
    expect(typeof Components.Gigs).toBe("function");
    expect(typeof Components.Landing).toBe("function");
    expect(typeof Components.LandingBg).toBe("function");
    expect(typeof Components.Listen).toBe("function");
    expect(typeof Components.Logo).toBe("function");
    expect(typeof Components.Socials).toBe("function");
    expect(typeof Components.Watch).toBe("function");
    expect(typeof Components.Button).toBe("object");
    expect(typeof Components.Container).toBe("object");
    expect(typeof Components.Image).toBe("object");
    expect(typeof Components.Loading).toBe("object");
    expect(typeof Components.PageLoading).toBe("function");
    expect(typeof Components.SectionLoading).toBe("object");
    expect(typeof Components.Title).toBe("object");
    expect(typeof Components.VideoPlayer).toBe("object");
    expect(typeof Components.PerformanceMonitor).toBe("function");
    expect(typeof Components.PWARegistration).toBe("function");
    expect(typeof Components.StructuredData).toBe("function");
  });

  it("has correct number of exports", () => {
    const exportedKeys = Object.keys(Components);
    expect(exportedKeys).toHaveLength(24);
  });

  it("exports are not undefined", () => {
    Object.values(Components).forEach(component => {
      expect(component).toBeDefined();
      expect(component).not.toBeNull();
    });
  });
});
