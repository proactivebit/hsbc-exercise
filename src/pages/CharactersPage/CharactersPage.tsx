import { CharactersTable } from "@/components/CharactersTable/CharactersTable";
import { FilterByName } from "@/components/FilterByName/FilterByName";
import { FilterByStatus } from "@/components/FilterByStatus/FilterByStatus";
import { Filters } from "@/components/Filters";
import { FiltersClear } from "@/components/FiltersClaer/FiltersClaer";
import { ReloadPage } from "@/components/ReloadPage/ReloadPage";
import { useCharacters } from "@/hooks/useCharacters/useCharacters";

interface Props {
  page: number;
  size?: number;
  name?: string;
  status?: string;
}

export const CharactersPage = ({ page, size, name, status }: Props) => {
  const { data, isLoading, isError } = useCharacters(page, size, name, status);

  return (
    <div className="flex flex-col gap-4">
      <Filters>
        <FilterByName name={name} />
        <FilterByStatus status={status} />
        <FiltersClear />
        <ReloadPage page={page} />
      </Filters>
      <CharactersTable
        data={data}
        pageNumber={page}
        pageSize={size}
        isLoading={isLoading}
        isError={isError}
      />
    </div>
  );
};
