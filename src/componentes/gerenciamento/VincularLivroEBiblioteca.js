import React, { useState } from "react";
import api from "../../services/gerenciamento/GerenciaApi";

const CriarVinculo = (props) => {
  const initialUserState = {
    id: null,
    bibliotecaId: "",
    codigoisbn:""
  };

  const [vinculo, setVinculo] = useState(initialUserState);
  const [submitted, setSubmitted] = useState(false);

  const executarValorAlterado = event => {
    const { name, value } = event.target;
    setVinculo({ ...vinculo, [name]: value });
  };

  const salvar = () => {
    var data = {
        bibliotecaId: vinculo.bibliotecaId,
        codigoisbn: vinculo.codigoisbn
    };
    
    api.vincular(data)
      .then(response => {
        setVinculo({
          id: response.data.id,
          bibliotecaId: response.data.bibliotecaId,
          codigoisbn: response.data.codigoisbn
        });
        
        setSubmitted(true);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newVinculo = () => {
    setVinculo(initialUserState);
    setSubmitted(false);
  };

  const voltarParaLista = () => {
    props.history.push("/bibliotecas");
  };

  return (
    <div className="edit-form">
      {submitted ? (
        <div>
          <strong><p className="text-success">Vinculado com sucesso!</p></strong>
          <button className="btn btn-success" onClick={newVinculo}>
            Novo Vínculo
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="titulo">Código ISBN</label>
            <input
              type="text"
              className="form-control"
              id="codigoisbn"
              required
              value={vinculo.codigoisbn}
              onChange={executarValorAlterado}
              name="codigoisbn"
            />
          </div>

          <div className="form-group">
            <label htmlFor="titulo">Biblioteca ID</label>
            <input
              type="text"
              className="form-control"
              id="bibliotecaId"
              required
              value={vinculo.bibliotecaId}
              onChange={executarValorAlterado}
              name="bibliotecaId"
            />
          </div>

          <button onClick={salvar} className="btn btn-success">
            Vincular
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
export default CriarVinculo;