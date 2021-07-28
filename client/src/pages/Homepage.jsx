import { useEffect, useState } from "react";
import { useMomentContext } from "../context/MomentsContext";
import { actions } from "../reducer/actions";
// import { fetchPosts } from "../reducer/fetchActions";
// import { fetchData } from "../reducer/fetchActions";
import Moments from "../components/Moments/Moments";
import LoadingIndicator from "../components/LoadingIndicator";
// import cryingGif from "./data/gifs/crying.gif";
import { Link } from "react-router-dom";
import HomeAsideProfile from "../components/HomeAside/HomeAsideProfile";
// import HomeAsideOthers from "../components/HomeAside/HomeAsideOthers";
// import { fetchPosts } from "../reducer/fetchActions/moment";
// import NotFound from "./NotFound";
// import Alert from "./../components/Alert";
// import CloseButton from "../components/Button/CloseButton";
import { getData } from "../reducer/fetchActions";
import ProcessIndicator from "../components/ProcessIndicator";

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
                // let response = await fetchPosts(signal);
                // let response = await fetchData(`/moments`, signal);
                let response = await getData(`/moments`, signal);
                dispatch({
                    type: actions.FETCH_ALL,
                    payload: response.moments,
                });
                setLoading(false);
                setError(null);
            } catch (error) {
                dispatch({ type: actions.ERROR, payload: error });
                console.log(error);
            }
        };

        fetchAllPosts();

        return () => abort.abort();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // sm:flex-auto sm:min-w-sm sm:max-w-xs sm:bg-transparent sm:px-0 md:mr-auto 2xl:mx-auto
    return (
        <div
            data-page="homepage"
            className="relative px-3 py-5 md:px-8 lg:px-16 xl:px-32 sm:flex sm:items-start sm:justify-start sm:gap-5"
        >
            {/* h-full */}
            <aside
                className="absolute -top-1 bg-black transition-transform right-full px-3 py-4 z-20 max-w-md sm:bg-transparent sm:static sm:pt-0 sm:min-w-sm sm:max-w-xs sm:px-0 md:mr-auto"
                ref={asideProfRef}
            >
                <HomeAsideProfile />
            </aside>
            <main className="sm:w-full lg:max-w-2xl" data-content="moments">
                {moments.length === 0 && loading && (
                    <ProcessIndicator
                        parentExtraClass="w-full h-80"
                        childExtraClass="w-40 h-40"
                    />
                )}
                {error && <div>Error...</div>}
                {!loading && moments.length < 1 ? (
                    <div className="text-center">No moments</div>
                ) : (
                    <Moments moments={moments} />
                )}
                {/* {moments.length < 1 && !status ? (
                    <LoadingIndicator />
                ) : moments.length < 1 && status ? (
                    <>
                        <div className="error-page-cont">
                            <div id="error-page">
                                <div className="content">
                                    <h2 className="header" data-text="(^_^)">
                                        (^_^)
                                    </h2>
                                    <h4
                                        style={{ marginTop: "20px" }}
                                        data-text="😔😔😔😔"
                                    >
                                        😔😔😔😔
                                    </h4>
                                    <p>Sorry! There are no moments available</p>
                                    <div className="btns">
                                        <Link to="/moment">create moment</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <Moments moments={moments} />
                )} */}
            </main>
            {/* lg:block */}
            <aside className="hidden sm:min-w-sm sm:max-w-xs lg:ml-auto lg:block">
                {/* <HomeAsideOthers /> */}
                <HomeAsideProfile />
            </aside>
        </div>
    );
};

export default Homepage;
