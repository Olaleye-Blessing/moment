/* eslint-disable no-lone-blocks */
import { useEffect, useState } from "react";
import { useMomentContext } from "../context/MomentsContext";
import { actions } from "../reducer/actions";
import HomeAsideMain from "../components/HomeAside/HomeAsideMain";
import { getData } from "../reducer/fetchActions";
import HomeAsideOthers from "../components/HomeAside/HomeAsideOthers";
import MainContent from "../components/HomePage/MainContent";

const Homepage = () => {
    let { state, dispatch, asideProfRef } = useMomentContext();

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
                dispatch({
                    type: actions.FETCH_ALL,
                    payload: response.moments,
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

    console.log("home page rendered");
    return (
        <>
            <MainContent moments={moments} loading={loading} error={error} />

            <aside className=" bg-blue-primary hidden sm:min-w-sm sm:max-w-xs lg:ml-auto lg:block">
                <HomeAsideMain />
                {/* <HomeAsideOthers /> */}
            </aside>
        </>
    );
};

{
    /* <div
            data-page="homepage"
            className="relative px-3 py-5 md:px-8 lg:px-16 xl:px-32 sm:flex sm:items-start sm:justify-start sm:gap-5"
        >
            <aside
                className="absolute -top-1 bg-black transition-transform right-full px-3 py-4 z-20 max-w-md sm:bg-transparent sm:static sm:pt-0 sm:min-w-sm sm:max-w-xs sm:px-0 md:mr-auto"
                ref={asideProfRef}
            >
                <HomeAsideMain />
            </aside>

            <MainContent moments={moments} loading={loading} error={error} />

            <aside className="hidden sm:min-w-sm sm:max-w-xs lg:ml-auto lg:block bg-blue-primary">
                <HomeAsideOthers />
            </aside>
        </div> */
}

export default Homepage;
