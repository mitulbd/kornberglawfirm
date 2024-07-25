"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import searcIcon from "@/app/assets/images/icon-search-yellow.svg";
import Image from 'next/image';

export default function SidebarSearch() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/search?s=${encodeURIComponent(query)}`);
  };

  return (
    <form role="search" method="get" className='search-form' onSubmit={handleSearch}>
      <div className="input-group">
        <input type="search" className="form-control" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search..." name="s" required />
        <button className="btn" type="submit"><Image src={searcIcon} className='svg' alt="search" width={27} height={27} /></button>
      </div>
    </form>
  )
}