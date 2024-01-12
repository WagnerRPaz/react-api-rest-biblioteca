import React, { useState, useEffect } from "react";
import api from "../../services/bibliotecas/BibliotecasApi";

const EditarBiblioteca = props => {
  const initialUserState = {
    id: null,
    nome: ""
  };

  const [bibliotecaSelecionada, setBibliotecaSelecionada] = useState(initialUserState);
  const [mensagem, setMensagem] = useState("");

  const buscarPorId = id => {
    api.buscarPorId(id)
      .then(response => {
        setBibliotecaSelecionada(response.data);
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
    setBibliotecaSelecionada({ ...bibliotecaSelecionada, [name]: value });
  };

  const atualizar = () => {
    api.atualizar(bibliotecaSelecionada.id, bibliotecaSelecionada)
      .then(response => {
        setMensagem("Atualizado com sucesso!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const remover = () => {
    api.remover(bibliotecaSelecionada.id)
      .then(() => {
        props.history.push("/bibliotecas");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const voltarParaLista = () => {
    props.history.push("/bibliotecas");
  };

  return (
    <div className="edit-form">
      {bibliotecaSelecionada ? (
        <div>
        <div className="form-group">
          <label htmlFor="titulo">Nome</label>
          <input
            type="text"
            className="form-control"
            id="nome"
            required
            value={bibliotecaSelecionada.nome}
            onChange={executarValorAlterado}
            name="nome"
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

        <strong><p class="text-success">{mensagem}</p></strong>

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

export default EditarBiblioteca;