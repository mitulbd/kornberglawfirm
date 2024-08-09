"use client";
import { useState } from "react";
import Breadcrumbs from "@/app/component/Breadcrumbs";
import { replaceBaseUrl } from '@/app/utils/urlUtils';
import Loading from "@/app/component/Loading";
import Link from "next/link";

export default function Categories({ initialPosts, initialTotalPages, initialCategory }) {
  const [posts, setPosts] = useState(initialPosts);
  const [currentCategory] = useState(initialCategory);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const [isLoadMoreLoading, setIsLoadMoreLoading] = useState(false);
  const perPage = 9;

  const fetchPosts = async (categoryId, page) => {
    try {
      setIsLoadMoreLoading(true);
      const postRes = await fetch(`https://kornberglawfirm.com/wp-json/wp/v2/posts?categories=${categoryId}&per_page=${perPage}&page=${page}&_fields=id,title,link`);
      if (!postRes.ok) throw new Error('Network response was not ok');
      const postData = await postRes.json();
      const totalPages = postRes.headers.get('X-WP-TotalPages');
      setPosts(prevPost => [...prevPost, ...postData]);
      setTotalPages(Number(totalPages));
      setCurrentPage(page);
    } catch (error) {
      console.error('Failed to fetch more posts:', error);
    } finally {
      setIsLoadMoreLoading(false);
    }
  };

  const loadMorePosts = () => {
    if (currentPage < totalPages) {
      fetchPosts(currentCategory?.id, currentPage + 1);
    }
  }; 

  return (
    posts === undefined ? <Loading /> :
      <>
        <section className="page-banner">
          <div className="container">
            <div className="banner-headings">
              <h1>Blog</h1>
              <h2 className="bordered-text">Category: {currentCategory?.name}</h2>
              <Breadcrumbs pageName={`Category: ${currentCategory?.name}`} isCenter={true} />
            </div>
          </div>
        </section>
        <section className="post-page-sec">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-xl-10 blog-page">
                <div className="row">
                  {posts?.map((data, index) => (
                    <div key={index} className="col-md-6 col-lg-4">
                      <div className="blog-list-block">
                        <h5 dangerouslySetInnerHTML={{ __html: data.title?.rendered }} />
                        <div><Link href={replaceBaseUrl(data.link)} className="btn btn-primary btn-sm stretched-link">View Post</Link></div>
                      </div>
                    </div>
                  ))}
                </div>
                {currentPage < totalPages && (
                  <h5 onClick={loadMorePosts} className="load-more-post" disabled={isLoadMoreLoading}>
                    {isLoadMoreLoading ? 'Loading...' : 'Load More Blog Posts'}
                  </h5>
                )}
              </div>
            </div>
          </div>
        </section>
      </>
  );
}