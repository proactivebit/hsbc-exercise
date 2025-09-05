import { useCharacter } from "@/hooks/useCharacter/useCharacter";

interface Props {
  id: number;
}

export const CharacterDetails = ({ id }: Props) => {
  const data = useCharacter(id);
  const character = data.data;

  if (data.isLoading) {
    return <div data-testid="test-loading">Loading...</div>;
  }

  if (data.isError) {
    return (
      <div data-testid="test-error" className="text-red-600">
        Error loading character
      </div>
    );
  }

  if (!character) {
    return <div data-testid="test-no-character">No character data</div>;
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
      {character.episode && (
        <p>Number of Episodes: {character.episode.length}</p>
      )}
      {character.created && (
        <p>Created at: {new Date(character.created).toLocaleDateString()}</p>
      )}
    </div>
  );
};
