import axios from "axios";

import constents from "../constents";

const instance = axios.create({
    baseURL: constents.ApiUrl,
});

export async function signup(data) {
    return await instance.post("/auth/signup", data)
        .then((res) => {
            return {
                statusCode: res.status,
                message: res.data.message,
                data: res.data.data
            }
        })
        .catch((err) => {
            return {
                statusCode: err.response.status,
                message: err.response.data.message
            }
        })
}

export async function signin(data) {
    return await instance.post("/auth/signin", data)
        .then((res) => {
            return {
                statusCode: res.status,
                message: res.data.message,
                data: res.data.data
            }
        })
        .catch((err) => {
            return {
                statusCode: err.response.status,
                message: err.response.data.message
            }
        })
}

export async function listFiles(page, limit, searchText, token) {
    instance.defaults.headers.common['Authorization'] = token;
    return await instance.get(`/files?page=${page}&limit=${limit}&searchText=${searchText}`)
        .then((res) => {
            return {
                statusCode: res.status,
                message: res.data.message,
                data: res.data.data,
                meta: res.data.meta
            }
        })
        .catch((err) => {
            return {
                statusCode: err.response.status,
                message: err.response.data.message
            }
        })
}


export async function getFile(id, token) {
    instance.defaults.headers.common['Authorization'] = token;
    return await instance.get(`/files/${id}`, { responseType: 'blob' })
        .then((res) => {
            return {
                statusCode: res.status,
                data: res.data
            }
        })
        .catch((err) => {
            return {
                statusCode: err.response.status,
                message: err.response.data.message
            }
        })
}

export async function uploaadFile(file, token) {
    instance.defaults.headers.common['Authorization'] = token;
    const data = new FormData()
    data.append('file', file)
    return await instance.post("/files", data)
        .then((res) => {
            return {
                statusCode: res.status,
                data: res.data
            }
        })
        .catch((err) => {
            return {
                statusCode: err.response.status,
                message: err.response.data.message
            }
        })
}