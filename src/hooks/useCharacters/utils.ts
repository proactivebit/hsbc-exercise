import { CHARACTER_API, RICKANDMORTY_API } from "@/constants/api";

export const fetchCharacters = async (url?: string) => {
  const response = await fetch(url || `${RICKANDMORTY_API}${CHARACTER_API}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch characters: ${response.statusText}`);
  }
  return await response.json();
};
