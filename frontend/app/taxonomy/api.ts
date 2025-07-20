export type Taxonomy = {
  id: number;
  name: string;
  size: number;
};

/**
 * Fetches taxonomy items for a given path.
 * @param path The path to fetch items for.
 * @returns A promise of the taxonomy items.
 */
export function getTaxonomy(path?: string): Promise<Taxonomy[]> {
  // Determine if we're running on the server or client
  const baseUrl = typeof window === 'undefined' 
    ? 'http://backend:3000' // Server-side (inside Docker)
    : 'http://localhost:3000'; // Client-side (browser)
  
  return fetch(`${baseUrl}/path${path ? `?query=${path}` : ''}`).then(
    (res) => res.json(),
  );
}
