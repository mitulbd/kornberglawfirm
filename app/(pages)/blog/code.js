"use client";
import { useState } from "react";
import Breadcrumbs from "@/app/component/Breadcrumbs";
import Image from "next/image";
import blogBg from "@/app/assets/images/blog-bg-img.webp";
import Link from "next/link";
import { replaceBaseUrl } from "@/app/utils/urlUtils";
import Loading from "@/app/component/Loading";

export default function BlogCode({ initialPosts, initialTotalPages }) {
  const [post, setPost] = useState(initialPosts);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const [isLoadMoreLoading, setIsLoadMoreLoading] = useState(false);
  const loadMoreCount = 3;

  const loadMorePosts = async () => {
    setIsLoadMoreLoading(true);
    const nextPage = currentPage + 1;
    try {
      const res = await fetch(`https://kornberglawfirm.com/wp-json/wp/v2/posts?per_page=${loadMoreCount}&page=${nextPage}&_fields=title,link,id`);
      if (!res.ok) throw new Error('Network response was not ok');
      const newPost = await res.json();
      setPost(prevPost => [...prevPost, ...newPost]);
      setCurrentPage(nextPage);
    } catch (error) {
      console.error('Failed to fetch more posts:', error);
    } finally {
      setIsLoadMoreLoading(false);
    }
  };

  return (
    <>
      {isLoadMoreLoading ? <Loading/> : null}
      <section className="post-page-sec">
        <div className="container">
          <Breadcrumbs pageName="Blog" />
          <div className="row justify-content-center">
            <div className="col-xl-10 blog-page">
              <h1 className="post-page-title">Firm Blog</h1>
              <div className="blog-sec-title"><h4>Recent Posts</h4></div>
              <div className="row">
                {post?.map((data, index) => (
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
        <div className="blog-page-bg">
          <Image src={blogBg} width={blogBg.width} alt="Blog Bg" height={blogBg.height} />
        </div>
      </section>
    </>
  );
}