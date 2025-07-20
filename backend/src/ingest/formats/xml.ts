import { parseStringPromise } from 'xml2js';

type SynsetNode = {
  $: {
    wnid: string;
    words: string;
    gloss: string;
  };
  synset?: SynsetNode[];
};

type OutputItem = {
  name: string;
  size: number;
};

/**
 * Count the number of synsets in a subtree.
 * @param node The node to count synsets for.
 * @returns The number of synsets in the subtree.
 */
const countSubtreeSize = (node: SynsetNode): number => {
  const children = node.synset ?? [];
  // Leaf nodes have no synsets in their subtree, so return 0
  if (children.length === 0) {
    return 0;
  }
  // For non-leaf nodes, count all synsets in the subtree
  // This includes direct children and all their descendants
  return (
    children.length +
    children.reduce((sum, child) => sum + countSubtreeSize(child), 0)
  );
};

/**
 * Traverses the tree and adds entries to the result array.
 * @param node The node to traverse.
 * @param path The path to the node.
 */
const traverse = (
  result: OutputItem[],
  node: SynsetNode,
  path: string,
): void => {
  const name = node.$.words;
  const fullPath = path ? `${path} > ${name}` : name;
  const size = countSubtreeSize(node);
  result.push({ name: fullPath, size });

  const children = node.synset ?? [];
  for (const child of children) {
    traverse(result, child, fullPath);
  }
};

/**
 * Parses the XML content and returns an array of taxonomy items.
 * @param content The XML content to parse.
 * @returns An array of taxonomy items.
 */
export async function parseXml(content: string): Promise<OutputItem[]> {
  const parsed = await parseStringPromise(content);
  const rootSynset: SynsetNode = parsed.ImageNetStructure.synset?.[0];
  const result: OutputItem[] = [];
  traverse(result, rootSynset, '');
  return result;
}
