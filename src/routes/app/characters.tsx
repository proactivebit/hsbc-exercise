import { DEFAULT_PAGE_SIZE } from "@/constants/pagination";
import { CharactersPage } from "@/pages/CharactersPage/CharactersPage";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const characterSearchSchema = z.object({
  page: z.number().catch(1),
  size: z.number().catch(DEFAULT_PAGE_SIZE),
  name: z.string().optional(),
  status: z.string().optional(),
});

export const Route = createFileRoute("/app/characters")({
  validateSearch: characterSearchSchema,
  component: CharactersComponent,
});

function CharactersComponent() {
  const { page, size, name, status } = Route.useSearch();

  return <CharactersPage page={page} size={size} name={name} status={status} />;
}
