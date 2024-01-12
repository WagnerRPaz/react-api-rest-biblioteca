import React, { useState, useEffect, useMemo, useRef } from "react";
import Pagination from "@material-ui/lab/Pagination";
import api from "../../services/gerenciamento/GerenciaApi";
import { useTable } from "react-table";

const ListaDeLivros = (props) => {
  const [livrosDaBibliotecas, definirListaDeLivros] = useState([]);
  const listaDeLivrosRef = useRef();
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [pageSize, setPageSize] = useState(4);
  const pageSizes = [4, 8, 12];

  listaDeLivrosRef.current = livrosDaBibliotecas;

  const buscarVariaveisDePaginacao = (page, pageSize) => {
    let params = {};

    if (page) {
      params["page"] = page - 1;
    }

    if (pageSize) {
      params["size"] = pageSize;
    }

    return params;
  };

  const buscarLivrosNaBiblioteca = () => {
    const params = buscarVariaveisDePaginacao(page, pageSize);
    const { bibliotecaId } = props.match.params;

    api
      .buscarLivrosDaBiblioteca(bibliotecaId, params)
      .then((response) => {
        console.log(response);
        const livrosDaBiblioteca = response.data.content;
        const totalPages = response.data.totalPages;

        definirListaDeLivros(livrosDaBiblioteca);
        setCount(totalPages);

        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deletarVinculo = (rowIndex) => {
    const id = listaDeLivrosRef.current[rowIndex].id;
    const { bibliotecaId } = props.match.params;
    api
      .deletarLivroDaBiblioteca(id)
      .then((response) => {
        props.history.push(
          `/bibliotecas/listarLivrosDaBiblioteca/${bibliotecaId}`
        );

        let listaAtt = [...listaDeLivrosRef.current];
        listaAtt.splice(rowIndex, 1);

        definirListaDeLivros(listaAtt);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(buscarLivrosNaBiblioteca, [page, pageSize]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
    setPage(1);
  };

  const columns = useMemo(
    () => [
      {
        Header: "Nome da Biblioteca",
        accessor: "nomeBiblioteca",
      },
      {
        Header: "Título do Livro",
        accessor: "tituloLivro",
      },
      {
        Header: "Código ISBN",
        accessor: "codigoisbn",
      },
      {
        Header: "Ações",
        accessor: "actions",
        Cell: (props) => {
          const rowIdx = props.row.id;
          return (
            <div>
              <span onClick={() => deletarVinculo(rowIdx)}>
                <button type="button" className="btn btn-danger btn-sm">
                  Remover
                </button>
              </span>
            </div>
          );
        },
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: livrosDaBibliotecas,
    });

  return (
    <div className="list row">
      <div className="col-md-12 list">
        <table
          className="table table-striped table-bordered"
          {...getTableProps()}
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="mt-3">
          {"Itens por página: "}
          <select onChange={handlePageSizeChange} value={pageSize}>
            {pageSizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>

          <Pagination
            color="primary"
            className="my-3"
            count={count}
            page={page}
            siblingCount={1}
            boundaryCount={1}
            variant="outlined"
            onChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ListaDeLivros;
