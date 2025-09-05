export interface Character {
  id: number;
  name: string;
  status: Status;
  species: string;
  type: string;
  gender: Gender;
  origin: UrlLink;
  location: UrlLink;
  image: string;
  episode: string[];
  url: string;
  created: string;
}

type Status = "Alive" | "Dead" | "unknown";

type Gender = "Male" | "Female" | "Genderless" | "unknown";

interface UrlLink {
  name: string;
  url: string;
}
