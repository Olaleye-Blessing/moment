const getUserHasLiked = (user, likes) => {
    return user && likes.find((likeId) => user._id === likeId);
};

export default getUserHasLiked;
