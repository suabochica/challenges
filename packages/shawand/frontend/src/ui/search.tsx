import { useState, useEffect } from "react";

import { type Data } from "../types";

export const Search = ({initialData}: {initialData: Data }) => {
  const [data, setData] = useState(initialData);
  const [search, setSearch] = useState<string>('');

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  }

  useEffect(() => {
    if (search === '') {
      window.history.pushState({}, '', window.location.pathname);

      return
    }

    window.history.pushState({}, '', `?q=${search}`);
  }, [search]);

  return (
    <div>
      <h1>Search</h1>
      <form>
        <input onChange={handleSearch} type="search" name="search" id="search" placeholder="Search info..." />
      </form>
    </div>
  )
}
