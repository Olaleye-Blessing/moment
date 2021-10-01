import { createContext, useContext, useReducer, useRef, useState } from "react";
import { reducer } from "../reducer/reducer";

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
            }}
        >
            {children}
        </MomentContent.Provider>
    );
};

export const useMomentContext = () => useContext(MomentContent);
