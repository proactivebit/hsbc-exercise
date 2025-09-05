import { useCharacter } from "@/hooks/useCharacter/useCharacter";

interface Props {
  id: number;
}

export const CharacterDetails = ({ id }: Props) => {
  const data = useCharacter(id);
  const character = data.data;

  if (data.isLoading) {
    return <div>Loading...</div>;
  }

  if (data.isError) {
    return <div>Error loading character</div>;
  }

  if (!character) {
    return <div>No character data</div>;
  }

  return (
    <div data-testid="test-character-details">
      <h2 className="text-2xl font-bold">{character.name}</h2>
      <img
        src={character.image}
        alt={character.name}
        className="w-48 h-48 rounded"
      />
      <p>Status: {character.status}</p>
      <p>Species: {character.species}</p>
      <p>Type: {character.type || "N/A"}</p>
      <p>Gender: {character.gender}</p>
      {character.origin && (
        <p>
          Origin:{" "}
          <a className="text-blue-600 underline" href={character.origin.url}>
            {character.origin.name}
          </a>
        </p>
      )}
      {character.location && (
        <p>
          Location:{" "}
          <a className="text-blue-600 underline" href={character.location.url}>
            {character.location.name}
          </a>
        </p>
      )}
      <p>Number of Episodes: {character.episode.length}</p>
      <p>Created at: {new Date(character.created).toLocaleDateString()}</p>
    </div>
  );
};
