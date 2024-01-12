import React, { useState } from "react";
import api from "../../services/bibliotecas/BibliotecasApi";

const CriarBiblioteca = (props) => {
  const initialUserState = {
    id: null,
    nome: ""
  };

  const [biblioteca, setBiblioteca] = useState(initialUserState);
  const [submitted, setSubmitted] = useState(false);

  const executarValorAlterado = event => {
    const { name, value } = event.target;
    setBiblioteca({ ...biblioteca, [name]: value });
  };

  const salvar = () => {
    var data = {
      nome: biblioteca.nome
    };
    
    api.criar(data)
      .then(response => {
        setBiblioteca({
          id: response.data.id,
          nome: response.data.nome
        });
        
        setSubmitted(true);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newUser = () => {
    setBiblioteca(initialUserState);
    setSubmitted(false);
  };

  const voltarParaLista = () => {
    props.history.push("/bibliotecas");
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
            <label htmlFor="titulo">Nome</label>
            <input
              type="text"
              className="form-control"
              id="nome"
              required
              value={biblioteca.nome}
              onChange={executarValorAlterado}
              name="nome"
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

export default CriarBiblioteca;