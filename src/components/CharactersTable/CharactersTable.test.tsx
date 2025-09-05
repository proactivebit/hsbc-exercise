import type { Character } from "@/types/character";
import type { PageResponse } from "@/types/page";
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { CharactersTable } from "./CharactersTable";

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

describe("CharactersTable test", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it("should render correctly", () => {
    render(
      <CharactersTable
        data={data}
        pageNumber={1}
        isLoading={false}
        isError={false}
      />
    );

    expect(screen.getByTestId("characters-table")).toBeInTheDocument();
    expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
    expect(screen.getByText("Morty Smith")).toBeInTheDocument();
    expect(screen.getByTestId("page-info")).toHaveTextContent("1 of 1");
  });

  it("should show loading state", () => {
    render(
      <CharactersTable
        data={undefined}
        pageNumber={1}
        isLoading={true}
        isError={false}
      />
    );

    expect(screen.getByTestId("characters-loading")).toBeInTheDocument();
  });

  it("should show error state", () => {
    render(
      <CharactersTable
        data={undefined}
        pageNumber={1}
        isLoading={false}
        isError={true}
      />
    );

    expect(screen.getByTestId("characters-error")).toBeInTheDocument();
  });

  it("should show no data state", () => {
    render(
      <CharactersTable
        data={undefined}
        pageNumber={1}
        isLoading={false}
        isError={false}
      />
    );

    expect(screen.getByTestId("characters-no-data")).toBeInTheDocument();
  });
});
