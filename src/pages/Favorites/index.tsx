import { useEffect, useState } from "react";
import "./favorites.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Favorites: React.FC = () => {
  const [film, setFilm] = useState<any>();

  useEffect(() => {
    const myList: any = localStorage.getItem("@primeflix");
    setFilm(JSON.parse(myList) || []);
  }, []);

  function excluirFilme(id: any) {
    let filtroFilmes = film.filter((item: any) => {
      return item.id !== id;
    });

    setFilm(filtroFilmes);
    localStorage.setItem("@primeflix", JSON.stringify(filtroFilmes));
    toast.success("FILME REMOVIDO COM SUCESSO!");
  }

  return (
    <div className="my-film">
      <h1>Meus filmes!</h1>
      {film && film.length === 0 && (
        <span>Você não possui nenhum filme salvo :( </span>
      )}
      <ul>
        {film &&
          film.map((films: any) => {
            return (
              <li key={films.id}>
                <span>{films.title}</span>
                <div>
                  <Link to={`/film/${films.id}`}>Ver detalhes</Link>
                  <button onClick={() => excluirFilme(films.id)}>
                    Excluir
                  </button>
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default Favorites;
