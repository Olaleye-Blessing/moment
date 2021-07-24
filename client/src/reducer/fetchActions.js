/* eslint-disable no-throw-literal */

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
        // let req = await fetch(`${baseUrl}${url}`, options);
        let req = await fetch(`${url}`, options);
        let res = await req.json();
        if (!(req.status >= 200 && req.status <= 299)) throw res;
        return res;
    } catch (error) {
        // console.log(error);
        // console.info({ name: error.name });
        if (error.name !== "AbortError") {
            let message = {
                show: true,
                type: "invalid",
                msg: `${error.message}.`,
            };
            if (error.type === "fail")
                message.msg = `Please check your internt connection. Come back later if error persist!`;
            throw message;
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
