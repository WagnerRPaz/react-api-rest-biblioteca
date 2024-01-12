import React, { useState } from "react";
import api from "../../services/gerenciamento/GerenciaApi";

const Consultar = (props) => {
  const initialUserState = {
    id: null,
    nomeBiblioteca: "",
    tituloLivro: "",
    codigoisbn: "",
    resultados: [],
  };

  const [livro, setLivro] = useState(initialUserState);

  const executarValorAlterado = (event) => {
    const { name, value } = event.target;
    setLivro({ ...livro, [name]: value });
  };

  const consultar = () => {
    if (!livro.titulo) {
      console.log("Por favor, insira um título antes de consultar.");
      return;
    }

    api
      .buscarLivroPorTitulo(livro.titulo)
      .then((response) => {
        const responseData = response.data;
        setLivro({ ...livro, resultados: responseData });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="edit-form">
      <div>
        <div className="form-group">
          <label htmlFor="titulo">Título</label>
          <input
            type="text"
            className="form-control"
            id="titulo"
            required
            value={livro.titulo}
            onChange={executarValorAlterado}
            name="titulo"
          />
        </div>

        <button onClick={consultar} className="btn btn-success">
          Consultar
        </button>
        <br />
        <br />
        {livro.resultados.length > 0 && (
          <div>
            <h3>Resultados da Consulta:</h3>
            {livro.resultados.map((resultado) => (
              <div key={resultado.id}>
                <p>ID: {resultado.id}</p>
                <p>Título: {resultado.tituloLivro}</p>
                <p>Biblioteca: {resultado.nomeBiblioteca}</p>
                <p>Código ISBN: {resultado.codigoisbn}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default Consultar;
