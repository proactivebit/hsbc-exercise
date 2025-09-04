import { CharactersPage } from "@/pages/CharactersPage/CharactersPage";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const characterSearchSchema = z.object({
  page: z.number().catch(1),
  name: z.string().optional(),
  status: z.string().optional(),
});

export const Route = createFileRoute("/characters")({
  validateSearch: characterSearchSchema,
  component: CharactersComponent,
});

function CharactersComponent() {
  const { page, name, status } = Route.useSearch();

  return <CharactersPage page={page} name={name} status={status} />;
}
