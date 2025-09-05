import { CHARACTERS } from "@/constants/queryKeys";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ReloadPage } from "./ReloadPage";

const mockedInvalidateQueries = vi.fn();

vi.mock("@tanstack/react-query", async () => {
  const actual = await vi.importActual("@tanstack/react-query");
  return {
    ...actual,
    useQueryClient: () => ({
      invalidateQueries: mockedInvalidateQueries,
    }),
  };
});

describe("Reload", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render a button", () => {
    render(<ReloadPage page={1} />);

    expect(screen.getByTestId("test-reload")).toBeInTheDocument();
  });

  it("should call the handleReload function when clicked", async () => {
    render(<ReloadPage page={1} />);
    await userEvent.click(screen.getByTestId("test-reload"));

    expect(mockedInvalidateQueries).toHaveBeenCalledWith({
      queryKey: [CHARACTERS, 1],
    });
  });
});
