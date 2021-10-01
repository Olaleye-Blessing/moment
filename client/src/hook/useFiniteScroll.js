import { useEffect, useState } from "react";
import { getData } from "../reducer/fetchActions";
import { checkScroll } from "../utilities/checkScroll";
import useFetch from "./useFetch";

// pathurl consists of query params except page.
// this hooks keep note of page
const useFiniteScroll = (pathUrl, signal, currentPage, totalPage) => {
    // const [data, setData] = useState(null);
    const [page, setPage] = useState(currentPage || 1);
    // const [loading, setLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(totalPage || 1);
    // const [error, setError] = useState(false);
    const [totalData, setTotalData] = useState([]);

    // console.log(page <= totalPages);
    // let url = page <= totalPages && pathUrl && `${pathUrl}page=${page}`;
    let url = page <= totalPages && pathUrl && `${pathUrl}page=${page}`;
    // console.log({ page, totalPages });

    // console.log({ pathUrl, url });
    const handleScroll = () => {
        if (checkScroll()) setPage((page) => page + 1);
    };

    // // add scroll event on page load
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    let { status, data: fetchedData, error } = useFetch(url, signal);

    useEffect(() => {
        console.log("pathUrl has changed");
        // setTotalData([]);
        setTotalPages(totalPage || 1);
        setPage(currentPage || 1);
        if (!currentPage) {
            setTotalData([]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathUrl]);

    useEffect(() => {
        if (status !== "fetched") return;

        // console.log(fetchedData);
        // // console.log(data);
        if (!fetchedData) return;

        let { data, totalPages } = fetchedData;
        setTotalData((prev) => [...prev, ...data]);
        setTotalPages(totalPages);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchedData]);

    // console.log({ totalData });
    // =================================

    // // reset data and totalpages whenever pathUrl changes

    // useEffect(() => {
    //     setData([]);
    //     setTotalPages(1);
    //     setPage(1);
    // }, [pathUrl]);

    // // fetch data
    // useEffect(() => {
    //     setLoading(true);
    //     setError(null);

    //     // don't fetch if page is greater than total pages
    //     if (page > totalPages) {
    //         setLoading(false);
    //         setError("no more data");
    //         return;
    //     }

    //     // infinite scrolling is a get request
    //     const fetchData = async () => {
    //         console.log("fetching....");
    //         try {
    //             let response = await getData(url, signal);
    //             setLoading(false);
    //             setError(null);
    //             setData((oldData) => [...oldData, ...response.data]);
    //             setTotalPages(response.totalPages);
    //         } catch (error) {
    //             setLoading(false);
    //             setError(error.message);
    //         }
    //     };

    //     fetchData();
    //     //eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [page, pathUrl]);
    // console.log(data);

    // return { data, loading, error };
    // console.log(totalData);
    return { totalData, status, error, page, totalPages };
};

export default useFiniteScroll;
