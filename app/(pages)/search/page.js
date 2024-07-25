import { Suspense } from 'react';
import Search from './code';
import Loading from "@/app/component/Loading";

export default function SearchPage() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Search />
      </Suspense>
    </>
  );
}
