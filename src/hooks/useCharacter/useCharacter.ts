import { CHARACTER_API, RICKANDMORTY_API } from "@/constants/api";
import type { Character } from "@/types/character";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export function useCharacter(id: number) {
  return useQuery({
    queryKey: ["character", id],
    queryFn: () => fetchCharacter(id),
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
  });
}

async function fetchCharacter(id: number): Promise<Character> {
  const url = new URL(`${RICKANDMORTY_API}${CHARACTER_API}/${id}`);
  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`Failed to fetch character: ${response.statusText}`);
  }
  return await response.json();
}
