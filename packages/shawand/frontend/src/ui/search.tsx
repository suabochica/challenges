import { useState, useEffect } from "react";
import { toast } from "sonner";

import { type Data } from "../types";
import { searchService } from "../services/search";

export const Search = ({initialData}: {initialData: Data }) => {
  const [data, setData] = useState(initialData);
  const [search, setSearch] = useState<string>(() => {
    const searchParams = new URLSearchParams(window.location.search);

    return searchParams.get('q') ?? '';
  });

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  }

  useEffect(() => {
    const newPathname = search === ''
      ? window.location.pathname
      : `?q=${search}`;

    window.history.pushState({}, '', newPathname);
  }, [search]);

  useEffect(() => {
    if (!search) {
      setData(initialData);

      return;
    }

    searchService(search)
      .then((response) => {
        const [err, newData] = response;
        if (err) {
          toast.error(err.message);
          return;
        }

        if (newData) setData(newData);
      })
  }, [search, initialData]);

  return (
    <div>
      <h1>Search</h1>
      <form>
        <input
          onChange={handleSearch}
          type="search"
          name="search"
          id="search"
          placeholder="Search info..."
          defaultValue={search}
        />
      </form>

      <ul>
        {
          data.map((item) => (
            <li key={item.id}>
              <article>
                {Object
                  .entries(item)
                  .map(([key, value]) => <p key={key}><strong>{key}</strong>{value}</p>)}
              </article>
            </li>
          ))
        }
      </ul>
    </div>
  )
}
