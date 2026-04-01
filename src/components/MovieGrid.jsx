import { useEffect, useRef, useState } from "react";
import axios from "axios";
import MovieCard from "./MovieCard";

const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

export default function MovieGrid({ query }) {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef(null);

  const fetchMovies = async (q, p) => {
    setLoading(true);
    try {
      const url = q
        ? `https://api.themoviedb.org/3/search/movie?query=${q}&page=${p}`
        : `https://api.themoviedb.org/3/movie/popular?page=${p}`;

      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${TOKEN}` },
      });

      const results = res.data.results;
      setMovies(prev => (p === 1 ? results : [...prev, ...results]));
      setHasMore(p < res.data.total_pages);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  // 當 query 改變，重置
  useEffect(() => {
    setMovies([]);
    setPage(1);
    setHasMore(true);
    fetchMovies(query, 1);
  }, [query]);

  // 當 page 改變（但不是第一頁）
  useEffect(() => {
    if (page === 1) return;
    fetchMovies(query, page);
  }, [page]);

  // Intersection Observer 偵測底部
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore && !loading) {
        setPage(prev => prev + 1);
      }
    });
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [hasMore, loading]);

  return (
    <div>
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "20px",
        justifyContent: "center",
        padding: "20px",
      }}>
        {movies.map((movie, i) => (
          <MovieCard key={`${movie.id}-${i}`} movie={movie} />
        ))}
      </div>

      <div ref={loaderRef} style={{ textAlign: "center", padding: "32px", color: "#aaa" }}>
        {loading && "載入中..."}
        {!hasMore && !loading && "已顯示全部結果"}
      </div>
    </div>
  );
}