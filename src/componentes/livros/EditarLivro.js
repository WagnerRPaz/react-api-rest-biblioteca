import React, { useState, useEffect } from "react";
import api from "../../services/livros/LivrosApi";

const EditarLivro = props => {
  const initialUserState = {
    id: null,
    titulo: "",
    codigoisbn: "",
    anopublicacao: "",
    categoria: "",
    autor: ""
  };

  const [livroSelecionado, setLivroSelecionado] = useState(initialUserState);
  const [mensagem, setMensagem] = useState("");

  const buscarPorId = id => {
    api.buscarPorId(id)
      .then(response => {
        setLivroSelecionado(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    buscarPorId(props.match.params.id);
  }, [props.match.params.id]);

  const executarValorAlterado = event => {
    const { name, value } = event.target;
    setLivroSelecionado({ ...livroSelecionado, [name]: value });
  };

  const atualizar = () => {
    api.atualizar(livroSelecionado.id, livroSelecionado)
      .then(response => {
        setMensagem("Atualizado com sucesso!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const remover = () => {
    api.remover(livroSelecionado.id)
      .then(() => {
        props.history.push("/livros");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const voltarParaLista = () => {
    props.history.push("/livros");
  };

  return (
    <div className="edit-form">
      {livroSelecionado ? (
        <div>
        <div className="form-group">
          <label htmlFor="titulo">Título</label>
          <input
            type="text"
            className="form-control"
            id="titulo"
            required
            value={livroSelecionado.titulo}
            onChange={executarValorAlterado}
            name="titulo"
          />
        </div>

        <div className="form-group">
          <label htmlFor="isbn">ISBN</label>
          <input
            type="number"
            className="form-control"
            id="isbn"
            required
            value={livroSelecionado.codigoisbn}
            onChange={executarValorAlterado}
            name="codigoisbn"
          />
        </div>

        <div className="form-group">
          <label htmlFor="anopublicacao">Ano de Publicação</label>
          <input
            type="number"
            className="form-control"
            id="anopublicacao"
            required
            value={livroSelecionado.anopublicacao}
            onChange={executarValorAlterado}
            name="anopublicacao"
          />
        </div>

        <div className="form-group">
          <label htmlFor="categoria">Categoria</label>
          <input
            type="text"
            className="form-control"
            id="categoria"
            required
            value={livroSelecionado.categoria}
            onChange={executarValorAlterado}
            name="categoria"
          />
        </div>

        <div className="form-group">
          <label htmlFor="autor">Autor</label>
          <input
            type="text"
            className="form-control"
            id="autor"
            required
            value={livroSelecionado.autor}
            onChange={executarValorAlterado}
            name="autor"
          />
        </div>


        <button onClick={atualizar} className="btn btn-success">
          Atualizar
        </button>
        &nbsp;
        <button onClick={voltarParaLista} className="btn btn-secondary">
          Voltar
        </button>
        &nbsp;
        <button onClick={remover} className="btn btn-danger">
          Remover
        </button>

        <strong><p className="text-success">{mensagem}</p></strong>

      </div>
      ) : (
        <div>
          <br />
          <p>Clique no usuário...</p>
        </div>
      )}
    </div>
  );
};

export default EditarLivro;
