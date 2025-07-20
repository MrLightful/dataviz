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
  return fetch(`http://localhost:3000/tree${path ? `?path=${path}` : ''}`).then(
    (res) => res.json(),
  );
}
