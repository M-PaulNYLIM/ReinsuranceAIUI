import { describe, it, expect } from "vitest";

describe("App Tests", () => {
  it("should pass basic test", () => {
    expect(1 + 1).toBe(2);
  });

  it("should validate string operations", () => {
    expect("hello world").toContain("world");
  });

  it("should validate array operations", () => {
    const arr = [1, 2, 3];
    expect(arr).toHaveLength(3);
    expect(arr).toContain(2);
  });

  it("should validate object operations", () => {
    const obj = { name: "RECAP", type: "reinsurance" };
    expect(obj).toHaveProperty("name");
    expect(obj.name).toBe("RECAP");
  });
});
