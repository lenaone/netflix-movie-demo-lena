import React, { Suspense } from "react";
import Banner from "./components/Banner/Banner";
import PopularMovieSlide from "./components/PopularMovieSlide/PopularMovieSlide";
import TopRatedMovieSlide from "./components/TopRatedMovieSlide/TopRatedMovieSlide";
import UpcomingMovieSlide from "./components/UpcomingMovieSlide/UpcomingMovieSlide";
import LoadingSpinner from "../../common/LoadingSpinner/LoadingSpinner";

const Homepage = () => {
  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <Banner />
        <PopularMovieSlide />
        <TopRatedMovieSlide />
        <UpcomingMovieSlide />
      </Suspense>
    </>
  );
};

export default Homepage;
