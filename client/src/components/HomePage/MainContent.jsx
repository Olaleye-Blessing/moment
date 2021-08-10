import { useEffect } from "react";
import { useMomentContext } from "../../context/MomentsContext";
import useFiniteScroll from "../../hook/useFiniteScroll";
import { actions } from "../../reducer/actions";
import Moments from "../Moments/Moments";
import ProcessIndicator from "../ProcessIndicator";

const MainContent = ({ abortControl }) => {
    let {
        state: { moments },
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

    return (
        <main className="sm:w-full lg:max-w-2xl" data-content="moments">
            {moments.length > 0 ? (
                <Moments moments={moments} />
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
