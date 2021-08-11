import { useEffect } from "react";
import { useMomentContext } from "../../context/MomentsContext";
import useFiniteScroll from "../../hook/useFiniteScroll";
import { actions } from "../../reducer/actions";
import { updateData } from "../../reducer/fetchActions";
import { deletePost } from "../../reducer/fetchActions/moment";
import getUserHasLiked from "../../utilities/Moment/getUserHasLiked";
import { handleLikeMoment } from "../../utilities/Moment/handleLikeMoment";
import { deletedToastNotification } from "../../utilities/Toast";
import Moments from "../Moments/Moments";
import ProcessIndicator from "../ProcessIndicator";

const MainContent = ({ abortControl }) => {
    let {
        state: { moments, user },
        dispatch,
    } = useMomentContext();

    let { data, loading, error } = useFiniteScroll(
        `/moments?`,
        abortControl.signal
    );

    useEffect(() => {
        if (data) {
            dispatch({
                type: actions.FETCH_ALL,
                payload: data,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    const handleLikeClicked = async (moment) => {
        let result = handleLikeMoment(user, moment);

        if (!result) return;

        let resultedMoment = result.moment;

        // dispatch({ type: actions.LIKE_MOMENT, payload: moment });
        dispatch({ type: actions.LIKE_MOMENT, payload: resultedMoment });

        try {
            // await updateData(`/moments/like/${moment._id}`, {});
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

    return (
        <main className="sm:w-full lg:max-w-2xl" data-content="moments">
            {moments.length > 0 ? (
                <Moments
                    moments={moments}
                    deleteMoment={deleteMoment}
                    handleLikeClicked={handleLikeClicked}
                    getUserHasLiked={getUserHasLiked}
                />
            ) : moments.length === 0 && !loading ? (
                <div className="text-center">No moments</div>
            ) : null}
            {loading && (
                <ProcessIndicator
                    parentExtraClass="w-full h-80"
                    childExtraClass="w-40 h-40"
                />
            )}
            {!loading && error && (
                <div className="text-center mb-3">{error}</div>
            )}
        </main>
    );
};

export default MainContent;
