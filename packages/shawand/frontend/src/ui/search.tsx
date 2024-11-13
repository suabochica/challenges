import { useState, useEffect } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { toast } from "sonner";

import { type Data } from "../types";
import { searchService } from "../services/search";

const DEBOUNCE_TIME = 320;

export const Search = ({initialData}: {initialData: Data }) => {
  const [data, setData] = useState(initialData);
  const [search, setSearch] = useState<string>(() => {
    const searchParams = new URLSearchParams(window.location.search);

    return searchParams.get('q') ?? '';
  });

  const debounceSearch = useDebounce(search, DEBOUNCE_TIME);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  }

  useEffect(() => {
    const newPathname = debounceSearch === ''
      ? window.location.pathname
      : `?q=${debounceSearch}`;

    window.history.pushState({}, '', newPathname);
  }, [debounceSearch]);

  useEffect(() => {
    if (!debounceSearch) {
      setData(initialData);

      return;
    }

    searchService(debounceSearch)
      .then((response) => {
        const [err, newData] = response;
        if (err) {
          toast.error(err.message);
          return;
        }

        if (newData) setData(newData);
      })
  }, [debounceSearch, initialData]);

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
