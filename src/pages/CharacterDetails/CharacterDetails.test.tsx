import { useCharacter } from "@/hooks/useCharacter/useCharacter";
import type { Character } from "@/types/character";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi, type MockedFunction } from "vitest";
import { CharacterDetails } from "./CharacterDetails";

const character: Partial<Character> = {
  id: 1,
  name: "Rick Sanchez",
  status: "Alive",
  species: "Human",
};

vi.mock("@/hooks/useCharacter/useCharacter", () => {
  return {
    useCharacter: vi.fn(),
  };
});

const mockedUseCharacter = vi.mocked(useCharacter) as MockedFunction<
  () => Partial<ReturnType<typeof useCharacter>>
>;

describe("CharacterDetails", () => {
  it("renders correctly", () => {
    mockedUseCharacter.mockReturnValue({
      data: character as Character,
      isLoading: false,
      isError: false,
    });
    render(<CharacterDetails id={1} />);

    expect(screen.getByTestId("test-character-details")).toBeInTheDocument();
  });

  it("shows loading state", () => {
    mockedUseCharacter.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    });
    render(<CharacterDetails id={1} />);

    expect(screen.getByTestId("test-loading")).toBeInTheDocument();
  });

  it("shows error state", () => {
    mockedUseCharacter.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
    });
    render(<CharacterDetails id={1} />);

    expect(screen.getByTestId("test-error")).toBeInTheDocument();
  });

  it("shows no character state", () => {
    mockedUseCharacter.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: false,
    });
    render(<CharacterDetails id={1} />);

    expect(screen.getByTestId("test-no-character")).toBeInTheDocument();
  });
});
