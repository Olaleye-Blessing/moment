import {
    createContext,
    useContext,
    // useEffect,
    useReducer,
    useRef,
    useState,
} from "react";
// import { useLocation } from "react-router-dom";
// import { actions } from "../reducer/actions";
import { reducer } from "../reducer/reducer";
// import useFiniteScroll from "./../hook/useFiniteScroll";

const MomentContent = createContext();

export const MomentsProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, {
        moments: [],
        user: JSON.parse(localStorage.getItem("profile")),
        currentMomentPage: 1,
        totalMomentPages: 1,
    });
    const [showAsideProfNav, setShowAsideProfNav] = useState(false);
    const asideProfRef = useRef(null);

    const [currentMomentId, setCurrentMomentId] = useState(null);

    // let abortFetch = new AbortController();

    // let location = useLocation();
    // console.log(location);

    // let { data, loading, error } = useFiniteScroll(
    //     `/moments?`,
    //     abortFetch.signal
    // );

    // console.log({ totalMoments, status, error });

    // useEffect(() => {
    //     return () => abortFetch.abort();
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);

    // useEffect(() => {
    //     if (data) {
    //         dispatch({
    //             type: actions.FETCH_ALL,
    //             payload: data,
    //         });
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [data]);

    // console.log(totalMoments);
    return (
        <MomentContent.Provider
            value={{
                state,
                dispatch,
                currentMomentId,
                setCurrentMomentId,
                asideProfRef,
                showAsideProfNav,
                setShowAsideProfNav,
                // loading,
                // error,
                // momentsStatus,
                // momentsError,
            }}
        >
            {children}
        </MomentContent.Provider>
    );
};

export const useMomentContext = () => useContext(MomentContent);
