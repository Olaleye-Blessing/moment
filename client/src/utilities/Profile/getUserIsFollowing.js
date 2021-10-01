export const getUserIsFollowing = (user, following, followingId) => {
    // console.log(user);

    return user && following.find((followedId) => followingId === followedId);
};
