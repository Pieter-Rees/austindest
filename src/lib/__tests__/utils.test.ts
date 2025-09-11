import { cn } from "../utils";

describe("utils", () => {
  describe("cn", () => {
    it("should merge class names correctly", () => {
      expect(cn("class1", "class2")).toBe("class1 class2");
    });

    it("should handle conditional classes", () => {
      expect(cn("class1", true && "class2", false && "class3")).toBe(
        "class1 class2"
      );
    });

    it("should handle undefined and null values", () => {
      expect(cn("class1", undefined, null, "class2")).toBe("class1 class2");
    });

    it("should handle empty strings", () => {
      expect(cn("class1", "", "class2")).toBe("class1 class2");
    });

    it("should handle arrays of classes", () => {
      expect(cn(["class1", "class2"], "class3")).toBe("class1 class2 class3");
    });

    it("should handle objects with boolean values", () => {
      expect(cn({ class1: true, class2: false, class3: true })).toBe(
        "class1 class3"
      );
    });

    it("should handle complex combinations", () => {
      expect(
        cn(
          "base",
          { conditional: true, hidden: false },
          ["array1", "array2"],
          "string",
          undefined,
          null
        )
      ).toBe("base conditional array1 array2 string");
    });

    it("should handle empty input", () => {
      expect(cn()).toBe("");
    });

    it("should handle single class", () => {
      expect(cn("single")).toBe("single");
    });
  });
});
