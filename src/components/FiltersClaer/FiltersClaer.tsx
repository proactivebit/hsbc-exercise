import { useNavigate } from "@tanstack/react-router";

export const FiltersClear = () => {
  const navigate = useNavigate({
    from: "/characters",
  });

  const onPress = () => {
    navigate({
      search: () => ({ page: 1 }),
    });
  };

  return (
    <button
      data-testid="test-filters-clear"
      onClick={onPress}
      className="border rounded px-2 py-"
    >
      Clear Filters
    </button>
  );
};
