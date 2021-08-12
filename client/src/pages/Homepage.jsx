/* eslint-disable no-lone-blocks */
import { useEffect } from "react";
import HomeAsideOthers from "../components/HomeAside/HomeAsideOthers";
import MainContent from "../components/HomePage/MainContent";

const Homepage = () => {
    let abortFetch = new AbortController();

    useEffect(() => {
        return () => {
            return abortFetch.abort();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {/* <MainContent moments={moments} loading={loading} error={error} /> */}
            <MainContent abortControl={abortFetch} />

            <aside className="hidden sm:min-w-sm sm:max-w-xs lg:ml-auto lg:block lg:sticky sm:top-24">
                <HomeAsideOthers />
            </aside>
        </>
    );
};

export default Homepage;
