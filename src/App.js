import {React,useState} from "react";
import useBookSearches from "./useBookSearches.js";

function App() {
  const [query,setQuery] = useState("")
  const [pageNumber,setPageNumber] = useState(1)

  

function handleSearch(e){
  setQuery(e.target.value)
  setPageNumber(1)
}

const {
  loading, error, books, hasMore
} = useBookSearches(query,pageNumber)

  return (
    <>
      <input type='text' onChange={handleSearch}></input>
      <div>{
       
        books.map(book => {
          return <div key={book}>{book}</div>
        })
        }
      </div>
      <div>{loading && 'Loading...'}</div>
      <div>{error && 'Erro ...'}</div>
    </>
      
  );
}

export default App;
