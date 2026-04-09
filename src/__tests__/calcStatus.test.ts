import { calcStatus } from "@/data/mockDb";

describe("calcStatus", () => {
  it("returns missing for 0 hours", () => {
    expect(calcStatus([])).toBe("missing");
    expect(calcStatus([{ hours: 0 }])).toBe("missing");
  });
  it("returns incomplete for 1-39 hours", () => {
    expect(calcStatus([{ hours: 20 }])).toBe("incomplete");
    expect(calcStatus([{ hours: 8 }, { hours: 8 }])).toBe("incomplete");
  });
  it("returns completed for 40+ hours", () => {
    expect(calcStatus([{ hours: 40 }])).toBe("completed");
    expect(calcStatus([{ hours: 8 }, { hours: 8 }, { hours: 8 }, { hours: 8 }, { hours: 8 }])).toBe("completed");
  });
});
