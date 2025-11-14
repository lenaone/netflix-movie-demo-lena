import React from "react";
import { usePopularMoviesQuery } from "../../../../hooks/usePopularMovies";
import ErrorMessage from '../../../../common/ErrorMessage/ErrorMessage';
import MovieSlider from "../../../../common/MovieSlider/MovieSlider";
import { responsive } from "../../../../constants/responsive";

const PopularMovieSlide = () => {
  const { data, isLoading, isError, error } = usePopularMoviesQuery();

  if (isError) {
    return <ErrorMessage message={error?.message} />;
  }
  return (
    <div>
      <MovieSlider movies={data.results} title="Popular Movies" responsive={responsive} />
    </div>
  );
};

export default PopularMovieSlide;
