import React, { useState, useEffect } from "react";
import { usePopularMoviesQuery } from "../../../../hooks/usePopularMovies";
import { useMovieTrailerQuery } from "../../../../hooks/useMovieTrailer";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import "./Banner.style.css";
import TrailerModal from "../../../../common/TrailerModal/TrailerModal";

const Banner = ({ movieData }) => {
  const { data, isLoading, isError, error } = usePopularMoviesQuery();
  const [show, setShow] = useState(false);
  const [trailerKey, setTrailerKey] = useState(null);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const bannerMovie = movieData?.id ? movieData : data?.results[0];
  const movieId = bannerMovie?.id;
  
  const { data: trailerData } = useMovieTrailerQuery({ id: movieId });


  useEffect(() => {
    if (Array.isArray(trailerData?.results) && trailerData.results.length > 0 && trailerData.results[0]?.key) {
      console.log("trailerData key", trailerData.results[0].key);
      setTrailerKey(trailerData.results[0].key);
    } else {
      console.log("No trailer available for this movie.");
      setTrailerKey(null);
    }
  }, [trailerData]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  return (
    <div
      style={{
        backgroundImage:
          "url(" +
          `https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces${bannerMovie.poster_path}` +
          ")",
      }}
      className="banner"
    >
      <div className="text-white banner-text-area">
        <h1>{bannerMovie.title}</h1>
        <p>{bannerMovie.overview}</p>
        <Button variant="light" onClick={handleShow}>
          ▶ Play
        </Button>
        <TrailerModal
          show={show}
          handleClose={handleClose}
          trailerId={trailerKey}
        />
      </div>
    </div>
  );
};

export default Banner;
