"use client"
import { useState, useEffect } from "react";
import { useParams } from 'next/navigation';
import Breadcrumbs from "@/app/component/Breadcrumbs";
import { replaceBaseUrl } from '@/app/utils/urlUtils';
import Loading from "@/app/component/Loading";
import Link from "next/link";

export default function Category() {
  const params = useParams();
  const [posts, setPosts] = useState();
  const [currentCategory, setCurrentCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoadMoreLoading, setIsLoadMoreLoading] = useState(false);
  const perPage = 9;
  const loadMoreCount = 3;

  const fetchCategories = async () => {
    try {
      const response = await fetch("https://kornberglawfirm.com/wp-json/wp/v2/categories?_fields=id,name,slug&per_page=100");
      const data = await response.json();
      const thisCategory = data.find(cat => cat.slug === params.slug);
      setCurrentCategory(thisCategory);
      if (thisCategory) {
        fetchPosts(thisCategory.id, 1);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchPosts = async (categoryId, page) => {
    try {
      setIsLoadMoreLoading(true);
      const postRes = await fetch(`https://kornberglawfirm.com/wp-json/wp/v2/posts?categories=${categoryId}&per_page=${perPage}&page=${page}&_fields=id,title,link`);
      if (!postRes.ok) {
        throw new Error('Network response was not ok');
      }
      const postData = await postRes.json();
      const totalPages = postRes.headers.get('X-WP-TotalPages');
      setPosts(postData);
      setTotalPages(Number(totalPages));
    } catch (error) {
      console.error('Failed to fetch initial data:', error);
    } finally {
      setIsLoadMoreLoading(false);
    }
  };
  const loadMorePosts = async () => {
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      setIsLoadMoreLoading(true);
      try {
        const res = await fetch(`https://kornberglawfirm.com/wp-json/wp/v2/posts?categories=${currentCategory?.id}&per_page=${loadMoreCount}&page=${nextPage}&_fields=id,title,link`);
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const newPost = await res.json();
        setPosts(prevPost => [...prevPost, ...newPost]);
        setCurrentPage(nextPage);
      } catch (error) {
        console.error('Failed to fetch more posts:', error);
      } finally {
        setIsLoadMoreLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [params.slug]);

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