import Taxonomy from '~/taxonomy';
import type { Route } from './+types/home';
import { getTaxonomy, type Taxonomy as TaxonomyType } from '~/taxonomy/api';

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
  return <Taxonomy loaderData={loaderData} />;
}
