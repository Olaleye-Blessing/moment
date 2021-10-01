/* eslint-disable default-case */
/* eslint-disable no-throw-literal */

import toast from "react-hot-toast";

let headers = new Headers();
headers.set("Content-type", "application/json;charset=utf-8");

export const fetchData = async (
    url,
    method = "GET",
    signal = undefined,
    body = undefined
) => {
    let options = {
        method,
        headers,
        signal,
        body: JSON.stringify(body),
        credentials: "include",
    };

    try {
        let req = await fetch(`${url}`, options);
        let res = await req.json();
        if (!(req.status >= 200 && req.status <= 299)) throw res;

        return res;
    } catch (error) {
        if (error.name !== "AbortError") {
            if (error.type === "fail")
                error.message = `Please check your internt connection. Come back later if error persist!`;
            let message = error.message;
            toast.error(message);
            throw error;
        }
    }
};

export const getData = async (url, signal) =>
    await fetchData(url, "GET", signal);

export const createData = async (url, data) =>
    await fetchData(url, "POST", undefined, data);

export const updateData = async (url, data) =>
    await fetchData(url, "PATCH", undefined, data);

export const deleteData = async (url) => await fetchData(url, "DELETE");
