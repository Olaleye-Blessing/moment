import { useEffect, useState } from "react";

const useFetch = (url) => {
    let abortFetch = new AbortController();
    let signal = abortFetch.signal;

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const fetchData = async () => {
        setLoading(true);
        try {
            let req = await fetch(url, { signal });
            let data = await req.json();
            if (!(req.status >= 200 && req.status <= 299)) throw data;
            setData(data);
            setLoading(false);
            setError(false);
        } catch (error) {
            if (error.name !== "AbortError") {
                setError("there was an error");
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        fetchData();
        return () => abortFetch.abort();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url]);

    return { loading, error, data };
};

export default useFetch;
