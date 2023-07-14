import { Fragment, useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";
import "./home.css";

const Home: React.FC = () => {
  const [film, setFilm] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadFilm = async () => {
      const response = await api.get("movie/now_playing", {
        params: {
          api_key: "28fc232cc001c31e8a031f419d0a14ca",
          language: "pt-BR",
          page: 1,
        },
      });

      setFilm(response.data.results.slice(0, 10));
      setLoading(false);
    };
    loadFilm();
  }, []);

  if (loading) {
    <div className="loading">
      <h1>Carregando filmes...</h1>
    </div>;
  }

  return (
    <Fragment>
      <div className="container">
        <div className="lista-filmes">
          {film &&
            film.map((film: any) => {
              return (
                <article key={film.id}>
                  <strong>{film.title}</strong>
                  <img
                    src={`https://image.tmdb.org/t/p/original/${film.poster_path}`}
                    alt={film.title}
                  />
                  <Link to={`/film/${film.id}`}>Acessar</Link>
                </article>
              );
            })}
        </div>
      </div>
    </Fragment>
  );
};

export default Home;
