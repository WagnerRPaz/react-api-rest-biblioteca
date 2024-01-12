import React, { useState } from "react";
import api from "../../services/livros/LivrosApi";

const CriarLivro = (props) => {
  const initialUserState = {
    id: null,
    titulo: "",
    codigoisbn: "",
    anopublicacao: null,
    categoria: "",
    autor: ""
  };

  const [livro, setLivro] = useState(initialUserState);
  const [submitted, setSubmitted] = useState(false);

  const executarValorAlterado = event => {
    const { name, value } = event.target;
    setLivro({ ...livro, [name]: value });
  };

  const salvar = () => {
    var data = {
      titulo: livro.titulo,
      codigoisbn: livro.codigoisbn,
      anopublicacao: livro.anopublicacao,
      categoria: livro.categoria,
      autor: livro.autor
    };
    
    api.criar(data)
      .then(response => {
        setLivro({
          id: response.data.id,
          titulo: response.data.titulo,
          codigoisbn: response.data.codigoisbn,
          anopublicacao: response.data.anopublicacao,
          categoria: response.data.categoria,
          autor: response.data.autor
        });
        
        setSubmitted(true);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newUser = () => {
    setLivro(initialUserState);
    setSubmitted(false);
  };

  const voltarParaLista = () => {
    props.history.push("/livros");
  };

  return (
    <div className="edit-form">
      {submitted ? (
        <div>
          <strong><p class="text-success">Criado com sucesso!</p></strong>
          <button className="btn btn-success" onClick={newUser}>
            Novo
          </button>
        </div>
      ) : (
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

          <div className="form-group">
            <label htmlFor="isbn">ISBN</label>
            <input
              type="text"
              className="form-control"
              id="isbn"
              required
              value={livro.codigoisbn}
              onChange={executarValorAlterado}
              name="codigoisbn"
            />
          </div>

          <div className="form-group">
            <label htmlFor="anopublicacao">Ano de Publicação</label>
            <input
              type="text"
              className="form-control"
              id="anopublicacao"
              required
              value={livro.anoPublicacao}
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
              value={livro.categoria}
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
              value={livro.autor}
              onChange={executarValorAlterado}
              name="autor"
            />
          </div>


          <button onClick={salvar} className="btn btn-success">
            Criar
          </button>
          &nbsp;
          <button onClick={voltarParaLista} className="btn btn-secondary">
            Voltar
          </button>

        </div>
      )}
    </div>
  );
};

export default CriarLivro;