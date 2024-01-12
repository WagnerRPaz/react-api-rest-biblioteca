import React, { useState, useEffect, useMemo, useRef } from "react";
import Pagination from "@material-ui/lab/Pagination";
import api from "../../services/bibliotecas/BibliotecasApi";
import { useTable } from "react-table";

const ListaDeBibliotecas = (props) => {
  const [bibliotecas, setBibliotecas] = useState([]);
  const bibliotecasRef = useRef();
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [pageSize, setPageSize] = useState(4);
  const pageSizes = [4, 8, 12];

  bibliotecasRef.current = bibliotecas;

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

  const buscarBibliotecas = () => {
    const params = buscarVariaveisDePaginacao(page, pageSize);

    api
      .buscarTodos(params)
      .then((response) => {
        const bibliotecas = response.data.content;
        const totalPages = response.data.totalPages;
        setBibliotecas(bibliotecas);
        setCount(totalPages);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(buscarBibliotecas, [page, pageSize]);

  const verBiblioteca = (rowIndex) => {
    const id = bibliotecasRef.current[rowIndex].id;

    props.history.push("/biblioteca/" + id);
  };

  const listaDeLivros = (rowIndex) => {
    const id = bibliotecasRef.current[rowIndex].id;

    props.history.push(`/bibliotecas/listarLivrosDaBiblioteca/${id}`);
  };

  const irParaNovo = () => {
    props.history.push("/biblioteca");
  };

  const remover = (rowIndex) => {
    const id = bibliotecasRef.current[rowIndex].id;

    api
      .remover(id)
      .then((response) => {
        props.history.push("/bibliotecas");

        let novasBibliotecas = [...bibliotecasRef.current];
        novasBibliotecas.splice(rowIndex, 1);

        setBibliotecas(novasBibliotecas);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const mudarPagina = (event, value) => {
    setPage(value);
  };

  const mudarTotalPorPagina = (event) => {
    setPageSize(event.target.value);
    setPage(1);
  };

  const columns = useMemo(
    () => [
      {
        Header: "Nome",
        accessor: "nome",
      },
      {
        Header: "Ações",
        accessor: "actions",
        Cell: (props) => {
          const rowIdx = props.row.id;
          return (
            <div>
              <span onClick={() => verBiblioteca(rowIdx)}>
                <button type="button" className="btn btn-warning btn-sm">
                  Editar
                </button>
              </span>
              &nbsp;
              <span onClick={() => remover(rowIdx)}>
                <button type="button" className="btn btn-danger btn-sm">
                  Remover
                </button>
              </span>
              &nbsp;
              <span onClick={() => listaDeLivros(rowIdx)}>
                <button type="button" className="btn btn-info btn-sm">
                  Lista De Livros
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
      data: bibliotecas,
    });

  return (
    <div className="list row">
      <div className="col-md-12 list">
        <div className="row margin-header">
          <div className="col-md-6 text-right">
            <span onClick={() => irParaNovo()}>
              <button type="button" className="btn btn-success btn-sm btn-novo">
                Criar Biblioteca
              </button>
            </span>
          </div>
        </div>

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
          <select onChange={mudarTotalPorPagina} value={pageSize}>
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
            onChange={mudarPagina}
          />
        </div>
      </div>
    </div>
  );
};

export default ListaDeBibliotecas;
