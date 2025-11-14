import React from "react";
import { useTopRatedMoviesQuery } from "../../../../hooks/useTopRatedMovies";
import ErrorMessage from '../../../../common/ErrorMessage/ErrorMessage';
import MovieSlider from "../../../../common/MovieSlider/MovieSlider";
import { responsive } from "../../../../constants/responsive";

const TopRatedMovieSlide = () => {
  const { data, isLoading, isError, error } = useTopRatedMoviesQuery();

  if (isError) {
    return <ErrorMessage message={error?.message} />;
  }
  return (
    <div>
      <MovieSlider movies={data.results} title="Top Rated Movies" responsive={responsive} />
    </div>
  );
};

export default TopRatedMovieSlide;
