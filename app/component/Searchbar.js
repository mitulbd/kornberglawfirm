"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import searcIcon from "@/app/assets/images/icon-search.svg";
import Image from 'next/image';

export default function Searchbar() {
  const [isSearch, setIsSearch] = useState(false);
  const [query, setQuery] = useState('');
  const router = useRouter();

  const toggleSearch = () => {
    setIsSearch(prevState => !prevState);
  };
  
  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/search?s=${encodeURIComponent(query)}`);
    setIsSearch(false);
  };  

  return (
    <div className="header-search-icon">
      <div className="header-search-icon-img" onClick={toggleSearch}><Image className="svg" src={searcIcon} alt="search" width={21} height={21} /></div>
      <form role="search" method="get" className={isSearch ? 'search-form form-open' : 'search-form'} onSubmit={handleSearch}>
        <div className="input-group">
          <input type="search" className="form-control" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search..." name="s" required />
          <button className="btn btn-primary" type="submit"><Image src={searcIcon} alt="search" width={17} height={17} /></button>
        </div>
      </form>
    </div>
  )
}