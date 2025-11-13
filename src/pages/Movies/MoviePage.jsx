import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom';
import { useSearchMovieQuery } from '../../hooks/useSearchMovie';
import { useMovieGenresQuery } from '../../hooks/useMovieGenres';
import Alert from 'react-bootstrap/Alert';
import Dropdown from 'react-bootstrap/Dropdown';
import { Col, Row, Container } from 'react-bootstrap';
import MovieCard from '../../common/MovieCard/MovieCard';
import ReactPaginate from 'react-paginate';
import './MoviePage.style.css';

const MoviePage = () => {
  const [query, setQuery] = useSearchParams('');
  const [page, setPage] = useState(1);
  const [sortOrder, setSortOrder] = useState([]); // State for sort order
  const [selectedGenre, setSelectedGenre] = useState(null); // State for selected genre
  const keyword = query.get('q');

  useEffect(() => {
    setPage(1);
  }, [keyword]);

  const { data, isLoading, isError, error } = useSearchMovieQuery({ keyword, page });
  const { data: genresData } = useMovieGenresQuery();
  console.log("data", data);
  console.log("genresData", genresData);

  const handlePageClick = (selectedPage) => {
    setPage(selectedPage.selected + 1);
  };

  const handleGenreSelect = (genreId) => {
    setSelectedGenre(genreId); 
  };

  const filteredMovies = selectedGenre
    ? data?.results.filter((movie) => movie.genre_ids.includes(selectedGenre))
    : data?.results; 

const handleSortByPopularity = (order) => {
  const sortedMovies = [...data?.results].sort((a, b) =>
    order === "most" ? b.popularity - a.popularity : a.popularity - b.popularity
  );
  setSortOrder(sortedMovies);
};

const moviesToRender = sortOrder.length > 0 ? sortOrder : filteredMovies;


console.log("filteredMovies",  data?.results[0].popularity);
  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  return (
    <Container className="mt-4" >
      <Row className="mb-3 dropdown-popularity-genre">
        <Col xs="auto">
          <Dropdown>
            <Dropdown.Toggle variant="danger" id="dropdown-basic">
              {sortOrder.length > 0 ? (sortOrder[0].popularity === Math.max(...data?.results.map(m => m.popularity)) ? "Most Popular" : "Less Popular") : 'Sort by Popularity'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#" onClick={() => handleSortByPopularity("most")}>Descending</Dropdown.Item>
              <Dropdown.Item href="#" onClick={() => handleSortByPopularity("less")}>Ascending</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col>
          <Dropdown>
            <Dropdown.Toggle variant="danger" id="dropdown-basic">
              {selectedGenre
                ? genresData.find((genre) => genre.id === selectedGenre)?.name
                : 'Genre'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {genresData?.map((genre) => (
                <Dropdown.Item
                  key={genre.id}
                  alrt={genre.name}
                  onClick={() => handleGenreSelect(genre.id)} 
                >
                  {genre.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>
      <Row className="justify-content-center">
        {moviesToRender?.length === 0 && <h2>{keyword}와 일치하는 영화가 없습니다.</h2>}
        {moviesToRender?.map((movie, index) => (
          <Col
            key={index}
            lg={3}
            md={6}
            xs={12}
            className="d-flex justify-content-center align-items-center mb-3"
          >
            <MovieCard movie={movie} />
          </Col>
        ))}
      </Row>
      <ReactPaginate
        className="pagination"
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
  );
};

export default MoviePage;