
import { useEffect, useState, memo } from "react";
import axios from "axios";
import { env_variables } from "../../environment"; 
import { MoviesInterface } from "../../interfaces/MoviesInterface";
import Header from "../Header/Header";
import MovieCard from "../MovieCard/MovieCard";
import Loader from "../Loader/Loader";
import './MoviesList.css';
import '../../App.css';

async function fetchUpcomingMovies(page: number, query: string): Promise<MoviesInterface[]> {

    let url: string = "";
    query.trim().length 
    ? url = `/search/movie?query=${encodeURIComponent(query)}&page=${page}&language=en-US&sort_by=release_date.desc` 
    : url = `/movie/upcoming?language=en-US&page=${page}&sort_by=release_date.desc`;

    const options: any = {
      method: 'GET',
      url: `${env_variables.BASE_API_URL + url}`,
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${env_variables.BEARER_TOKEN}`    
      }
    };

    try {
        const response: any = await axios.request(options);
        const moviesArray: any[] = [];
        for(let data of response.data.results) {
          
          const movie: MoviesInterface = {
            id: data.id,
            movie_title: data.title ? data.title : '-',
            movie_media: data.backdrop_path,
            rating: data.vote_average ? data.vote_average.toFixed(1) : 0,
            description: data.overview ? data.overview : '-',
          };
          moviesArray.push(movie);
        }
        return moviesArray;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

function MoviesList() {

  const [movies, setMovies] = useState<MoviesInterface[]>([]);
  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    console.log(query, page, movies);
    fetchUpcomingMovies(page, query).then((result: any) => {
      setMovies([ ...movies, ...result ]);
      setIsLoading(false);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, query]);

  const buttonClick = () =>{
    setPage(page+1);
  }

  return (
        <>
              <Header searchBar = {true} setQuery = {setQuery} setMovies = {setMovies} setPage = {setPage}/>
              {
                isLoading ? <Loader /> : 
                <div className = "App MovieCardContainer">
                  {
                    movies.length ? movies.map((movie: MoviesInterface)=>{
                      return (
                        <MovieCard key = {movie.id} movie = {movie}/>
                      )
                    }) : 'No results found'
                  }
                </div>
              }
              <div className = "App PaginationContainer">
                <button  className = "LoadButton" onClick = {buttonClick} disabled={isLoading}>
                  Load More...
                </button>
              </div>
        </>
  );
}
export default memo(MoviesList);