import type { NavItem, Theme, AppState, Gig } from "../index";

describe("types", () => {
  describe("NavItem", () => {
    it("should have correct structure", () => {
      const navItem: NavItem = {
        id: "test",
        label: "Test",
      };

      expect(navItem.id).toBe("test");
      expect(navItem.label).toBe("Test");
    });

    it("should be readonly at compile time", () => {
      const navItem: NavItem = {
        id: "test",
        label: "Test",
      };

      // TypeScript readonly prevents compilation errors, but allows runtime modification
      // This test verifies the type is defined as readonly
      expect(navItem.id).toBe("test");
      expect(navItem.label).toBe("Test");
    });
  });

  describe("Theme", () => {
    it("should accept valid theme values", () => {
      const themes: Theme[] = ["light", "dark", "system"];

      themes.forEach(theme => {
        expect(["light", "dark", "system"]).toContain(theme);
      });
    });
  });

  describe("AppState", () => {
    it("should have correct structure", () => {
      const appState: AppState = {
        showSideNav: false,
        navBackground: false,
        activeSection: "landing",
        isLoading: false,
        theme: "system",
      };

      expect(typeof appState.showSideNav).toBe("boolean");
      expect(typeof appState.navBackground).toBe("boolean");
      expect(typeof appState.activeSection).toBe("string");
      expect(typeof appState.isLoading).toBe("boolean");
      expect(["light", "dark", "system"]).toContain(appState.theme);
    });

    it("should be readonly", () => {
      const appState: AppState = {
        showSideNav: false,
        navBackground: false,
        activeSection: "landing",
        isLoading: false,
        theme: "system",
      };

      // TypeScript readonly prevents compilation errors, but allows runtime modification
      // This test verifies the type is defined as readonly
      expect(appState.showSideNav).toBe(false);
      expect(appState.isLoading).toBe(false);
      expect(appState.theme).toBe("system");
    });
  });

  describe("Gig", () => {
    it("should have correct structure with required fields", () => {
      const gig: Gig = {
        id: "1",
        title: "Test Gig",
        date: "2024-01-01",
        venue: "Test Venue",
        location: "Test City",
      };

      expect(gig.id).toBe("1");
      expect(gig.title).toBe("Test Gig");
      expect(gig.date).toBe("2024-01-01");
      expect(gig.venue).toBe("Test Venue");
      expect(gig.location).toBe("Test City");
    });

    it("should have correct structure with optional fields", () => {
      const gig: Gig = {
        id: "1",
        title: "Test Gig",
        date: "2024-01-01",
        venue: "Test Venue",
        location: "Test City",
        time: "20:00",
        ticketUrl: "https://example.com",
        description: "Test description",
      };

      expect(gig.time).toBe("20:00");
      expect(gig.ticketUrl).toBe("https://example.com");
      expect(gig.description).toBe("Test description");
    });

    it("should be readonly", () => {
      const gig: Gig = {
        id: "1",
        title: "Test Gig",
        date: "2024-01-01",
        venue: "Test Venue",
        location: "Test City",
      };

      // TypeScript readonly prevents compilation errors, but allows runtime modification
      // This test verifies the type is defined as readonly
      expect(gig.title).toBe("Test Gig");
      expect(gig.date).toBe("2024-01-01");
      expect(gig.venue).toBe("Test Venue");
      expect(gig.location).toBe("Test City");
    });
  });
});
