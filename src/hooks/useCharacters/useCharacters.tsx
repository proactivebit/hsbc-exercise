import { CHARACTER_API, RICKANDMORTY_API } from "@/constants/api";
import type { Character } from "@/types/character";
import type { PageResponse } from "@/types/page";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export function useCharacters(page?: number, name?: string, status?: string) {
  return useQuery({
    queryKey: ["characters", page, name, status],
    queryFn: () => fetchCharacters(page, name, status),
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
  });
}

async function fetchCharacters(
  page?: number,
  name?: string,
  status?: string
): Promise<PageResponse<Character>> {
  const url = new URL(`${RICKANDMORTY_API}${CHARACTER_API}`);
  url.searchParams.set("page", String(page ?? 1));
  if (name) {
    url.searchParams.set("name", name);
  }
  if (status) {
    url.searchParams.set("status", status);
  }
  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`Failed to fetch characters: ${response.statusText}`);
  }
  return await response.json();
}
