import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { FilterByStatus } from "./FilterByStatus";

const mockedNavigate = vi.fn();

vi.mock("@tanstack/react-router", async () => {
  const actual = await vi.importActual("@tanstack/react-router");
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
  };
});

describe("FilterByStatus tests", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it("renders correctly", () => {
    render(<FilterByStatus status="alive" />);

    expect(screen.getByTestId("test-filter-by-status")).toBeInTheDocument();
    expect(screen.getByTestId("test-filter-by-status")).toHaveValue("alive");
    expect(mockedNavigate).not.toHaveBeenCalledOnce();
  });

  it("should navigate on status change", async () => {
    render(<FilterByStatus />);
    await userEvent.selectOptions(
      screen.getByTestId("test-filter-by-status"),
      "Alive"
    );

    expect(mockedNavigate).toHaveBeenCalledOnce();
  });
});
