import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom';
import { useSearchMovieQuery } from '../../hooks/useSearchMovie';
import Alert from 'react-bootstrap/Alert';
import { Col, Row, Container } from 'react-bootstrap';
import MovieCard from '../../common/MovieCard/MovieCard';
import ReactPaginate from 'react-paginate';
import './MoviePage.style.css';

const MoviePage = () => {
  const [query, setQuery] = useSearchParams('');
  const [page, setPage] = useState(1);
  const keyword = query.get('q');

useEffect(() => {
  setPage(1);
}, [keyword]);

  const { data, isLoading, isError, error } = useSearchMovieQuery({ keyword, page });

  const handlePageClick = (selectedPage) => {
    setPage(selectedPage.selected + 1);
  }

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }
  return <Container className="mt-4">
  <Row className="justify-content-center">
    {data?.results.length === 0 && <h2>{keyword}와 일치하는 영화가 없습니다.</h2>}
    {data?.results.map((movie, index) => (
      <Col key={index} lg={3} md={6} xs={12} className="d-flex justify-content-center align-items-center mb-3">
        <MovieCard movie={movie} />
      </Col>
    ))}
  </Row>
       <ReactPaginate className='pagination'
        previousLabel="Previous"
        nextLabel="Next"
        pageClassName="page-item"
        pageLinkClassName="r-page-link"
        previousClassName="page-item"
        previousLinkClassName="r-page-link"
        nextClassName="page-item"
        nextLinkClassName="r-page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="r-page-link"
        pageCount={data?.total_pages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName="pagination"
        activeClassName="active"
        forcePage={page - 1}
      />
</Container>
}

export default MoviePage