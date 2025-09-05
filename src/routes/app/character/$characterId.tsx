import { Button } from "@/components/Button";
import { DEFAULT_PAGE_SIZE } from "@/constants/pagination";
import { CharacterDetails } from "@/pages/CharacterDetails/CharacterDetails";
import {
  createFileRoute,
  useCanGoBack,
  useNavigate,
  useRouter,
} from "@tanstack/react-router";

export const Route = createFileRoute("/app/character/$characterId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { characterId } = Route.useParams();
  const router = useRouter();
  const canGoBack = useCanGoBack();
  const navigate = useNavigate({ from: "/app/character/$characterId" });

  const goBack = () => {
    if (canGoBack) {
      router.history.back();
    } else {
      navigate({
        to: "/app/characters",
        search: { page: 1, size: DEFAULT_PAGE_SIZE },
        replace: true,
      });
    }
  };

  return (
    <div>
      <CharacterDetails id={Number(characterId)} />
      <Button onClick={goBack}>Back to list</Button>
    </div>
  );
}
