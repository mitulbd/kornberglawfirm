export async function fetchSearchResults(search, page = 1, perPage = 10) {
  try {
    const response = await fetch(`https://kornberglawfirm.com/wp-json/wp/v2/search?search=${search}&page=${page}&per_page=${perPage}&_fields=id,title,url,type,subtype`, { next: { revalidate: 3600 } });
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