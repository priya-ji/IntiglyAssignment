import { useState } from "react";
import Discovery from "./components/Discovery";
import Collection from "./components/Collection";

export default function App() {
  const [tab, setTab] = useState("discovery");

  return (
    <div>
      <h1>🔥 Pokemon Collection App</h1>
      <nav>
        <button onClick={() => setTab("discovery")}>Discover Pokemon</button>
        <button onClick={() => setTab("collection")}>My Collection</button>
      </nav>
      {tab === "discovery" ? <Discovery /> : <Collection />}
    </div>
  );
}
