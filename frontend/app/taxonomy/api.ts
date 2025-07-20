export type Taxonomy = {
  id: number;
  name: string;
  size: number;
};

const baseUrl = typeof window === 'undefined' && process.env.NODE_ENV === 'production'
  ? 'http://backend:3000' // Server-side (inside Docker)
  : 'http://localhost:3000'; // Client-side (browser)

/**
 * Fetches taxonomy items for a given path.
 * @param path The path to fetch items for.
 * @returns A promise of the taxonomy items.
 */
export function getTaxonomy(path?: string): Promise<Taxonomy[]> {
  return fetch(`${baseUrl}/path${path ? `?query=${path}` : ''}`).then(
    (res) => res.json(),
  );
}

/**
 * Fetches taxonomy items for a given search query.
 * @param query The search query to fetch items for.
 * @returns A promise of the taxonomy items.
 */
export function getSearch(query: string): Promise<Taxonomy[]> {
  return fetch(`${baseUrl}/search?query=${query}`).then(
    (res) => res.json(),
  );
}