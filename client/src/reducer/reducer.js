/* eslint-disable default-case */
import { actions } from "./actions";
export const reducer = (state, action) => {
    // console.log(state);
    // console.log(action);
    // console.log(action.payload);
    switch (action.type) {
        case actions.FETCH_ALL:
            // console.log({ ...state });
            return {
                ...state,
                moments: [...action.payload.totalMoments],
                currentMomentPage: action.payload.page,
                totalMomentPages: action.payload.totalPages,
            };

        case actions.CREATE_MOMENT:
            let newcreatedMoment = { ...action.payload, comments: [] };
            // return { ...state, moments: [...state.moments, newcreatedMoment] };
            return {
                ...state,
                moments: [newcreatedMoment, ...state.moments],
            };

        case actions.UPDATE_MOMENT:
        case actions.LIKE_MOMENT:
            let { moments } = state;
            moments = moments.map((moment) =>
                moment._id === action.payload._id ? action.payload : moment
            );
            return { ...state, moments };

        case actions.DELETE_MOMENT:
            let { moments: currentMoments } = state;

            currentMoments = [...currentMoments].filter(
                (moment) => moment._id !== action.payload
            );

            return { ...state, moments: currentMoments };

        case actions.AUTHENTICATION:
        case actions.UPDATE_USER:
            localStorage.setItem("profile", JSON.stringify(action.payload));
            return { ...state, user: action.payload };

        case actions.LOGOUT:
            localStorage.removeItem("profile");
            return { ...state, user: null };

        case actions.CREATE_COMMENT:
            let oldMoments = [...state.moments];
            let momentId = action.payload.moment;
            let oldMoment = oldMoments.find(
                (moment) => moment._id === momentId
            );
            oldMoment.comments = [...oldMoment.comments, action.payload];

            return { ...state, moments: oldMoments };
    }
};
