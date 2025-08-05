import { useEffect, useRef } from "react";
import { usePokemon } from "../hooks/usePokemon";
import PokemonCard from "./PokemonCard";

export default function Discovery() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = usePokemon();
  const loader = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    }, { threshold: 1 });

    if (loader.current) observer.observe(loader.current);

    return () => {
      if (loader.current) observer.unobserve(loader.current);
    };
  }, [fetchNextPage, hasNextPage]);

  return (
    <div>
      <div className="grid">
        {data?.pages.map((page) =>
          page.results.map((pokemon) => (
            <PokemonCard key={pokemon.name} name={pokemon.name} url={pokemon.url} />
          ))
        )}
      </div>
      <div ref={loader} className="loader">
        {isFetchingNextPage && "Loading more Pokemon..."}
      </div>
    </div>
  );
}
