import { useState,useEffect, use } from 'react'
import reactLogo from './assets/react.svg'
import Search from './components/Search.jsx'


const API_BASE_URL='https://api.themoviedb.org/3';

const API_KEY=import.meta.env.VITE_TMBD_API_KEY;

const API_OPTIONS={
  method: 'GET',
  headers: {
    accept: 'application/json',  
    Authorization: `Bearer ${API_KEY}`,
  },
}

const App=()=>{ 
  const [searchTerm,setSearchTerm]=useState('');
  const [errorMessage, setErrorMessage]=useState('');
  const [movieList,setMovieList]=useState([]);
  const [isLoading,setIsLoading]=useState(false);

const fetchMovies=async()=>{

  setIsLoading(true);
  setErrorMessage('');

  try{
   const endpoint = searchTerm
  ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(searchTerm)}`
  : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

    const response=await fetch(endpoint,API_OPTIONS);

    if(!response.ok){
      throw new Error(`Failed to fetch movies`);
    }

    const data=await response.json();
    
    if(data.Response === 'False'){
      setErrorMessage(data.Error || 'Failed to fetch movies');
      setMovieList([]);
      return;
    }
    setMovieList(data.results || []);
    
    

  }catch(error){
   console.error(`Error fetching movies: ${error}`);
    setErrorMessage(`Failed to fetch movies. Please try again.`)
    }finally{
      setIsLoading(false);
    }
  }


  useEffect(()=>{
    fetchMovies();
  },[searchTerm])


  return (
  <main>
   <div className="pattern"/>

   <div className="wrapper">
   <header>
    <img src="./hero-img.png" alt="BG Banner" />
    <h1>Find <span className="text-gradient">Movies</span> You'll Enjoy Without the hassle</h1>

    <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
   </header>

      <section className="all-movies">
        <h2>All movies</h2>

      {isLoading ? (
        <p className="text-white">Loading...</p>
      ) : errorMessage ? (
        <p className="text-red-500">{errorMessage}</p>
      ):(

      <ul>
        {movieList.map((movie)=>(
          <p className="text-white">{movie.title}</p>
        ))}
      </ul>
      
      )}
      </section>
    
    </div>
  
  </main>
  )

}
export default App
