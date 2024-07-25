"use client"
import { useState, useEffect } from "react";
import { useSearchParams } from 'next/navigation';
import Link from "next/link";
import Breadcrumbs from "@/app/component/Breadcrumbs";
import Pagination from "@/app/component/Pagination";
import Loading from "@/app/component/Loading";
import { replaceBaseUrl } from "@/app/utils/urlUtils";

async function fetchSearchResults(search, page = 1, perPage = 10) {
  try {
    const response = await fetch(`https://kornberglawfirm.com/wp-json/wp/v2/search?search=${search}&page=${page}&per_page=${perPage}&_fields=id,title,url,type,subtype`, {next:{revalidate:3600 }});
    const results = await response.json();
    const filteredResults = results.filter(result => ['post', 'page', 'practice-area', 'articles'].includes(result.subtype));
    const modifiedResults = filteredResults.map(result => ({ ...result, url: result.url }));
    const totalResults = parseInt(response.headers.get('X-WP-Total'), 10);
    const totalPages = Math.ceil(totalResults / perPage);
    return { results: modifiedResults, totalPages };
  } catch (error) {
    console.error('Error fetching search results:', error);
    return { results: [], totalPages: 0 };
  }
}

export default function Search() {
  const searchParams = useSearchParams()
  const [results, setResults] = useState();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const perPage = 10;
  const search = searchParams.get('s');
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