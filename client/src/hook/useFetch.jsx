import { useEffect, useRef, useReducer } from "react";
import { getData } from "../reducer/fetchActions";

const useFetch = (url, signal) => {
    // cache urls to avoid unncessary fetching
    const cache = useRef({});

    const initialState = {
        status: "idle",
        error: null,
        data: [],
    };

    const [state, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case "FETCHING":
                return { ...initialState, status: "fetching" };
            case "FETCHED":
                return {
                    ...initialState,
                    data: action.payload,
                    status: "fetched",
                };
            case "FETCH_ERROR":
                return {
                    ...initialState,
                    status: "error",
                    error: action.payload,
                };
            default:
                return state;
        }
    }, initialState);

    useEffect(() => {
        if (!url) return;

        // let abortFetch = new AbortController();
        // let signal = abortFetch.signal;

        const fetchingData = async () => {
            dispatch({ type: "FETCHING" });
            let data;
            try {
                if (cache.current[url]) {
                    data = cache.current[url];
                } else {
                    data = await getData(url, signal);
                    cache.current[url] = data;
                }

                dispatch({ type: "FETCHED", payload: data });
            } catch (error) {
                if (error.name === "AbortError") return;

                dispatch({ type: "FETCH_ERROR", payload: error.message });
            }
        };

        fetchingData();

        // return () => abortFetch.abort();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url]);

    return state;
};

export default useFetch;
