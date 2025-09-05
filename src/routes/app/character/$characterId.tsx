import { Button } from "@/components/Button";
import { CharacterDetails } from "@/pages/CharacterDetails/CharacterDetails";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/app/character/$characterId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { characterId } = Route.useParams();

  return (
    <div>
      <CharacterDetails id={Number(characterId)} />
      <div className="mt-5">
        <Link to="/app/characters" search={{ page: 1 }}>
          <Button>Back to list</Button>
        </Link>
      </div>
    </div>
  );
}
