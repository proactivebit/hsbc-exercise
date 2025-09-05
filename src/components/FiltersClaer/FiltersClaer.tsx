import { DEFAULT_PAGE_SIZE } from "@/constants/pagination";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "../Button";

export const FiltersClear = () => {
  const navigate = useNavigate({
    from: "/app/characters",
  });

  const onPress = () => {
    navigate({
      search: () => ({ page: 1, size: DEFAULT_PAGE_SIZE }),
    });
  };

  return (
    <Button data-testid="test-filters-clear" onClick={onPress}>
      Clear
    </Button>
  );
};
