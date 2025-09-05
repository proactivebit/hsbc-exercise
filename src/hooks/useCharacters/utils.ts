import { CHARACTER_API, RICKANDMORTY_API } from "@/constants/api";
import { DEFAULT_PAGE_SIZE } from "@/constants/pagination";
import type { Character } from "@/types/character";
import type { PageResponse } from "@/types/page";

export async function fetchCharacters(
  page?: number,
  size?: number,
  name?: string,
  status?: string
): Promise<PageResponse<Character>> {
  const url = new URL(`${RICKANDMORTY_API}${CHARACTER_API}`);
  console.log("page", page, "size", size);
  url.searchParams.set("page", String(page ?? 1));
  url.searchParams.set("size", String(size ?? DEFAULT_PAGE_SIZE));
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
