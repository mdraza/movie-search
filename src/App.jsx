import { useEffect } from "react";
import { useState } from "react";

const KEY = "e35089e1";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const tempMovie = "Don";

  useEffect(() => {
    const fetchMovie = async () => {
      setIsLoading(true);
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`
      );
      const data = await res.json();
      setMovies(data.Search);
      setIsLoading(false);
    };
    fetchMovie();
  }, [query]);
  return (
    <div className="py-8">
      <HeadTxt />
      <Search query={query} setQuery={setQuery} />
      {isLoading ? <Loader /> : <Movies movies={movies} />}
    </div>
  );
};

function Loader() {
  return (
    <div className="flex justify-center items-center">
      <p className="text-slate-100 text-2xl mt-10">Loading...</p>
    </div>
  );
}

function HeadTxt() {
  return (
    <div className="flex justify-center">
      <p className="text-7xl font-bold text-slate-100">
        Find your favourite movie.
      </p>
    </div>
  );
}

function Search({ query, setQuery }) {
  // const [query, setQuery] = useState("");
  return (
    <div className="flex justify-center my-6 mt-12">
      <input
        className="w-[50%] h-12 px-3 rounded"
        type="search"
        placeholder="Search movie..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
}

function Movies({ movies }) {
  return (
    <div className="px-16 my-12">
      <div className="grid grid-cols-4 gap-6">
        {movies?.map((movie) => (
          <Movie key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </div>
  );
}

function Movie({ movie }) {
  return (
    <div className="bg-slate-100 rounded-md">
      <div className="">
        <img
          className="w-full rounded-t-md"
          src={movie.Poster}
          alt={movie.name}
        />
      </div>
      <div className="p-3">
        <p className="">
          Movie Name:{" "}
          <span className="text-slate-900 font-medium">{movie.Title}</span>
        </p>
        <div className="d-block">
          <p>
            <span>Release Year: </span>{" "}
            <span className="text-slate-900 font-medium">{movie.Year}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
