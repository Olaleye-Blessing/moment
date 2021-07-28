import {
    createContext,
    useContext,
    useEffect,
    useReducer,
    useRef,
    useState,
} from "react";
import { actions } from "../reducer/actions";
import { reducer } from "../reducer/reducer";

const MomentContent = createContext();

const initialState = {
    moments: [],
    user: JSON.parse(localStorage.getItem("profile")),
};

console.log("initialState", initialState);

export const MomentsProvider = ({ children }) => {
    // const [state, dispatch] = useReducer(reducer, initialState, () => {
    //     return { moments: [] };
    // });
    const [state, dispatch] = useReducer(reducer, initialState);
    const [showAsideProfNav, setShowAsideProfNav] = useState(false);
    const asideProfRef = useRef(null);

    // const showAsideProfNavNow = (show) => {
    //     setShowAsideProfNav(show);
    // };

    // console.log(state.moments);
    const [currentMomentId, setCurrentMomentId] = useState(null);

    // let momentBaseUrl =
    //     process.env.NODE_ENV === "development"
    //         ? "http://localhost:7000"
    //         : "https://wahala-movie.herokuapp.com";

    return (
        <MomentContent.Provider
            value={{
                state,
                dispatch,
                currentMomentId,
                setCurrentMomentId,
                // momentBaseUrl,
                asideProfRef,
                showAsideProfNav,
                setShowAsideProfNav,
                // showAsideProfNavNow,
            }}
        >
            {children}
        </MomentContent.Provider>
    );
};

export const useMomentContext = () => useContext(MomentContent);
