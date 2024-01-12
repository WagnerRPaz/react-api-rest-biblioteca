import http from "../../http-common";

const buscarPorId = (id) => {
  return http.get(`/bibliotecas/${id}`);
};

const criar = (data) => {
  return http.post("/bibliotecas", data);
};

const atualizar = (id, data) => {
  return http.put(`/bibliotecas/${id}`, data);
};

const remover = (id) => {
  return http.delete(`/bibliotecas/${id}`);
};

const buscarTodos = (params) => {
  return http.get("/bibliotecas", { params });
};

const BibliotecasApi = {
  buscarTodos,
  buscarPorId,
  criar,
  atualizar,
  remover
};

export default BibliotecasApi;