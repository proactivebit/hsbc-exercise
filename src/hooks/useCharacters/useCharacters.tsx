import { CHARACTERS } from "@/constants/queryKeys";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { fetchCharacters } from "./utils";

export function useCharacters(
  page?: number,
  size?: number,
  name?: string,
  status?: string
) {
  const previousFilters = useRef({ name, status });

  const filtersChanged =
    previousFilters.current.name !== name ||
    previousFilters.current.status !== status;

  useEffect(() => {
    previousFilters.current = { name, status };
  }, [name, status]);

  return useQuery({
    queryKey: [CHARACTERS, page, size, name, status],
    queryFn: () => fetchCharacters(page, size, name, status),
    placeholderData: filtersChanged ? undefined : keepPreviousData, // Only keep previous data for pagination changes
  });
}
