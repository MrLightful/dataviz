import { TreeView, type TreeDataItem } from '~/components/tree-view';
import { getTaxonomy, type Taxonomy } from './api';
import { useState, useMemo } from 'react';

export default function Taxonomy({ loaderData, className }: { loaderData: Taxonomy[]; className?: string }) {
  // Store the loaded items in a map.
  const [loadedItems, setLoadedItems] = useState<Map<string, Taxonomy[]>>(
    new Map<string, Taxonomy[]>([['root', loaderData]]),
  );

  // Create a lookup map for O(1) access to items by ID.
  const idLookupMap = useMemo(() => {
    const lookup = new Map<number, Taxonomy>();
    // Add all items from all paths in the loadedItems map
    for (const [, items] of loadedItems) {
      items.forEach((item) => lookup.set(item.id, item));
    }
    return lookup;
  }, [loadedItems]);

  // Memoize the total count of all items in the memory.
  const totalItemCount = useMemo(() => {
    return idLookupMap.size;
  }, [idLookupMap]);

  // Convert taxonomy items to tree view items.
  const createTreeItems = (
    items: Taxonomy[],
    parentPath: string = 'root',
  ): TreeDataItem[] => {
    return items.map(({ id, name, size }) => {
      const hasLoadedChildren = loadedItems.has(name);
      const displayName = name.split(' > ').pop() || name;
      const children = hasLoadedChildren ? loadedItems.get(name) || [] : [];
      return {
        id: id.toString(),
        name: `${displayName} (${size})`,
        children: hasLoadedChildren ? createTreeItems(children, name) : [],
        hasChildren: size > 0,
      };
    });
  };

  // Memoize the tree view items.
  const items = useMemo(() => {
    const rootItems = loadedItems.get('root') || [];
    return createTreeItems(rootItems);
  }, [loadedItems]);

  // Lazy load children on select.
  const handleSelectChange = async (item: TreeDataItem | undefined) => {
    if (!item || !item.id) return;
    const numId = Number(item.id);

    // Find the selected item.
    const selectedItem = idLookupMap.get(numId);

    // Load children if the item has children and they are not loaded yet.
    if (
      selectedItem &&
      selectedItem.size > 0 &&
      !loadedItems.has(selectedItem.name)
    ) {
      const childData = await getTaxonomy(selectedItem.name);

      // Update our loadedItems map with the new children.
      // The idLookupMap will be automatically updated via useMemo
      setLoadedItems((prev: Map<string, Taxonomy[]>) => {
        const next = new Map(prev);
        next.set(selectedItem.name, childData);
        return next;
      });
    }
  };

  return (
    <div className={className}>
      <h1>Items in memory: {totalItemCount}</h1>
      <TreeView data={items} onSelectChange={handleSelectChange} />
    </div>
  );
}
