import { cn } from "../utils"

describe("cn utility", () => {
  it("merges class names", () => {
    expect(cn("a", "b")).toBe("a b")
  })

  it("handles conditional classes with false", () => {
    expect(cn("a", false && "b", "c")).toBe("a c")
  })

  it("merges conflicting Tailwind classes — last wins", () => {
    expect(cn("p-4", "p-8")).toBe("p-8")
  })

  it("handles undefined inputs", () => {
    expect(cn("a", undefined, "b")).toBe("a b")
  })

  it("handles null inputs", () => {
    expect(cn("a", null, "b")).toBe("a b")
  })

  it("handles arrays", () => {
    expect(cn(["a", "b"], "c")).toBe("a b c")
  })

  it("returns empty string with no inputs", () => {
    expect(cn()).toBe("")
  })

  it("deduplicates conflicting text color classes", () => {
    expect(cn("text-red-500", "text-blue-500")).toBe("text-blue-500")
  })

  it("preserves non-conflicting classes", () => {
    expect(cn("p-4", "m-4")).toBe("p-4 m-4")
  })

  it("handles object syntax", () => {
    expect(cn({ "text-red-500": true, "text-blue-500": false })).toBe("text-red-500")
  })
})
