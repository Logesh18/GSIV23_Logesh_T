import { useState, useEffect } from "react";
import { env_variables } from "../../environment";
import { MovieDetailInterface } from "../../interfaces/MovieDetailInterface";
import Header from "../Header/Header";
import axios from "axios";
import { useParams } from "react-router-dom";
import './MovieDetails.css';
import NoImage from '../../assets/icon-no-image.jpg';
import Loader from "../Loader/Loader";

async function fetchMovieDetails(id: string | undefined): Promise<MovieDetailInterface> {

  const url: string = `/movie/${id}?append_to_response=credits`;

  const options: any = {
    method: 'GET',
    url: `${env_variables.BASE_API_URL + url}`,
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${env_variables.BEARER_TOKEN}`    
    }
  };
  let movieDetail: MovieDetailInterface = {
    id: 0,
    movie_media: "",
    movie_title: "",
    rating: 0,
    description: "",
    year: "",
    cast: "",
    director: "",
    length: "00:00"
  };
  try {
      let response: any = await axios.request(options);
      response = response.data;
      movieDetail = {
        id: response.id,
        movie_media: response.backdrop_path,
        movie_title: response.title ? response.title : '-',
        rating: response.vote_average ? response.vote_average.toFixed(1) : 0,
        description: response.overview ? response.overview : '-',
        year: response.release_date ? response.release_date.split('-')[0] : '-',
        cast: response.credits.cast.length ? 
              response.credits.cast.map((person: any) => person.name).toString().split(',').join(', ')
              : '-',
        director: response.credits.crew.length ?
                  response.credits.crew.find((person: any) => person.job === 'Director').name
                  : '-',
        length: response.runtime ? 
                Math.floor(response.runtime / 60).toString().padStart(2, '0') + ":" + 
                Math.floor(response.runtime % 60).toString().padStart(2, '0')
                : '00:00'
      };
      return movieDetail;
  } catch (error) {
      console.error('Error fetching data:', error);
      return movieDetail;
  }
}

function MovieDetails() {

    const { id } = useParams<{ id: string }>();
    const [detail, setDetail] = useState<MovieDetailInterface | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(()=>{
      setIsLoading(true);
      fetchMovieDetails(id).then((result: any) => {
        setDetail(result);
        setIsLoading(false);
      });     
    }, [id]);
    
    return (
      <>
          <Header searchBar = {false}/>
          
          {
            isLoading ? <Loader /> :
              <div className="MovieDetailContainer">
                <div className="MovieImageContainer">
                  <img className = "MovieImageTag" 
                    src={ detail?.movie_media ? 'https://image.tmdb.org/t/p/w500' + detail.movie_media : NoImage} 
                    alt={ detail?.movie_title } 
                  />
                </div>
                <div className="MovieContentContainer">
                  <div className="TitleContainer">
                    <span className="MovieTitleTag">
                      { detail?.movie_title }
                    </span>
                    <span className="MovieRatingTag">
                      ({ detail?.rating })
                    </span>
                  </div>
                  <div className = "FontStyle BasicDetails">
                    <span className="ProductionDetail">
                      { detail?.year} | { detail?.length }  | {detail?.director }
                    </span>
                    <span className="CastDetails">
                      Cast: { detail?.cast }
                    </span>
                  </div>
                  <div className="FontStyle DescriptionContainer">
                    Description: { detail?.description }
                  </div>
                </div>
              </div>
          }
      </>
      
    );
  }

export default MovieDetails;
