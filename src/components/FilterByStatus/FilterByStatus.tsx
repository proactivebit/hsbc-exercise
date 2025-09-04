import { useNavigate } from "@tanstack/react-router";

export const FilterByStatus = () => {
  const navigate = useNavigate({
    from: "/characters",
  });

  const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedStatus = e.target.value;
    navigate({
      search: (prev) => ({ ...prev, status: selectedStatus }),
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
      >
        <option value="">All</option>
        <option value="alive">Alive</option>
        <option value="dead">Dead</option>
        <option value="unknown">Unknown</option>
      </select>
    </div>
  );
};
