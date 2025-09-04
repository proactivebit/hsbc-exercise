import { CharactersPage } from "@/pages/CharactersPage/CharactersPage";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const characterSearchSchema = z.object({
  page: z.number().catch(1),
});

export const Route = createFileRoute("/characters")({
  validateSearch: characterSearchSchema,
  component: CharactersComponent,
});

function CharactersComponent() {
  const { page } = Route.useSearch();

  return <CharactersPage page={page} />;
}
