import {React, useCallback, useRef, useState} from "react";
import useBookSearches from "./useBookSearches.js";

function App() {
  const [query,setQuery] = useState("")
  const [pageNumber,setPageNumber] = useState(1)

  const {
    loading, error, books, hasMore
  } = useBookSearches(query,pageNumber)

  const observer = useRef()
  
  const lastBookRef = useCallback(node => {
    if(loading) return
    if(observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      console.log('entry:')
      console.log(entries[0].target)
      if(entries[0].isIntersecting){
        
        setPageNumber(p => p+1)
      }
    })
    console.log('node:')
    console.log(node)
    if(node) observer.current.observe(node)
  },[loading, hasMore])

function handleSearch(e){
  setQuery(e.target.value)
  setPageNumber(1)
}



  return (
    <>
      <input type='text' onChange={handleSearch}></input>
      <div>{
       
        books.map((book,index) => {
          if(books.length === index+1){
            return <div ref={lastBookRef} key={book}>{book}</div>
          }
          else
          {
            return <div key={book}>{book}</div>
          }
        })
        }
      </div>
      <div>{loading && 'Loading...'}</div>
      <div>{error && 'Error...'}</div>
    </>
      
  );
}

export default App;
