import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchUpcomingMovies = async () => {
  const response = await api.get(`/movie/upcoming`);
  return response;
}

export const useUpcomingMoviesQuery = () => {
  return useQuery({
    queryKey: ["upcoming-movies"],
    queryFn: fetchUpcomingMovies,
    select: (result) => result.data,
  });
};