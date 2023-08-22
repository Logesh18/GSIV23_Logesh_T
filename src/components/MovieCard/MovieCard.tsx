import { useNavigate } from "react-router-dom";
import './MovieCard.css';
import '../../App.css'
import NoImage from '../../assets/icon-no-image.jpg';

function MovieCard(props: any) {
  const navigate = useNavigate();
  const handleNavigation = (id: number) => {
      navigate(`/movies/${id}`);
  };

  return (
    <>
        <div className="App CardLayout" onClick = {() => handleNavigation(props.movie.id)}>

            <img className = "MovieImage" 
              src={ props.movie?.movie_media ? 'https://image.tmdb.org/t/p/w500' + props.movie.movie_media : NoImage} 
              alt={props.movie.movie_title} 
            />
            <div className = "DetailContainer">
              <div className = "App MovieTitleContainer" >
                <span className = "MovieTitle">{props.movie.movie_title}</span>
                <span className = "MovieRating">({props.movie.rating})</span>
              </div>
              <div className = "MovieDescription">{props.movie.description}</div>
            </div>
        </div>
    </>
  );
}

export default MovieCard;