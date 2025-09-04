import { useCharacters } from "@/hooks/useCharacters/useCharacters";
import type { Character } from "@/types/character";
import type { PageResponse } from "@/types/page";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi, type MockedFunction } from "vitest";
import { CharactersPage } from "./CharactersPage";

vi.mock("@/hooks/useCharacters/useCharacters", () => {
  return {
    useCharacters: vi.fn(),
  };
});

const characters: Partial<Character>[] = [
  { id: 1, name: "Rick Sanchez", status: "Alive", species: "Human" },
  { id: 2, name: "Morty Smith", status: "Alive", species: "Hussman" },
];

const data: PageResponse<Character> = {
  info: { count: characters.length, pages: 1, next: null, prev: null },
  results: characters as Character[],
};

const mockedUseCharacters = vi.mocked(useCharacters) as MockedFunction<
  () => Partial<ReturnType<typeof useCharacters>>
>;

describe("CharactersPage tests", () => {
  it("should render correctly", () => {
    mockedUseCharacters.mockReturnValue({
      data,
      isLoading: false,
      isError: false,
    });

    render(<CharactersPage page={1} />);

    expect(screen.getByTestId("characters-table")).toBeInTheDocument();
    expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
    expect(screen.getByText("Morty Smith")).toBeInTheDocument();
    expect(screen.getByTestId("page-info")).toHaveTextContent("1 of 1");
    expect(screen.getByTestId("first-page")).toBeDisabled();
    expect(screen.getByTestId("previous-page")).toBeDisabled();
    expect(screen.getByTestId("next-page")).toBeDisabled();
    expect(screen.getByTestId("last-page")).toBeDisabled();
  });

  it("should render page 2 correctly", () => {
    const dataWithTwoPages: PageResponse<Character> = {
      info: { count: characters.length * 2, pages: 2, next: null, prev: null },
      results: characters as Character[],
    };
    mockedUseCharacters.mockReturnValue({
      data: dataWithTwoPages,
      isLoading: false,
      isError: false,
    });

    render(<CharactersPage page={2} />);
    expect(screen.getByTestId("characters-table")).toBeInTheDocument();
    expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
    expect(screen.getByText("Morty Smith")).toBeInTheDocument();
    expect(screen.getByTestId("page-info")).toHaveTextContent("2 of 2");
    expect(screen.getByTestId("first-page")).not.toBeDisabled();
    expect(screen.getByTestId("previous-page")).not.toBeDisabled();
    expect(screen.getByTestId("next-page")).toBeDisabled();
    expect(screen.getByTestId("last-page")).toBeDisabled();
  });

  it("should show loading state", () => {
    mockedUseCharacters.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    });

    render(<CharactersPage page={1} />);

    expect(screen.getByTestId("characters-loading")).toBeInTheDocument();
  });

  it("should show error state", () => {
    mockedUseCharacters.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
    });

    render(<CharactersPage page={1} />);

    expect(screen.getByTestId("characters-error")).toBeInTheDocument();
  });

  it("should show no data state", () => {
    mockedUseCharacters.mockReturnValue({
      data: {
        info: { count: 0, pages: 0, next: null, prev: null },
        results: [],
      },
      isLoading: false,
      isError: false,
    });

    render(<CharactersPage page={1} />);

    expect(screen.getByTestId("characters-no-data")).toBeInTheDocument();
  });
});
