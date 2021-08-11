import toast from "react-hot-toast";
import getUserHasLiked from "./getUserHasLiked";

export const handleLikeMoment = (user, moment) => {
    if (!user) {
        toast.error("You need to be signed in to like this moment!!");
        return null;
    }

    let { likes } = moment;
    let like = getUserHasLiked(user, likes);

    if (like) {
        likes = likes.filter((likeId) => like !== likeId);
    } else {
        likes.push(user._id);
    }

    moment = { ...moment, likes };

    return { moment };
};
