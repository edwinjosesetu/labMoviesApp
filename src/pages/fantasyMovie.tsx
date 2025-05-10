import React, { useContext, useState } from "react";
import { MoviesContext } from "../contexts/moviesContext";
import { FantasyMovieCast, FantasyMovieProps } from "../types/interfaces";

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "8px",
  margin: "6px 0",
  borderRadius: "4px",
  border: "1px solid #ccc",
};

const labelStyle: React.CSSProperties = {
  fontWeight: "bold",
  marginTop: "12px",
  display: "block",
};

const sectionStyle: React.CSSProperties = {
  marginBottom: "20px",
  padding: "16px",
  border: "1px solid #eee",
  borderRadius: "6px",
};

const buttonStyle: React.CSSProperties = {
  padding: "10px 16px",
  borderRadius: "4px",
  backgroundColor: "#007bff",
  color: "#fff",
  border: "none",
  cursor: "pointer",
  marginTop: "10px",
};

const FantasyMovie = () => {
  const { addFantasyMovie } = useContext(MoviesContext);

  const [title, setTitle] = useState("");
  const [overview, setOverview] = useState("");
  const [genres, setGenres] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [runtime, setRuntime] = useState(0);
  const [productionCompanies, setProductionCompanies] = useState("");

  const [poster, setPoster] = useState<string>("");
  const [cast, setCast] = useState<FantasyMovieCast[]>([]);
  const [roleName, setRoleName] = useState("");
  const [description, setDescription] = useState("");

  const handlePosterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPoster(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const addCastMember = () => {
    if (roleName && description) {
      setCast([...cast, { roleName, description }]);
      setRoleName("");
      setDescription("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newMovie: FantasyMovieProps = {
      id: 0,
      title,
      overview,
      genres: genres.split(",").map((g) => g.trim()),
      releaseDate,
      runtime,
      productionCompanies: productionCompanies.split(",").map((c) => c.trim()),
      poster,
      cast,
    };
    addFantasyMovie(newMovie);

    setTitle("");
    setOverview("");
    setGenres("");
    setReleaseDate("");
    setRuntime(0);
    setProductionCompanies("");
    setPoster("");
    setCast([]);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ maxWidth: "600px", margin: "0 auto" }}
    >
      <h2>Create Your Fantasy Movie</h2>

      <div style={sectionStyle}>
        <label style={labelStyle}>Title</label>
        <input
          style={inputStyle}
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label style={labelStyle}>Overview</label>
        <textarea
          style={{ ...inputStyle, height: "80px" }}
          value={overview}
          onChange={(e) => setOverview(e.target.value)}
          required
        />

        <label style={labelStyle}>Genres (comma separated)</label>
        <input
          style={inputStyle}
          type="text"
          value={genres}
          onChange={(e) => setGenres(e.target.value)}
          required
        />

        <label style={labelStyle}>Release Date</label>
        <input
          style={inputStyle}
          type="date"
          value={releaseDate}
          onChange={(e) => setReleaseDate(e.target.value)}
          required
        />

        <label style={labelStyle}>Runtime (minutes)</label>
        <input
          style={inputStyle}
          type="number"
          value={runtime}
          onChange={(e) => setRuntime(Number(e.target.value))}
          required
        />

        <label style={labelStyle}>Production Companies (comma separated)</label>
        <input
          style={inputStyle}
          type="text"
          value={productionCompanies}
          onChange={(e) => setProductionCompanies(e.target.value)}
          required
        />

        <label style={labelStyle}>Poster</label>
        <input
          style={{ margin: "6px 0" }}
          type="file"
          accept="image/*"
          onChange={handlePosterChange}
        />
        {poster && (
          <img
            src={poster}
            alt="Poster"
            style={{ width: "100px", marginTop: "10px" }}
          />
        )}
      </div>

      <div style={sectionStyle}>
        <h3>Add Cast Member</h3>

        <label style={labelStyle}>Role Name</label>
        <input
          style={inputStyle}
          type="text"
          value={roleName}
          onChange={(e) => setRoleName(e.target.value)}
        />

        <label style={labelStyle}>Description</label>
        <input
          style={inputStyle}
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button
          type="button"
          style={{ ...buttonStyle, backgroundColor: "#28a745" }}
          onClick={addCastMember}
        >
          Add Cast
        </button>

        {cast.length > 0 && (
          <ul style={{ marginTop: "12px", paddingLeft: "20px" }}>
            {cast.map((c, index) => (
              <li key={index}>
                <strong>{c.roleName}</strong>: {c.description}
              </li>
            ))}
          </ul>
        )}
      </div>

      <button type="submit" style={buttonStyle}>
        Save Fantasy Movie
      </button>
    </form>
  );
};

export default FantasyMovie;
