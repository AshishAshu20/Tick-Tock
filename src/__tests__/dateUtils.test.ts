import { formatDateRange, getTotalHours, formatDate } from "@/lib/dateUtils";

describe("dateUtils", () => {
  describe("getTotalHours", () => {
    it("sums correctly", () => expect(getTotalHours([{ hours: 4 }, { hours: 6 }])).toBe(10));
    it("returns 0 for empty", () => expect(getTotalHours([])).toBe(0));
  });

  describe("formatDateRange", () => {
    it("formats same-month range", () => {
      const r = formatDateRange("2024-01-01T00:00:00.000Z", "2024-01-05T00:00:00.000Z");
      expect(r).toMatch(/Jan/);
      expect(r).toMatch(/2024/);
    });
    it("formats cross-month range", () => {
      const r = formatDateRange("2024-01-29T00:00:00.000Z", "2024-02-02T00:00:00.000Z");
      expect(r).toMatch(/Jan/);
      expect(r).toMatch(/Feb/);
    });
  });

  describe("formatDate", () => {
    it("formats ISO date string", () => {
      const r = formatDate("2024-03-15T00:00:00.000Z");
      expect(r).toMatch(/Mar/);
      expect(r).toMatch(/2024/);
    });
  });
});
