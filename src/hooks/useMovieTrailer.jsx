import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchMovieTrailer = async ({id}) => {
  return api.get(`/movie/${id}/videos`);
}

export const useMovieTrailerQuery = ({id}) => {
  return useQuery({
    queryKey: ["movie-trailer", {id}],
    queryFn: () => fetchMovieTrailer({id}),
    suspense: true,
    select: (result) => result.data,
  });
};