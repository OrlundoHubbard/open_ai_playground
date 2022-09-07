import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";

export default function Home() {
  const [data, setData] = useState({ text: "" });
  const [query, setQuery] = useState();
  const [search, setSearch] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (search) {
        setIsLoading(true);
        const res = await fetch(`/api/openai`, {
          body: { name: search },

          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        });
        const data = await res.json();
        setData(data);
        setIsLoading(false);
      }
    };
    // console.log(fetchData);
    fetchData();
  }, [search]);

  return (
    <>
      <form>
        <input
          type="text"
          name="idea"
          placeholder="Type any idea"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </form>
      <button onClick={() => setSearch(query)}>Generate Idea</button>
      <div>{isLoading ? <div>Loading...</div> : <span>{data.text}</span>}</div>
    </>
  );
}
