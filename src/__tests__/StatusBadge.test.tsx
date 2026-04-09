import React from "react";
import { render, screen } from "@testing-library/react";
import StatusBadge from "@/components/ui/StatusBadge";

describe("StatusBadge", () => {
  it("renders COMPLETED", () => {
    render(<StatusBadge status="completed" />);
    expect(screen.getByText("COMPLETED")).toBeInTheDocument();
  });
  it("renders INCOMPLETE", () => {
    render(<StatusBadge status="incomplete" />);
    expect(screen.getByText("INCOMPLETE")).toBeInTheDocument();
  });
  it("renders MISSING", () => {
    render(<StatusBadge status="missing" />);
    expect(screen.getByText("MISSING")).toBeInTheDocument();
  });
  it("has badge-completed class for completed", () => {
    const { container } = render(<StatusBadge status="completed" />);
    expect(container.firstChild).toHaveClass("badge-completed");
  });
  it("has badge-missing class for missing", () => {
    const { container } = render(<StatusBadge status="missing" />);
    expect(container.firstChild).toHaveClass("badge-missing");
  });
});
