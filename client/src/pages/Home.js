import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import fileDownload from 'js-file-download';
import Modal from 'react-bootstrap/Modal';
import moment from "moment";

import { getFile, listFiles, uploaadFile } from '../api/api';
import Navbar from '../components/Navbar'

function Home() {
    const history = useNavigate();
    const [files, setFiles] = useState([]);
    const [file, setFile] = useState(null);
    const [page, setPage] = useState(1);
    const [limit] = useState(10);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setFile(null)
        setShow(true)
    };

    const token = localStorage.getItem("token");
    async function isLoggedIn() {
        if (!token) {
            history("/signin");
            return
        }
        getPaginatedFiles(page, limit)
    }

    async function getPaginatedFiles(perPage, itemLimit, searchText = "") {
        const result = await listFiles(perPage, itemLimit, searchText, token)
        if (result.statusCode == 200) {
            setFiles(result.data)
        }
    }

    useEffect(() => {
        isLoggedIn();
    }, []);

    async function downloadFile(id, fileName) {
        const result = await getFile(id, token)
        fileDownload(result.data, fileName);
    }

    async function submit() {
        if (!file || (file && file.type != "application/pdf")) {
            setShow(false)
            return alert("please select pdf file")
        }
        const result = await uploaadFile(file, token)
        if (result.statusCode != 200) {
            alert(result.message)
        }
        setShow(false)
        getPaginatedFiles(page, limit)
    }

    async function next(pageNo) {
        getPaginatedFiles(pageNo, limit)
    }

    async function previous(pageNo) {
        getPaginatedFiles(pageNo, limit)
    }

    async function search(text) {
        text = text.trim()
        getPaginatedFiles(page, limit, text)
    }

    return (
        <>
            <Navbar />
            <br />
            <br />
            <br />
            <div className="container">
                <div className="row">
                    <div className="col-md-1"></div>
                    <div className="col-md-10">
                        <div className="row">
                            <div className="col-md-4">
                                <input type="text" onChange={(e) => search(e.target.value)} />
                            </div>
                            <div className="col-md-4"></div>
                            <div className="col-md-4">
                                <button style={{ "float": "right" }} className='btn btn-primary' onClick={() => handleShow()}>New</button>
                            </div>
                        </div>
                        <table className="table">
                            <thead className="tableRowHeader">
                                <tr>
                                    <th className="tableHeader">Name</th>
                                    <th className="tableHeader">Upload At</th>
                                    <th className="tableHeader">Upload By</th>
                                    <th className="tableHeader">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {files.map((el) => (
                                    <tr className="tableRowItems" key={el._id}>
                                        <td className="tableCell">{el.name}</td>
                                        <td className="tableCell">{moment(el.updatedAt).format("DD-MM-YYYY")}</td>
                                        <td className="tableCell">{el.uploadedBy.name}</td>
                                        <td className="tableCell">
                                            <button
                                                style={{ "textDecoration": "none", "color": "black" }}
                                                onClick={() => {
                                                    downloadFile(el._id, el.name)
                                                }}
                                                className="btn"
                                            ><svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                fill="currentColor"
                                                className="bi bi-download"
                                                viewBox="0 0 16 16"
                                            >
                                                    <path
                                                        d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"
                                                    />
                                                    <path
                                                        d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"
                                                    />
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="container">
                            <div className="row" style={{ flexWrap: "unset" }}>
                                <div className="col-md-6" style={{ fontSize: "1em" }}>
                                    <span onClick={() => previous(page - 1)}> &lt; Previous </span>
                                </div>
                                <div className="col-md-6 text-right" style={{ fontSize: "1em" }}>
                                    <span style={{ float: "right" }} onClick={() => next(page + 1)}>
                                        Next &gt;
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-1"></div>
                </div>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header>
                        <Modal.Title>Upload File</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="input-group">
                            <input type="file" className="hidden-xs-up" name="file"
                                onChange={(e) => setFile(e.target.files[0])}
                                accept=".pdf"
                            />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-secondary" onClick={handleClose}>
                            Close
                        </button>
                        <button className="btn btn-primary" onClick={submit}>
                            Upload
                        </button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    )
}

export default Home