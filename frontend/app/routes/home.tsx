import Taxonomy from '~/taxonomy/tree-view';
import type { Route } from './+types/home';
import { getTaxonomy, type Taxonomy as TaxonomyType } from '~/taxonomy/api';
import { Separator } from '~/components/ui/separator';
import { TaxonomySearch } from '~/taxonomy/search';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Dataviz' },
    { name: 'description', content: 'Welcome to Dataviz!' },
  ];
}

export async function loader() {
  const data = await getTaxonomy();
  return data;
}

export default function Home({ loaderData }: { loaderData: TaxonomyType[] }) {
  return <div className='flex h-screen w-full gap-12'>
    <div className='w-1/2 p-8 overflow-auto'>
      <Taxonomy loaderData={loaderData} />
    </div>
    <Separator orientation="vertical" />
    <div className='w-1/2 p-8 overflow-auto'> 
      <TaxonomySearch />
    </div>
  </div>;
}
