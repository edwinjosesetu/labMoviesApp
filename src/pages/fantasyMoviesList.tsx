import React, { useContext } from "react";
import { MoviesContext } from "../contexts/moviesContext";
import { FantasyMovieProps } from "../types/interfaces";

const containerStyle: React.CSSProperties = {
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "20px",
};

const gridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(500px, 1fr))",
  gap: "20px",
};

const cardStyle: React.CSSProperties = {
  backgroundColor: "#f9f9ff",
  border: "1px solid #d0d0ff",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.06)",
  display: "flex",
  padding: "16px",
  gap: "16px",
};

const posterStyle: React.CSSProperties = {
  width: "120px",
  height: "180px",
  objectFit: "cover",
  borderRadius: "8px",
  border: "2px solid #b3b3ff",
};

const infoStyle: React.CSSProperties = {
  flex: 1,
};

const headingStyle: React.CSSProperties = {
  margin: "0 0 8px 0",
  color: "#333",
};

const labelStyle: React.CSSProperties = {
  fontWeight: "bold",
  color: "#4a4a9a",
};

const FantasyMovieList = () => {
  const { fantasyMovies } = useContext(MoviesContext);

  if (!fantasyMovies || fantasyMovies.length === 0) {
    return (
      <p style={{ textAlign: "center", marginTop: "40px" }}>
        No fantasy movies created yet.
      </p>
    );
  }

  return (
    <div style={containerStyle}>
      <h2
        style={{ textAlign: "center", marginBottom: "30px", color: "#2d2d85" }}
      >
        Fantasy Movie List
      </h2>
      <div style={gridStyle}>
        {fantasyMovies.map((movie: FantasyMovieProps, idx) => (
          <div key={idx} style={cardStyle}>
            {movie.poster && (
              <img src={movie.poster} alt={movie.title} style={posterStyle} />
            )}

            <div style={infoStyle}>
              <h3 style={headingStyle}>{movie.title}</h3>
              <p>
                <span style={labelStyle}>Overview:</span> {movie.overview}
              </p>
              <p>
                <span style={labelStyle}>Genres:</span>{" "}
                {movie.genres.join(", ")}
              </p>
              <p>
                <span style={labelStyle}>Release Date:</span>{" "}
                {movie.releaseDate}
              </p>
              <p>
                <span style={labelStyle}>Runtime:</span> {movie.runtime} mins
              </p>
              <p>
                <span style={labelStyle}>Production:</span>{" "}
                {movie.productionCompanies.join(", ")}
              </p>

              {movie.cast.length > 0 && (
                <div>
                  <p style={labelStyle}>Cast:</p>
                  <ul style={{ marginTop: 0, paddingLeft: "20px" }}>
                    {movie.cast.map((c, i) => (
                      <li key={i}>
                        <strong>{c.roleName}</strong>: {c.description}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FantasyMovieList;
