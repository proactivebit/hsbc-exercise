import { CHARACTERS } from "@/constants/queryKeys";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "../Button";

interface Props {
  page: number;
}

export const ReloadPage = ({ page }: Props) => {
  const queryClient = useQueryClient();

  const handleReload = () => {
    queryClient.invalidateQueries({ queryKey: [CHARACTERS, page] });
  };

  return (
    <Button data-testid="test-reload" onClick={handleReload}>
      Refresh
    </Button>
  );
};
