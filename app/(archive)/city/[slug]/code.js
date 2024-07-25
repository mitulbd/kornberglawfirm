"use client"
import { useState, useEffect } from "react";
import { useParams } from 'next/navigation';
import Breadcrumbs from "@/app/component/Breadcrumbs";
import { replaceBaseUrl } from '@/app/utils/urlUtils';
import Loading from "@/app/component/Loading";
import Link from "next/link";

export default function City() {
  const params = useParams();
  const [posts, setPosts] = useState();
  const [currentCity, setCurrentCity] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoadMoreLoading, setIsLoadMoreLoading] = useState(false);
  const perPage = 9;
  const loadMoreCount = 3;

  const fetchCategories = async () => {
    try {
      const data = await fetch("https://kornberglawfirm.com/wp-json/wp/v2/city?_fields=id,name,slug&per_page=100", {next:{revalidate:3600 }}).then(res => res.json());
      const thisCity = data.find(cat => cat.slug === params.slug);
      setCurrentCity(thisCity);
      if (thisCity) {
        fetchPosts(thisCity.id, 1);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };
  const fetchPosts = async (cityId, page) => {
    try {
      setIsLoadMoreLoading(true);
      const postRes = await fetch(`https://kornberglawfirm.com/wp-json/wp/v2/practice-area?city=${cityId}&per_page=${perPage}&page=${page}&_fields=id,title,link,slug`);
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
        const res = await fetch(`https://kornberglawfirm.com/wp-json/wp/v2/practice-area?city=${currentCity?.id}&per_page=${loadMoreCount}&page=${nextPage}&_fields=id,title,link,slug`);
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
              <h1>Practice Areas</h1>
              <h2 className="bordered-text">City: {currentCity?.name}</h2>
              <Breadcrumbs pageName={`City: ${currentCity?.name}`} isCenter={true} />
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
                        <h5 dangerouslySetInnerHTML={{ __html: data?.title.rendered }} />
                        <div><Link href={replaceBaseUrl(data?.link)} className="btn btn-primary btn-sm stretched-link">View Post</Link></div>
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