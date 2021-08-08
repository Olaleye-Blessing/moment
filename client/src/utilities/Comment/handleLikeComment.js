import toast from "react-hot-toast";

export const getUserHasLiked = (user, likes) =>
    user && likes.find((likeId) => user._id === likeId);

const handleLikeComment = (e, user, likes) => {
    e.stopPropagation();
    // e.preventDefault();
    console.log("clicked");

    if (!user) {
        toast.error("You need to be signed in to like this moment!!");
        return;
    }

    console.log("got here");
    let like = getUserHasLiked(user, likes);

    if (like) {
        likes = likes.filter((likeId) => like !== likeId);
    } else {
        likes.push(user._id);
    }

    return likes;
};

export default handleLikeComment;
