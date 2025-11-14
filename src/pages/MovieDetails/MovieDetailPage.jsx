import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useMovieDetailsQuery } from '../../hooks/useMovieDetails';
import { useMovieReviewsQuery } from '../../hooks/useMovieReviews';
import { useMovieRecommendationsQuery } from '../../hooks/useMovieRecommendations';
import { useMovieTrailerQuery } from '../../hooks/useMovieTrailer';
import MovieSlider from '../../common/MovieSlider/MovieSlider';
import { responsive } from "../../constants/responsive";
import Banner from '../Homepage/components/Banner/Banner';
import ErrorMessage from '../../common/ErrorMessage/ErrorMessage';
import { Container, Row, Col, Badge, Button } from 'react-bootstrap';
import './MovieDetailPage.style.css';
import ReviewBox from '../ReviewBox/ReviewBox';
import LoadingSpinner from '../../common/LoadingSpinner/LoadingSpinner';

const MovieDetailPage = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useMovieDetailsQuery({ id });
 const { data: reviews } = useMovieReviewsQuery({ id });
  const { data: recommendations, isLoading: isRecommendationsLoading } = useMovieRecommendationsQuery({ id });
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on movie change
  }, [id]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <ErrorMessage message={error?.message} />;
  }

  return (
    <div>
  <Banner id={id} movieData={data}/>
    <Container className="mt-5 container">
      
      <Row>
        <Col md={5} className="d-flex justify-content-center">
          <img
            src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${data.poster_path}`}
            alt={data.title}
            className="img-fluid rounded shadow"
            style={{ maxHeight: '500px' }}
          />
        </Col>
        <Col md={7} className='mt-mobile'>
          <div className="d-flex mb-4">
            {data.genres.map((genre) => (
              <Badge className="movie-badge me-2" key={genre.id}>{genre.name}</Badge>
            ))}
          </div>
          <h1 className="movie-title">{data.title}</h1>
          <h3 className="mb-3">{data.tagline}</h3>
          <div className="mb-3">
             <img src="/IMDB.png" alt="IMDB Rating" width={20} className="me-1" />
            {data.vote_average}
          <img src="/people.png" width={20} className="ms-2" />{data.popularity}
          {data.adult ? <img src="/over18.jpeg" width={20} className="ms-2" /> : <img src="/under18.svg" width={20} className="ms-2" />}
          </div>
          <p className="mb-4">{data.overview}</p>
          <hr />
          <div className="mb-2">
            <Button variant="danger" className="movie-detail-badge me-2">Budget</Button>
            <span>${data.budget.toLocaleString()}</span>
          </div>
          <div className="mb-2">
            <Button variant="danger" className="movie-detail-badge me-2">Revenue</Button>
            <span>${data.revenue.toLocaleString()}</span>
          </div>
          <div className="mb-2">
            <Button variant="danger" className="movie-detail-badge me-2">Release Date</Button>
            <span>{data.release_date}</span>
          </div>
          <div className="mb-2">
            <Button variant="danger" className="movie-detail-badge me-2">Run time</Button>
            <span>{data.runtime}분</span>
          </div>
        </Col>
      </Row>
      <Row>
            <h3 className='fw-bold pt-5'>Related Movies</h3>
            {isRecommendationsLoading ? (
              <p>Loading...</p>
            ) : recommendations?.length === 0 ? (
              <p>0 Results</p>
            ) : (
              <MovieSlider movies={recommendations} responsive={responsive} />
            )}
      </Row>
      <Row>
        <h3 className='fw-bold pt-2'>Reviews</h3>
      <ReviewBox
      reviews={reviews}
      />
      </Row>
    </Container>
    </div>
  )
}

export default MovieDetailPage