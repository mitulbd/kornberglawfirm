import Link from "next/link";
export default function Breadcrumbs({pageName, pageMiddle, pageMiddleslug, isCenter}) {
  return (
    <ol className={isCenter ? "breadcrumb justify-content-center" :"breadcrumb"}>
      <li className="breadcrumb-item"><Link href="/">Home</Link></li>
      {pageMiddle && <li className="breadcrumb-item"><Link href={pageMiddleslug}>{pageMiddle}</Link></li>}
      <li className="breadcrumb-item active" dangerouslySetInnerHTML={{__html:pageName}}/>
    </ol>
  )
}