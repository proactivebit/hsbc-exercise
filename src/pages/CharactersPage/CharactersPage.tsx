import { CharactersTable } from "@/components/CharactersTable/CharactersTable";
import { useCharacters } from "@/hooks/useCharacters/useCharacters";

interface Props {
  page: number;
}

export const CharactersPage = ({ page }: Props) => {
  const { data, isLoading, isError } = useCharacters(page);

  if (isLoading) {
    return <div data-testid="characters-loading">Loading...</div>;
  }

  if (isError) {
    return <div data-testid="characters-error">Error loading characters.</div>;
  }

  if (!data?.info.count) {
    return <div data-testid="characters-no-data">No data available.</div>;
  }

  return <CharactersTable data={data} pageNumber={page} />;
};
