import { useNavigate } from "@tanstack/react-router";

interface Props {
  status?: string;
}

export const FilterByStatus = ({ status }: Props) => {
  const navigate = useNavigate({
    from: "/app/characters",
  });

  const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedStatus = e.target.value;
    if (!selectedStatus) {
      navigate({
        search: (prev) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { status, ...rest } = prev;
          return { ...rest, page: 1 };
        },
      });
      return;
    }
    navigate({
      search: (prev) => ({ ...prev, page: 1, status: selectedStatus }),
    });
  };

  return (
    <div>
      <label htmlFor="status">Status:</label>
      <select
        data-testid="test-filter-by-status"
        id="status"
        name="status"
        className="ml-2 border rounded appearance-none px-2 py-1"
        onChange={onSelectChange}
        value={status ?? ""}
      >
        <option value="">All</option>
        <option value="alive">Alive</option>
        <option value="dead">Dead</option>
        <option value="unknown">Unknown</option>
      </select>
    </div>
  );
};
