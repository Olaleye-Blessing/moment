export const getUserIsFollowing = (user, following, followingId) => {
    return user && following.find((followedId) => followingId === followedId);
};
