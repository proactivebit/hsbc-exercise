export interface Character {
  id: number;
  name: string;
  status: Status;
  species: string;
  type: string;
  gender: Gender;
  origin: string;
  location: string;
  image: string;
  episode: string[];
  url: string;
  created: string;
}

type Status = "Alive" | "Dead" | "unknown";

type Gender = "Male" | "Female" | "Genderless" | "unknown";
