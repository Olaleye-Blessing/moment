/* eslint-disable no-lone-blocks */
import { useEffect, useState } from "react";
import { useMomentContext } from "../context/MomentsContext";
import { actions } from "../reducer/actions";
// import HomeAsideMain from "../components/HomeAside/HomeAsideMain";
import { getData } from "../reducer/fetchActions";
import HomeAsideOthers from "../components/HomeAside/HomeAsideOthers";
import MainContent from "../components/HomePage/MainContent";

const Homepage = () => {
    let { state, dispatch } = useMomentContext();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    let { moments } = state;
    useEffect(() => {
        let abort = new AbortController();
        let signal = abort.signal;
        setLoading(true);
        setError(null);

        const fetchAllPosts = async () => {
            try {
                let response = await getData(`/moments`, signal);
                console.log(response);
                dispatch({
                    type: actions.FETCH_ALL,
                    // payload: response.moments,
                    payload: response.data,
                    // payload: response,
                });
                setLoading(false);
                setError(null);
            } catch (error) {
                // dispatch({ type: actions.ERROR, payload: error });
                console.log(error);
            }
        };

        fetchAllPosts();

        return () => abort.abort();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <MainContent moments={moments} loading={loading} error={error} />

            <aside className="hidden sm:min-w-sm sm:max-w-xs lg:ml-auto lg:block">
                <HomeAsideOthers />
            </aside>
        </>
    );
};

export default Homepage;
