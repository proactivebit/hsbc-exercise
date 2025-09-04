import { CHARACTER_API, RICKANDMORTY_API } from "@/constants/api";
import type { Character } from "@/types/character";
import type { PageResponse } from "@/types/page";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export function useCharacters(page?: number) {
  return useQuery({
    queryKey: ["characters", page],
    queryFn: async (): Promise<PageResponse<Character>> => {
      const response = await fetch(
        `${RICKANDMORTY_API}${CHARACTER_API}?page=${page ?? 1}`
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch characters: ${response.statusText}`);
      }
      return await response.json();
    },
    placeholderData: keepPreviousData,
  });
}
