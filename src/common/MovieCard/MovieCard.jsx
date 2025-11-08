import React from "react";
import { Badge } from "react-bootstrap";
import { useMovieGenresQuery } from "../../hooks/useMovieGenres";
import "./MovieCard.style.css";

const MovieCard = ({ movie }) => {
  const { data: genresData } = useMovieGenresQuery();

  const showGenres = (genresIdList) => {
    if (!genresData) return [];
    const genreNameList = genresIdList.map((id)=> {
      const genreObj = genresData.find((genre) => genre.id === id)
      return genreObj.name;
  })

    return genreNameList
  }
  return (
    <div
      style={{
        backgroundImage:
          "url(" +
          `https://media.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster_path}` +
          ")",
      }}
      className="movie-card"
    >
      <div className="overlay p-2">
        <h1>{movie.title}</h1>
        <div>
        {showGenres(movie.genre_ids).map((genre, index) => (
          <Badge className="me-1" key={index} bg="danger">{genre}</Badge>
        ))}
        </div>
        <div className="mt-2">
            <img src="/IMDB.png" alt="IMDB Rating" width={20} className="me-1" />
            {movie.vote_average}
          <img src="/people.png" width={20} className="ms-2" />{movie.popularity}
          {movie.adult ? <img src="/over18.jpeg" width={20} className="ms-2" /> : <img src="/under18.svg" width={20} className="ms-2" />}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
