import { Input } from "~/components/ui/input";
import { useState, useEffect, useCallback } from "react";
import { getSearch, type Taxonomy } from "./api";

export function TaxonomySearch() {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<Taxonomy[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Debounce function to delay the API call
  const debounce = (func: Function, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return function(...args: any[]) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  // Memoize the debounced search function to avoid recreating it on every render
  const debouncedSearch = useCallback(
    debounce(async (searchQuery: string) => {
      if (searchQuery.trim().length === 0) {
        setResults([]);
        setLoading(false);
        return;
      }
      
      try {
        const searchResults = await getSearch(searchQuery);
        setResults(searchResults);
      } catch (error) {
        console.error('Error searching taxonomy:', error);
      } finally {
        setLoading(false);
      }
    }, 300), // 300ms debounce delay
    []
  );

  // Effect to trigger search when query changes
  useEffect(() => {
    if (query.trim().length > 0) {
      setLoading(true);
      debouncedSearch(query);
    } else {
      setResults([]);
    }
  }, [query, debouncedSearch]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <div>
          <h2 className="text-xl font-bold mb-2">Search Taxonomy</h2>
          <p className="text-sm text-muted-foreground">Only shows matches in the last level of the taxonomy.</p>
        </div>
        <Input 
          type="text" 
          placeholder="Type to search..." 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : results.length > 0 ? (
          <div className="space-y-2">
            <p>{results.length} results found</p>
            <ul className="space-y-3">
              {results.map((item) => (
                <li key={item.id} className="p-2 border rounded hover:bg-slate-50">
                  <div className="font-medium">{item.name}</div>
                  <div className="text-sm text-gray-500">Size: {item.size}</div>
                </li>
              ))}
            </ul>
          </div>
        ) : query.trim().length > 0 ? (
          <p>No results found</p>
        ) : null}
      </div>
    </div>
  );
}