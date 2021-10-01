/* eslint-disable no-lone-blocks */
import { useEffect } from "react";
import { useHistory, useLocation } from "react-router";
import HomeAsideOthers from "../components/HomeAside/HomeAsideOthers";
import MainContent from "../components/HomePage/MainContent";
import { useMomentContext } from "../context/MomentsContext";
import useFiniteScroll from "../hook/useFiniteScroll";
import { actions } from "../reducer/actions";
import { updateData } from "../reducer/fetchActions";
import { deletePost } from "../reducer/fetchActions/moment";
import getUserHasLiked from "../utilities/Moment/getUserHasLiked";
import { handleLikeMoment } from "../utilities/Moment/handleLikeMoment";
import { deletedToastNotification } from "../utilities/Toast";
import { uniqueArrayOfObject } from "../utilities/uniqueArrayOfObject";

const Homepage = () => {
    let {
        state: { moments, user, currentMomentPage, totalMomentPages },
        dispatch,
    } = useMomentContext();

    let history = useHistory();
    // let { hash } = useLocation(); // use this for scroll into view

    let abortFetch = new AbortController();

    let {
        totalData: totalMoments,
        status,
        error,
        page,
        totalPages,
    } = useFiniteScroll(
        `/moments?`,
        abortFetch.signal,
        currentMomentPage,
        totalMomentPages
    );

    useEffect(() => {
        if (status !== "fetched") return;

        let allUniqueMoments = [
            ...uniqueArrayOfObject([...moments, ...totalMoments], "_id"),
        ];
        dispatch({
            type: actions.FETCH_ALL,
            payload: {
                totalMoments: allUniqueMoments,
                page: page > totalPages ? totalPages : page,
                totalPages,
            },
        });

        return () => abortFetch.abort();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [totalMoments]);

    const handleLikeClicked = async (moment) => {
        let result = handleLikeMoment(user, moment);

        if (!result) return;

        let resultedMoment = result.moment;

        dispatch({ type: actions.LIKE_MOMENT, payload: resultedMoment });

        try {
            await updateData(`/moments/like/${resultedMoment._id}`, {});
        } catch (error) {
            console.log(error);
        }
    };

    const deleteMoment = async (moment) => {
        dispatch({
            type: actions.DELETE_MOMENT,
            payload: moment._id,
        });
        try {
            await deletePost(moment._id);
            deletedToastNotification("successfully deleted");
        } catch (error) {
            console.log(error);
        }
    };
    const scrollToMoment = (id) => {
        history.push(`/#${id}`);
    };

    return (
        <>
            <MainContent
                currentMomentPage={currentMomentPage}
                deleteMoment={deleteMoment}
                handleLikeClicked={handleLikeClicked}
                loading={status}
                error={error}
                moments={moments}
                getUserHasLiked={getUserHasLiked}
                scrollToMoment={scrollToMoment}
            />

            <aside className="hidden sm:min-w-sm sm:max-w-xs lg:ml-auto lg:block lg:sticky sm:top-24">
                <HomeAsideOthers />
            </aside>
        </>
    );
};

export default Homepage;
