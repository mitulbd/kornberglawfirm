import { Suspense } from 'react';
import SearchClient from './code';
import Loading from "@/app/component/Loading";
import { fetchSearchResults } from '@/app/utils/fetchSearchResults';

export default async function SearchPage({ searchParams }) {
  const search = searchParams.s || '';
  const page = Number(searchParams.page) || 1;
  const perPage = 10;
  const { results, totalPages } = await fetchSearchResults(search, page, perPage);

  return (
    <Suspense fallback={<Loading />}>
      <SearchClient initialResults={results} initialTotalPages={totalPages} initialSearch={search} initialPage={page} />
    </Suspense>   
  );
}