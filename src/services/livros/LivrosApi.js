import http from "../../http-common";

const buscarPorId = (id) => {
  return http.get(`/livros/${id}`);
};

const criar = (data) => {
  return http.post("/livros", data);
};

const atualizar = (id, data) => {
  return http.put(`/livros/${id}`, data);
};

const remover = (id) => {
  return http.delete(`/livros/${id}`);
};

const buscarTodos = (params) => {
  return http.get("/livros", { params });
};

const LivrosApi = {
  buscarTodos,
  buscarPorId,
  criar,
  atualizar,
  remover
};

export default LivrosApi;