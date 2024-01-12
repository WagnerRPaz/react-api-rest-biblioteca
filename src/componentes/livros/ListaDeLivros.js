import React, { useState, useEffect, useMemo, useRef } from "react";
import Pagination from "@material-ui/lab/Pagination";
import api from "../../services/livros/LivrosApi";
import { useTable } from "react-table";

const ListaDeLivros = (props) => {
  
  const [livros, setLivros] = useState([]);
  const livrosRef = useRef();
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [pageSize, setPageSize] = useState(4);
  const pageSizes = [4, 8, 12];

  livrosRef.current = livros;

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

  const buscarLivros = () => {
    const params = buscarVariaveisDePaginacao(page, pageSize);

    api.buscarTodos(params)
      .then((response) => {
        const livros = response.data.content;
        const totalPages = response.data.totalPages;
        setLivros(livros);
        setCount(totalPages);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(buscarLivros, [page, pageSize]);

  const verLivro = (rowIndex) => {
    const id = livrosRef.current[rowIndex].id;

    props.history.push("/livro/" + id);
  };

  const irParaNovo = () => {
    props.history.push("/livro");
  };

  const remover = (rowIndex) => {
    const id = livrosRef.current[rowIndex].id;

    api.remover(id)
      .then((response) => {
        props.history.push("/livros");

        let novosLivros = [...livrosRef.current];
        novosLivros.splice(rowIndex, 1);

        setLivros(novosLivros);
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
        Header: "ISBN",
        accessor: "codigoisbn",
      },
      {
        Header: "Titulo",
        accessor: "titulo",
      },
      {
        Header: "Ano de Publicação",
        accessor: "anopublicacao",
      },
      {
        Header: "Categoria",
        accessor: "categoria",
      },
      {
        Header: "Autor",
        accessor: "autor",
      },
      {
        Header: "Ações",
        accessor: "actions",
        Cell: (props) => {
          const rowIdx = props.row.id;
          return (
            <div>
              <span onClick={() => verLivro(rowIdx)}>
                <button type="button" className="btn btn-warning btn-sm">Editar</button>
              </span>
              &nbsp;
              <span onClick={() => remover(rowIdx)}>
                <button type="button" className="btn btn-danger btn-sm">Remover</button>
              </span>
            </div>
          );
        },
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data: livros,
  });

  return (
    <div className="list row">
      <div className="col-md-12 list">
        <div className="row margin-header" >
          <div className="col-md-6 text-right">
              <span onClick={() => irParaNovo()}>
                <button type="button" className="btn btn-success btn-sm btn-novo">Criar Livro</button>
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

export default ListaDeLivros;