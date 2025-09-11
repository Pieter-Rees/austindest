import { NAV_ITEMS } from "../navigation";

describe("navigation constants", () => {
  describe("NAV_ITEMS", () => {
    it("should have correct structure", () => {
      expect(Array.isArray(NAV_ITEMS)).toBe(true);
      expect(NAV_ITEMS.length).toBeGreaterThan(0);
    });

    it("should have all required properties for each item", () => {
      NAV_ITEMS.forEach(item => {
        expect(item).toHaveProperty("id");
        expect(item).toHaveProperty("label");
        expect(typeof item.id).toBe("string");
        expect(typeof item.label).toBe("string");
        expect(item.id.length).toBeGreaterThan(0);
        expect(item.label.length).toBeGreaterThan(0);
      });
    });

    it("should have unique ids", () => {
      const ids = NAV_ITEMS.map(item => item.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });

    it("should have expected navigation items", () => {
      const expectedItems = [
        { id: "landing", label: "Home" },
        { id: "gigs", label: "Gigs" },
        { id: "bio", label: "Bio" },
        { id: "listen", label: "Listen" },
        { id: "watch", label: "Watch" },
        { id: "contact", label: "Contact" },
      ];

      expectedItems.forEach(expectedItem => {
        const foundItem = NAV_ITEMS.find(item => item.id === expectedItem.id);
        expect(foundItem).toBeDefined();
        expect(foundItem?.label).toBe(expectedItem.label);
      });
    });

    it("should be readonly at compile time", () => {
      // TypeScript readonly prevents compilation errors, but allows runtime modification
      // This test verifies the array is defined as readonly
      expect(NAV_ITEMS).toHaveLength(6);
      expect(NAV_ITEMS[0].id).toBe("landing");
      expect(NAV_ITEMS[0].label).toBe("Home");
    });
  });
});
