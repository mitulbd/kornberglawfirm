import Link from "next/link";
export default function notFount() {
  return (
    <section className="page-banner">
      <div className="container text-center">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <h1>404</h1>
            <h2 className="bordered-text">Page Not Found</h2>
            <p className="text-white">It looks like the page you are looking for no longer exists. Use the navigation above or check out our Home page to get back on track.</p>
            <Link href="/" className="btn btn-primary btn-lg" title="GO TO HOME">GO TO HOME</Link>
          </div>
        </div>
      </div>
    </section>
  )
}