import { useEffect, useState } from "react";

export default function PokemonCard({ name, url }) {
  const [details, setDetails] = useState(null);
  const [isInCollection, setIsInCollection] = useState(false);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setDetails(data));
  }, [url]);

  useEffect(() => {
    const collection = JSON.parse(localStorage.getItem("collection") || "[]");
    setIsInCollection(collection.some((p) => p.name === name));
  }, [name]);

  const handleClick = () => {
    const existing = JSON.parse(localStorage.getItem("collection") || "[]");
    if (isInCollection) {
      const updated = existing.filter((p) => p.name !== name);
      localStorage.setItem("collection", JSON.stringify(updated));
      setIsInCollection(false);
    } else {
      existing.push({ name, image: details.sprites.front_default });
      localStorage.setItem("collection", JSON.stringify(existing));
      setIsInCollection(true);
    }
  };

  return (
    <div className="card">
      {details ? (
        <>
          <button className={`add-btn ${isInCollection ? "remove" : ""}`} onClick={handleClick}>
            {isInCollection ? "×" : "+"}
          </button>
          <img src={details.sprites.front_default} alt={name} />
          <h3>{name}</h3>
          <div className="types">
            {details.types.map((t) => (
              <span className="type-badge" key={t.type.name}>
                {t.type.name}
              </span>
            ))}
          </div>
          <p className="stats">{details.stats[0].base_stat} HP</p>
          <p className="stats">{details.stats[1].base_stat} Attack</p>
          <p className="stats">{details.stats[2].base_stat} Defense</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
