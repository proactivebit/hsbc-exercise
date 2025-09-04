import { useNavigate } from "@tanstack/react-router";
import { Button } from "../Button";

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
    <Button data-testid="test-filters-clear" onClick={onPress}>
      Clear
    </Button>
  );
};
