import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchPokemon = async ({ pageParam = 0 }) => {
  const limit = 6;
  const offset = pageParam;
  const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
  return res.data;
};

export function usePokemon() {
  return useInfiniteQuery({
    queryKey: ["pokemon"],
    queryFn: fetchPokemon,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.next) {
        return pages.length * 6;
      }
      return undefined;
    }
  });
}
