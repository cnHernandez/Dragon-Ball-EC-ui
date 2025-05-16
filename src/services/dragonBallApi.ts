export interface Character {
  id: number;
  name: string;
  ki: string;
  maxKi: string;
  race: string;
  gender: string;
  description: string;
  image: string;
  affiliation: string;
  deletedAt: string | null;
  originPlanet?: {
    id: number;
    name: string;
    isDestroyed: boolean;
    description: string;
    image: string;
    deletedAt: string | null;
  };
  transformations?: Transformation[];
}

export interface Transformation {
  id: number;
  name: string;
  image: string;
  ki: string;
  deletedAt: string | null;
}

export interface Planet {
  id: number;
  name: string;
  isDestroyed: boolean;
  description: string;
  image: string;
  deletedAt: string | null;
}

const API_URL = 'https://dragonball-api.com/api/characters';

export const fetchCharacters = async (searchTerm: string = ''): Promise<Character[]> => {
  try {
    let allCharacters: Character[] = [];
    let currentPage = 1;
    let totalPages = 1;

    while (currentPage <= totalPages) {
      const response = await fetch(`${API_URL}?page=${currentPage}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      allCharacters = [...allCharacters, ...data.items];
      totalPages = data.meta.totalPages;
      currentPage++;
    }

    if (searchTerm) {
      allCharacters = allCharacters.filter(character =>
        character.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return allCharacters;
  } catch (error) {
    console.error('Failed to fetch characters:', error);
    return [];
  }
};

export const fetchCharacterById = async (id: number): Promise<Character> => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch character:', error);
    throw error;
  }
};

export const fetchPlanets = async (): Promise<{ items: Planet[] }> => {
  const response = await fetch('https://dragonball-api.com/api/planets');
  if (!response.ok) {
    throw new Error('Error al obtener los planetas');
  }
  return response.json();
};
