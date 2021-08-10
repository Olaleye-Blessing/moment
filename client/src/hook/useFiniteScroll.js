import { useEffect, useState } from "react";
import { getData } from "../reducer/fetchActions";
import { checkScroll } from "../utilities/checkScroll";

// pathurl consists of query params except page.
// this hooks keep note of page
const useFiniteScroll = (pathUrl, signal) => {
    const [data, setData] = useState(null);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(1);
    const [error, setError] = useState(false);

    let url = `${pathUrl}page=${page}`;

    const handleScroll = () => {
        if (checkScroll()) setPage((page) => page + 1);
    };

    // add scroll event on page load
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // reset data and totalpages whenever pathUrl changes
    useEffect(() => {
        setData([]);
        setTotalPages(1);
        setPage(1);
    }, [pathUrl]);

    // fetch data
    useEffect(() => {
        setLoading(true);
        setError(null);

        // don't fetch if page is greater than total pages
        if (page > totalPages) {
            setLoading(false);
            setError("no more data");
            return;
        }

        // infinite scrolling is a get request
        const fetchData = async () => {
            try {
                let response = await getData(url, signal);
                setLoading(false);
                setError(null);
                setData((oldData) => [...oldData, ...response.data]);
                setTotalPages(response.totalPages);
            } catch (error) {
                setLoading(false);
                setError(error.message);
            }
        };

        fetchData();
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, pathUrl]);

    return { data, loading, error };
};

export default useFiniteScroll;
