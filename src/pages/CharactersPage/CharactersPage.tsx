import { CharactersTable } from "@/components/CharactersTable/CharactersTable";
import { FilterByName } from "@/components/FilterByName/FilterByName";
import { FilterByStatus } from "@/components/FilterByStatus/FilterByStatus";
import { Filters } from "@/components/Filters";
import { FiltersClear } from "@/components/FiltersClaer/FiltersClaer";
import { useCharacters } from "@/hooks/useCharacters/useCharacters";

interface Props {
  page: number;
  name?: string;
  status?: string;
}

export const CharactersPage = ({ page, name, status }: Props) => {
  const { data, isLoading, isError } = useCharacters(page, name, status);

  if (isLoading) {
    return <div data-testid="characters-loading">Loading...</div>;
  }

  if (isError) {
    return <div data-testid="characters-error">Error loading characters.</div>;
  }

  if (!data?.info.count) {
    return <div data-testid="characters-no-data">No data available.</div>;
  }

  return (
    <div>
      <Filters>
        <FilterByName name={name} />
        <FilterByStatus status={status} />
        <FiltersClear />
      </Filters>
      <CharactersTable data={data} pageNumber={page} />
    </div>
  );
};
