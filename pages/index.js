import styles from '../styles/Home.module.css';
import { useState, useEffect } from 'react';

export default function Home() {
   const [data, setData] = useState({ text: '' });
   const [query, setQuery] = useState('');
   const [isLoading, setIsLoading] = useState(false);

   const handleSubmit = async (e) => {
      e.preventDefault();
      if (query) {
         setIsLoading(true);
         await fetch(`/api/openai`, {
            body: JSON.stringify({ name: 'test' }),

            headers: {
               'Content-Type': 'application/json',
            },
            method: 'POST',
         })
            .then(async (res) => {
               const data = await res.json();
               setData(data);
               setIsLoading(false);
            })
            .catch((err) => {
               throw new Error(`There was an error with the API: ${err}`);
            });
      }
   };

   return (
      <>
         <form onSubmit={(e) => handleSubmit(e)}>
            <input
               type='text'
               name='idea'
               placeholder='Type any idea'
               value={query}
               onChange={(event) => setQuery(event.target.value)}
            />
            <button type='submit'>Generate Idea</button>
         </form>
         <div>
            {isLoading ? <div>Loading...</div> : <span>{data.text}</span>}
         </div>
      </>
   );
}
