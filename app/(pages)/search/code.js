"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from 'next/navigation';
import Link from "next/link";
import Breadcrumbs from "@/app/component/Breadcrumbs";
import Pagination from "@/app/component/Pagination";
import Loading from "@/app/component/Loading";
import { replaceBaseUrl } from "@/app/utils/urlUtils";
import { fetchSearchResults } from "@/app/utils/fetchSearchResults";

export default function SearchClient({ initialResults, initialTotalPages, initialSearch, initialPage }) {
  const searchParams = useSearchParams();
  const [results, setResults] = useState(initialResults);
  const [page, setPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const perPage = 10;
  const search = searchParams.get('s') || initialSearch;

  const handlePageChange = async (newPage) => {
    setPage(newPage);
    const searchResults = await fetchSearchResults(search, newPage, perPage);
    setResults(searchResults.results);
    setTotalPages(searchResults.totalPages);
  };

  useEffect(() => {
    if (search) {
      handlePageChange(page);
    }
  }, [search, page]);

  return (
    <>
      <section className="page-banner">
        <div className="container">
          <Breadcrumbs pageName="Search Results" />
          <div className="banner-headings">
            <h1 className="page-title">Search Results for</h1>
            <h3 className="text-primary">{totalPages > 0 ? search : "Nothing Found"}</h3>
          </div>
        </div>
      </section>

      <section className="page-sec">
        <div className="container">
          {results === undefined ? <Loading /> : <>
            {totalPages > 0 ?
              <>
                <ul>
                  {results.map(result => (
                    <li key={result.id}>
                      <Link className="text-secondary" href={replaceBaseUrl(result.url)} dangerouslySetInnerHTML={{ __html: result.title }} />
                    </li>
                  ))}
                </ul>
                <hr />
                <div className="page-nav pt-3">
                  <div className="nav-links">
                    <Pagination totalPages={totalPages} currentPage={page} onPageChange={handlePageChange} />
                  </div>
                </div>
              </>
              : <p>Sorry, but nothing matched your search terms. Please try again with some different keywords.</p>
            }            
          </>}
        </div>  
      </section>
    </>
  );
}