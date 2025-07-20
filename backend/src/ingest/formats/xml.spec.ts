import { parseXml } from './xml';

describe('XML parsing', () => {
  it('should parse XML', async () => {
    const content = `
      <ImageNetStructure>
        <releaseData>fall2011</releaseData>
        <synset wnid="wn00000000" words="word1" gloss="gloss1">
          <synset wnid="wn00000001" words="word2" gloss="gloss2" />
          <synset wnid="wn00000002" words="word3" gloss="gloss3">
            <synset wnid="wn00000003" words="word4" gloss="gloss4" />
          </synset>
        </synset>
      </ImageNetStructure>
    `;
    const structure = await parseXml(content);

    // Check that we have the expected array length
    expect(structure.length).toBe(4);

    // Check specific items
    expect(structure).toContainEqual({ name: 'word1', size: 3 });
    expect(structure).toContainEqual({
      name: 'word1 > word2',
      size: 0,
    });
    expect(structure).toContainEqual({
      name: 'word1 > word3',
      size: 1,
    });
    expect(structure).toContainEqual({
      name: 'word1 > word3 > word4',
      size: 0,
    });
  });
});
