"use client"
import { useState, useEffect } from "react";
import Breadcrumbs from "@/app/component/Breadcrumbs";
import Image from "next/image";
import blogBg from "@/app/assets/images/blog-bg.png";
import Loading from "@/app/component/Loading";
import {replaceBaseUrl} from "@/app/utils/urlUtils";

export default function ArticleCode() {
  const [articlePage, setArticlePage] = useState(null);
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true); // Loading state
  const postsPerPage = 9;
  const loadMoreCount = 3;

  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true); // Set loading to true when fetching starts
      try {
        const [pageRes, articlesRes] = await Promise.all([
          fetch('https://kornberglawfirm.com/wp-json/wp/v2/pages/?slug=articles&_fields=title', {next:{revalidate:3600}}),
          fetch(`https://kornberglawfirm.com/wp-json/wp/v2/articles?per_page=${postsPerPage}&page=1`, {next:{revalidate:3600}}),
        ]);
        if (!pageRes.ok || !articlesRes.ok) {
          throw new Error('Network response was not ok');
        }

        const articlePageData = await pageRes.json();
        const articlesData = await articlesRes.json();
        const totalPages = articlesRes.headers.get('X-WP-TotalPages');

        setArticlePage(articlePageData[0]);
        setArticles(articlesData);
        setTotalPages(Number(totalPages));
      } catch (error) {
        console.error('Failed to fetch initial data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  const loadMorePosts = async () => {
    const nextPage = currentPage + 1;
    setLoading(true);
    try {
      const res = await fetch(`https://kornberglawfirm.com/wp-json/wp/v2/articles?per_page=${loadMoreCount}&page=${nextPage}`);
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      const newArticles = await res.json();
      setArticles(prevArticles => [...prevArticles, ...newArticles]);
      setCurrentPage(nextPage);
    } catch (error) {
      console.error('Failed to fetch more posts:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {articlePage && (
        <section className="post-page-sec">
          <div className="container">
            <Breadcrumbs pageName={articlePage.title?.rendered} />
            <div className="row justify-content-center">
              <div className="col-xl-10 blog-page">
                <h1 className="post-page-title">{articlePage.title?.rendered}</h1>
                {loading && <Loading/>}
                {articles.length > 0 ? (
                  <>
                    <div className="blog-sec-title"><h4>Featured Posts</h4></div>
                    <div className="row">                     
                      {articles.map((data, index) => (
                        <div key={index} className="col-md-6 col-lg-4">
                          <div className="blog-list-block">
                            <h5 dangerouslySetInnerHTML={{__html:data.title?.rendered}}/>
                            <div><a href={replaceBaseUrl(data.link)} className="btn btn-primary btn-sm stretched-link">View Post</a></div>
                          </div>
                        </div>
                      ))}
                    </div>
                    {currentPage < totalPages && !loading && (
                      <h5 id="loadmores" className="load-more-post" onClick={loadMorePosts}>Load More article Posts</h5>
                    )}
                  </>
                ) : (
                  <p>Sorry, No Article found</p>
                )}
              </div>
            </div>
          </div>
          <div className="blog-page-bg">
            <Image src={blogBg} alt="Blog Background" />
          </div>
        </section>
      )}
    </>
  );
}