import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { FilterByName } from "./FilterByName";

const mockedNavigate = vi.fn();

vi.mock("@tanstack/react-router", async () => {
  const actual = await vi.importActual("@tanstack/react-router");
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
  };
});

describe("FilterByName tests", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should render correctly", () => {
    render(<FilterByName name="Rick" />);

    expect(screen.getByTestId("test-filter-by-name")).toBeInTheDocument();
    expect(screen.getByTestId("test-filter-by-name")).toHaveValue("Rick");
  });

  it("should not call navigate immediately after typing", () => {
    render(<FilterByName />);
    userEvent.type(screen.getByTestId("test-filter-by-name"), "Rick");

    expect(mockedNavigate).not.toHaveBeenCalled();
  });

  it("should call navigate after 500ms delay", () => {
    render(<FilterByName />);
    userEvent.type(screen.getByTestId("test-filter-by-name"), "Rick");
    vi.advanceTimersByTime(500);

    expect(mockedNavigate).toHaveBeenCalledOnce();
  });
});
