import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchPopularMovies = async () => {
  const response = await api.get(`/movie/popular`);
  return response;
}

export const usePopularMoviesQuery = () => {
  return useQuery({
    queryKey: ["popular-movies"],
    queryFn: fetchPopularMovies,
    select: (result) => result.data,
  });
};