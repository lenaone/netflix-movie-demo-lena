import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchMovieGenres = async () => {
  const response = await api.get(`/genre/movie/list`);
  return response;
}

export const useMovieGenresQuery = () => {
  return useQuery({
    queryKey: ["movie-genres"],
    queryFn: fetchMovieGenres,
    select: (result) => result.data.genres,
    staleTime: 300000,
  });
};
