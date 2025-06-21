import { describe, it, expect } from "vitest";
import { cn } from "./utils";

describe("cn utility function", () => {
  it("should merge classes correctly", () => {
    const result = cn("text-red-500", "bg-blue-500");
    expect(result).toBe("text-red-500 bg-blue-500");
  });

  it("should handle conditional classes", () => {
    const isActive = true;
    const result = cn("base-class", isActive && "active-class");
    expect(result).toBe("base-class active-class");
  });

  it("should handle false conditions", () => {
    const isActive = false;
    const result = cn("base-class", isActive && "active-class");
    expect(result).toBe("base-class");
  });

  it("should merge conflicting tailwind classes", () => {
    const result = cn("px-2 py-1", "px-4");
    expect(result).toBe("py-1 px-4");
  });
});
