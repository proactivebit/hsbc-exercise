import { useNavigate } from "@tanstack/react-router";

interface Props {
  status?: string;
}

export const FilterByStatus = ({ status }: Props) => {
  const navigate = useNavigate({
    from: "/characters",
  });

  const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedStatus = e.target.value;
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
        className="ml-2 border rounded"
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
