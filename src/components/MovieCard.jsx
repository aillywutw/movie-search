import { motion } from "framer-motion";

export default function MovieCard({ movie }) {
  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
    : "https://via.placeholder.com/300x450?text=No+Image";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      style={{
        background: "#1a1a1a",
        borderRadius: "12px",
        overflow: "hidden",
        width: "200px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
        cursor: "pointer",
      }}
    >
      <img src={poster} alt={movie.title} style={{ width: "100%", display: "block" }} />
      <div style={{ padding: "12px" }}>
        <p style={{ color: "white", fontSize: "0.9rem", fontWeight: "bold", margin: 0 }}>
          {movie.title}
        </p>
        <p style={{ color: "#aaa", fontSize: "0.8rem", margin: "4px 0 0" }}>
          ⭐ {movie.vote_average?.toFixed(1)} · {movie.release_date?.slice(0, 4)}
        </p>
      </div>
    </motion.div>
  );
}