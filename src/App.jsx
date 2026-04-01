import { useState } from "react";
import SearchBar from "./components/SearchBar";
import MovieGrid from "./components/MovieGrid";

export default function App() {
  const [query, setQuery] = useState("");

  return (
    <div style={{ minHeight: "100vh", background: "#0f0f0f", fontFamily: "sans-serif" }}>
      <h1 style={{ textAlign: "center", color: "white", padding: "32px 0 0", fontSize: "2rem" }}>
        🎬 Movie Search
      </h1>
      <SearchBar value={query} onChange={setQuery} />
      <MovieGrid query={query} />
    </div>
  );
}