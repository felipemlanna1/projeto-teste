import { cn } from "@/lib/utils";

describe("cn()", () => {
  it("returns an empty string when no arguments are provided", () => {
    expect(cn()).toBe("");
  });

  it("merges a single class string", () => {
    expect(cn("text-red-500")).toBe("text-red-500");
  });

  it("merges multiple class strings", () => {
    expect(cn("text-red-500", "bg-blue-200")).toBe("text-red-500 bg-blue-200");
  });

  it("deduplicates conflicting Tailwind classes, keeping the last one", () => {
    expect(cn("text-red-500", "text-blue-500")).toBe("text-blue-500");
  });

  it("handles undefined and null values gracefully", () => {
    expect(cn("text-red-500", undefined, null as unknown as string)).toBe("text-red-500");
  });

  it("handles conditional class with false", () => {
    expect(cn("base-class", false && "conditional-class")).toBe("base-class");
  });

  it("handles conditional class with true", () => {
    expect(cn("base-class", true && "conditional-class")).toBe(
      "base-class conditional-class"
    );
  });

  it("handles an object syntax for conditional classes", () => {
    const result = cn({ "text-red-500": true, "text-blue-500": false });
    expect(result).toBe("text-red-500");
    expect(result).not.toContain("text-blue-500");
  });

  it("merges padding classes correctly (tailwind-merge deduplication)", () => {
    expect(cn("p-4", "p-8")).toBe("p-8");
  });

  it("handles arrays of classes", () => {
    expect(cn(["text-sm", "font-bold"])).toBe("text-sm font-bold");
  });
});
