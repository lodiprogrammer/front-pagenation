import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPaginate from "react-paginate";
import LB from "../config/linkBack-end.js"

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(7);
    const [pages, setPages] = useState(0);
    const [rows, setRows] = useState(0);
    const [keyword, setKeyword] = useState("");
    const [query, setQuery] = useState("");
    const [msg, setMsg] = useState("");
    const alamat = LB;
    useEffect(() => {
        getUsers();
    }, [page, keyword]
    );

    const getUsers = async () => {
        const response = await axios.get(
            `${alamat}/users?search_query=${keyword}&page=${page}&limit=${limit}`
            // `http://localhost:5000/users?search_query=${keyword}&page=${page}&limit=${limit}`
        );
        setUsers(response.data.result);
        setPage(response.data.page);
        setPages(response.data.totalPage);
        setRows(response.data.totalRows);

    };

    const changePage = ({ selected }) => {
        setPage(selected);
        if (selected === 9) {
            setMsg(
                "Jika tidak menemukan data yang Anda cari, silahkan cari data dengan kata kunci spesifik!"
            );
        } else {
            setMsg("");
        }
    };

    const searchData = (e) => {
        e.preventDefault();
        setPage(0);
        setMsg("");
        setKeyword(query);
    };

    const resetData = (e) => {
        e.preventDefault();
        setPage(0);
        setMsg("");
        setKeyword("");
        setQuery("");
    };


    return (
        <div className="container mt-2 ">
            <div className="d-flex flex-column justify-content-center">
                <div class="container">
                    <div className="row mb-2">
                        <div className="col-10">
                            <form onSubmit={searchData}>
                                <div class="input-group">

                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Pencarian"

                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                    />
                                    <button class="btn btn-success" type="submit" id="button-addon2">
                                        Cari
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className="col-2">
                            <form onSubmit={resetData}>

                                <button class="btn btn-outline-success form-control" type="submit" id="button-addon2">
                                    RESET SEARCH
                                </button>

                            </form>
                        </div>
                    </div>


                    <table class="table table-seccondary table-hover">
                        <thead className="table-success">
                            <tr>

                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Gender</th>
                                <th className="text-center">ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.gender}</td>
                                    <td>
                                        <div class="d-grid gap-2 d-md-flex justify-content-md-center">
                                            <button
                                                className="btn btn-success me-md-2"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="btn btn-outline-success"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}


                        </tbody>
                    </table>
                    <div className="row">
                        <div className="col-4">
                            <p>Total Rows : {rows} Page : {rows ? page + 1 : 0} of {pages}</p>
                        </div>
                        <div className="col-8 ">
                            <p className="text-danger">{msg}</p>
                        </div>
                    </div>

                    <nav

                        key={rows}
                    >
                        <ReactPaginate
                            previousLabel={"< Prev"}
                            nextLabel={"Next >"}
                            pageCount={Math.min(10, pages)}
                            onPageChange={changePage}

                            containerClassName={"pagination justify-content-center"}
                            pageLinkClassName={"page-link"}
                            previousLinkClassName={"page-link"}
                            nextLinkClassName={"page-link"}
                            activeLinkClassName={"page-item active"}
                            disabledLinkClassName={"page-item disabled"}

                        />
                    </nav>
                </div>
            </div>
        </div>

    )
}

export default UserList
