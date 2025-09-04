import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { FiltersClear } from "./FiltersClaer";

const mockedNavigate = vi.fn();

vi.mock("@tanstack/react-router", async () => {
  const actual = await vi.importActual("@tanstack/react-router");
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
  };
});

describe("FiltersClear tests", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render correctly", () => {
    render(<FiltersClear />);

    expect(screen.getByTestId("test-filters-clear")).toBeInTheDocument();
  });

  it("should call navigate on button click", () => {
    render(<FiltersClear />);
    screen.getByTestId("test-filters-clear").click();

    expect(mockedNavigate).toHaveBeenCalledOnce();
  });
});
