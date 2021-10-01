import { useEffect, useState } from "react";
import { checkScroll } from "../utilities/checkScroll";
import useFetch from "./useFetch";

// pathurl consists of query params except page.
// this hooks keep note of page
const useFiniteScroll = (pathUrl, signal, currentPage, totalPage) => {
    const [page, setPage] = useState(currentPage || 1);
    const [totalPages, setTotalPages] = useState(totalPage || 1);
    const [totalData, setTotalData] = useState([]);

    let url = page <= totalPages && pathUrl && `${pathUrl}page=${page}`;

    const handleScroll = () => {
        if (checkScroll()) setPage((page) => page + 1);
    };

    // add scroll event on page load
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    let { status, data: fetchedData, error } = useFetch(url, signal);

    useEffect(() => {
        setTotalPages(totalPage || 1);
        setPage(currentPage || 1);
        if (!currentPage) {
            setTotalData([]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathUrl]);

    useEffect(() => {
        if (status !== "fetched") return;

        if (!fetchedData) return;

        let { data, totalPages } = fetchedData;
        setTotalData((prev) => [...prev, ...data]);
        setTotalPages(totalPages);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchedData]);

    return { totalData, status, error, page, totalPages };
};

export default useFiniteScroll;
