import http from "../../http-common";

const vincular = (data) => {
  return http.post("/bibliotecas/adicionarLivroNaBiblioteca", data);
};

const buscarLivrosDaBiblioteca = (bibliotecaId, params) => {
  return http.get(`/bibliotecas/listarLivrosDaBiblioteca/${bibliotecaId}`, {
    params,
  });
};

const deletarLivroDaBiblioteca = (id, params) => {
  return http.delete(`/bibliotecas/deletarLivroDaBiblioteca/${id}`, { params });
};

const buscarLivroPorTitulo = (titulo) => {
  return http.get("/bibliotecas/buscarLivroPorTitulo?titulo=" + titulo);
};

const GerenciaApi = {
  vincular,
  buscarLivrosDaBiblioteca,
  deletarLivroDaBiblioteca,
  buscarLivroPorTitulo,
};
export default GerenciaApi;
