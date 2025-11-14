import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchTopRatedMovies = async () => {
  const response = await api.get(`/movie/top_rated`);
  return response;
}

export const useTopRatedMoviesQuery = () => {
  return useQuery({
    queryKey: ["top_rated-movies"],
    queryFn: fetchTopRatedMovies,
    suspense: true,
    select: (result) => result.data,
  });
};