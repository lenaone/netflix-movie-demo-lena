import React from "react";
import { useUpcomingMoviesQuery } from "../../../../hooks/useUpcomingMovies";
import MovieSlider from "../../../../common/MovieSlider/MovieSlider";
import ErrorMessage from '../../../../common/ErrorMessage/ErrorMessage';
import { responsive } from "../../../../constants/responsive";

const UpcomingMovieSlide = () => {
  const { data, isLoading, isError, error } = useUpcomingMoviesQuery();

   if (isError) {
    return <ErrorMessage message={error?.message} />;
  }
  return (
    <div>
      <MovieSlider movies={data.results} title="Upcoming Movies" responsive={responsive} />
    </div>
  );
};

export default UpcomingMovieSlide;
