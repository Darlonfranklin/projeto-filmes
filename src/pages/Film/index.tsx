import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./film.css";
import api from "../../services/api";

const Film: React.FC = () => {
  const { id } = useParams();
  const [film, setFilm] = useState<any>("");
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadFilm() {
      await api
        .get(`/movie/${id}`, {
          params: {
            api_key: "28fc232cc001c31e8a031f419d0a14ca",
            language: "pt-BR",
          },
        })
        .then((response: any) => {
          setFilm(response.data);
          setLoading(false);
        })
        .catch(() => {
          console.log("FILME NOT FOUND!");
          navigate("/", { replace: true });
          return;
        });
    }
    loadFilm();
  }, []);

  function saveFilm() {
    const myList: any = localStorage.getItem("@primeflix");

    let filmSave = JSON.parse(myList) || [];

    const hasFilm = filmSave.some((filmSaves: any) => filmSaves.id === film.id);

    if (hasFilm) {
      toast.warning("ESSE FILME JÁ EXISTE NA SUA LISTA!");
      return;
    }

    filmSave.push(film);
    localStorage.setItem("@primeflix", JSON.stringify(filmSave));
    toast.success("SALVO COM SUCESSO!");
  }

  if (loading) {
    return (
      <div className="filme-info">
        <h1>Carregando detalhes...</h1>
      </div>
    );
  }

  return (
    <div className="filme-info">
      <h1>{film.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/original/${film.backdrop_path}`}
        alt={film.title}
      />

      <h3>Sinopse</h3>
      <span>{film.overview}</span>
      <strong>Avaliação? {film.vote_average} / 10 </strong>

      <div className="area-buttons">
        <button onClick={saveFilm}>Salvar</button>
        <button>
          <a
            target="_blank"
            rel="external"
            href={`https://youtube.com/results?search_query=${film.title} Trailer`}
          >
            Trailer
          </a>
        </button>
      </div>
    </div>
  );
};

export default Film;
