import React from "react"; // biblioteca principal
import { Switch, Route, Link } from "react-router-dom"; // roteamento
import "bootstrap/dist/css/bootstrap.min.css"; // importa bootstrap como estilo
import "./App.css"; // importa estilo do projeto
import "@fortawesome/fontawesome-free/css/all.css"; // importa FA
import "@fortawesome/fontawesome-free/js/all.js"; // importa FA

// Componentes
import Home from "./componentes/gerenciamento/Home";

import ListaDeLivros from "./componentes/livros/ListaDeLivros";
import EditarLivro from "./componentes/livros/EditarLivro";
import CriarLivro from "./componentes/livros/CriarLivro";

import ListaDeBibliotecas from "./componentes/bibliotecas/ListaDeBibliotecas";
import EditarBiblioteca from "./componentes/bibliotecas/EditarBiblioteca";
import CriarBiblioteca from "./componentes/bibliotecas/CriarBiblioteca";

import VincularLivroEBiblioteca from "./componentes/gerenciamento/VincularLivroEBiblioteca";
import ListaLivrosVinculados from "./componentes/gerenciamento/ListaLivrosVinculados";
import Consultar from "./componentes/gerenciamento/Consultar";

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-light bg-light">
        <a href="/" className="navbar-brand">
          Sistema Biblioteca
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/livros"} className="nav-link">
              Livros
            </Link>
          </li>

          <li className="nav-item">
            <Link to={"/bibliotecas"} className="nav-link">
              Bibliotecas
            </Link>
          </li>

          <li className="nav-item">
            <Link
              to={"/bibliotecas/adicionarLivroNaBiblioteca"}
              className="nav-link"
            >
              Vincular
            </Link>
          </li>

          <li className="nav-item">
            <Link to={"/bibliotecas/buscarLivroPorTitulo"} className="nav-link">
              Consultar
            </Link>
          </li>
        </div>
      </nav>

      <div className="container-fluid mt-3">
        <Switch>
          <Route exact path="/livros" component={ListaDeLivros} />
          <Route path="/livro/:id" component={EditarLivro} />
          <Route path="/livro" component={CriarLivro} />
          <Route exact path="/bibliotecas" component={ListaDeBibliotecas} />
          <Route path="/biblioteca/:id" component={EditarBiblioteca} />
          <Route path="/biblioteca" component={CriarBiblioteca} />
          <Route
            path="/bibliotecas/adicionarLivroNaBiblioteca"
            component={VincularLivroEBiblioteca}
          />
          <Route
            path="/bibliotecas/listarLivrosDaBiblioteca/:bibliotecaId"
            component={ListaLivrosVinculados}
          />
          <Route
            path="/bibliotecas/buscarLivroPorTitulo"
            component={Consultar}
          />
          <Route exact path="" component={Home} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
