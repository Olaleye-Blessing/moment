/* eslint-disable no-lone-blocks */
import { useEffect, useState } from "react";
import {
    useHistory,
    useParams,
    Link,
    useLocation,
    Redirect,
} from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { FaRegComment } from "react-icons/fa";
import { VscEdit } from "react-icons/vsc";

import LoadingIndicator from "./../../components/LoadingIndicator";
import { useMomentContext } from "./../../context/MomentsContext";
import Avatar from "./../../components/Avatar";
import FormTextArea from "./../../components/Form/FormTextArea";
import { createComment } from "./../../reducer/fetchActions/comment";
import { actions } from "./../../reducer/actions";
import { deletePost, momentDetails } from "./../../reducer/fetchActions/moment";
import MomentTags from "./../../components/Moments/Moment/MomentTags";
import AvatarUserCreatedAt from "./../../components/User/AvatarUserCreatedAt";
import Button from "./../../components/Button/Button";
import ButtonIcon from "./../../components/Button/ButtonIcon";
import ProcessIndicator from "./../../components/ProcessIndicator";
import LikeButton from "./../../components/Button/LikeButton";
import { updateData } from "../../reducer/fetchActions";
import getUserHasLiked from "../../utilities/Moment/getUserHasLiked";
import { handleLikeMoment } from "../../utilities/Moment/handleLikeMoment";
import toast from "react-hot-toast";
import { getUserIsFollowing } from "../../utilities/Profile/getUserIsFollowing";

const Moment = () => {
    let history = useHistory();
    let { id } = useParams();
    let { hash } = useLocation();
    let { state, dispatch } = useMomentContext();
    const [comment, setComment] = useState("");
    let { moments, user } = state;

    const [moment, setMoment] = useState(null);
    const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(false);
    const [submitComment, setSubmitComment] = useState(false);

    let abortMoment = new AbortController();
    let signal = abortMoment.signal;

    const getMoment = () => moments.find((moment) => moment._id === id) || null;
    // console.log(moments);
    // console.log({ getMoment: getMoment() });

    const fetchMoment = async () => {
        try {
            let response = await momentDetails(id, signal);
            setMoment(response.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        if (moments.length > 0) {
            // console.log("useEffect");
            // console.log(moments);
            // console.log({ getMoment: getMoment() });
            setMoment(getMoment());
            setLoading(false);
        } else {
            fetchMoment();
        }
        setMoment(getMoment());

        return () => abortMoment.abort();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const scrollToComment = () => {
        let commentHeader = document.getElementById("comments");
        let navHeight = document.getElementById("mainNav").offsetHeight;

        if (commentHeader) {
            let { top } = commentHeader.getBoundingClientRect();
            top = Math.floor(top - navHeight);

            window.scroll({
                top,
                left: 0,
                behavior: "smooth",
            });
        }
    };

    useEffect(() => {
        // scroll to comment section if user click on comment icon on homepage/any page
        // use moment as dependency so that DOM will be fully updated so as to get header by id(of comments)
        if (hash) {
            scrollToComment();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [moment]);

    if (loading) return <LoadingIndicator />;

    if (moment === null) return <Redirect to="/NotFound" />;

    let {
        _id: momentId,
        comments,
        createdAt,
        creator,
        image: momentHeaderImage,
        title,
        message,
        tags,
        likes,
    } = moment;

    let { profilePic, name, _id: creatorId, username } = creator;

    tags = [...new Set([...tags])];
    message = message.split("\n").filter((msg) => msg !== "");
    // console.log(message);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let data = {
            comment,
            moment: momentId,
        };

        // console.log(data);
        setSubmitComment(true);
        try {
            // let res = await createComment(JSON.stringify(data));
            let res = await createComment(data);
            // console.log(res);
            dispatch({
                type: actions.CREATE_COMMENT,
                payload: res.data.comment,
            });
            setSubmitComment(false);
        } catch (error) {
            console.info(error);
            setSubmitComment(false);
        }
    };

    const deleteMoment = async (e) => {
        e.stopPropagation();

        dispatch({
            type: actions.DELETE_MOMENT,
            payload: momentId,
        });

        try {
            await deletePost(momentId);
            history.push("/");
        } catch (error) {
            // console.log(error);
        }
    };

    // const getUserHasLiked = () =>
    //     user && likes.find((likeId) => user._id === likeId);

    const handleLikeClicked = async (e) => {
        let result = handleLikeMoment(user, moment);

        if (!result) return;

        let resultedMoment = result.moment;
        setMoment(resultedMoment);
        // setMoment({ ...moment, likes });

        dispatch({
            type: actions.LIKE_MOMENT,
            // payload: { ...moment, likes },
            payload: resultedMoment,
        });

        try {
            // await updateData(`/moments/like/${moment._id}`, {});
            await updateData(`/moments/like/${resultedMoment._id}`, {});
        } catch (error) {
            console.log(error);
        }
    };

    const handleFollowClicked = async (e) => {
        if (!user) {
            toast.error("Please log in to follow this user");
            return;
        }

        try {
            let result = await updateData(`/profile/follow`, {
                followingId: creatorId,
                userEditingId: user._id,
            });
            let { profileResult, userResult } = result.data;
            user = { ...user, following: userResult.following };

            // update logged in user profile
            dispatch({
                type: actions.UPDATE_USER,
                payload: user,
            });

            // update moment
            let updatedMoment = {
                ...moment,
                creator: { ...creator, following: profileResult.following },
            };

            setMoment(updatedMoment);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="md:ml-14 lg:flex lg:items-start lg:gap-4">
            <main className="border border-green-dark rounded-md lg:flex-auto">
                <article className="">
                    {momentHeaderImage && (
                        <figure className="w-full max-h-96 overflow-hidden rounded-t-md">
                            <img
                                src={momentHeaderImage}
                                alt="kk"
                                className="w-full object-cover object-center max-h-96"
                            />
                        </figure>
                    )}
                    <div className="px-3 pt-4 md:px-12">
                        {/* <h1 className="text-3xl mb-4">{title}</h1> */}
                        <h1 className="mb-4">{title}</h1>
                        {tags[0] !== "" && <MomentTags tags={tags} />}
                        <AvatarUserCreatedAt
                            profilePic={profilePic}
                            name={name}
                            userName={username}
                            createdAt={createdAt}
                            id={creatorId}
                        />

                        {message.map((msg, i) => (
                            <p
                                key={`${msg}${i}`}
                                className={`${
                                    i === +message.length - 1
                                        ? "md:mb-5"
                                        : "mb-5"
                                }`}
                            >
                                {msg}
                            </p>
                        ))}
                    </div>
                </article>
                <div className="flex items-center justify-between bg-black-primary sticky bottom-13 mb-4 pt-4 pb-3 px-2 sm:bottom-0 md:fixed md:top-20 md:left-0 md:flex md:flex-col md:justify-start md:gap-6 md:pl-6 md:mb-0 lg:left-9 xl:ml-16">
                    <ul className="flex items-center justify-start space-x-4 sm:space-x-0 md:-mt-2 md:gap-4 md:flex-col-reverse">
                        <li>
                            <LikeButton
                                likes={likes}
                                // liked={userHasLiked}
                                liked={getUserHasLiked(user, likes)}
                                onClick={handleLikeClicked}
                                extraClass="text-lg"
                            />
                        </li>
                        <li>
                            <div className="flex items-center justify-start btn-icon space-x-2 sm:space-x-0 sm:gap-2">
                                <FaRegComment className="text-white-secondary mr-1" />
                                <span className="text-base ">
                                    {comments.length}
                                </span>
                            </div>
                        </li>
                    </ul>
                    {user?._id === creator._id && (
                        <ul className="flex items-center justify-start space-x-2 sm:space-x-0 gap-2 md:flex-col md:gap-4">
                            <li>
                                <ButtonIcon
                                    extraClass="hover:text-red-primary md:text-xl"
                                    icon={<MdDelete />}
                                    onClick={deleteMoment}
                                />
                            </li>
                            <li>
                                <ButtonIcon
                                    icon={<VscEdit />}
                                    extraClass="hover:text-green-primary md:text-xl"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        history.replace("/moment");
                                    }}
                                />
                            </li>
                        </ul>
                    )}
                </div>

                <section
                    id="comments"
                    className="py-4 px-5 border-t border-green-dark md:px-12"
                >
                    <h2 className="mb-6">
                        Comments
                        <span className="text-white-secondary pl-1 text-lg">
                            ({comments.length})
                        </span>
                    </h2>
                    {user ? (
                        <div className="flex gap-2">
                            <Avatar extraClass="bg-black flex-shrink-1 min-w-fg" />
                            <form className="flex-1" onSubmit={handleSubmit}>
                                <FormTextArea
                                    // name="comment"
                                    extraClass="mb-0"
                                    value={comment}
                                    handleChange={(e) =>
                                        setComment(e.target.value)
                                    }
                                    placeholder="write your comment..."
                                />
                                <div className="mb-7 mt-6">
                                    <Button
                                        text="comment"
                                        type="submit"
                                        disabled={submitComment}
                                        extraClass={`btn-submit ${
                                            submitComment
                                                ? "btn-submit-disable"
                                                : "btn-submit-enable"
                                        }`}
                                    >
                                        {submitComment && <ProcessIndicator />}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    ) : (
                        <div className="mt-3 mb-5">
                            <Link
                                to="/auth/login"
                                className="btn btn-submit-enable px-5"
                            >
                                login to comment
                            </Link>
                        </div>
                    )}

                    {comments.length > 0 && (
                        <ul>
                            {comments.map((comment) => {
                                {
                                    /* console.log(comment); */
                                }
                                return (
                                    <li className="mb-7" key={comment._id}>
                                        <AvatarUserCreatedAt
                                            profilePic={comment.user.profilePic}
                                            name={comment.user.name}
                                            userName={comment.user.username}
                                            createdAt={comment.createdAt}
                                            id={comment.user._id}
                                            extraClass="mb-2"
                                        />
                                        <p className="break-words hyphens-manual pl-10">
                                            {comment.comment}
                                        </p>
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </section>
            </main>
            <aside className="mt-5 border border-green-dark rounded-md py-4 px-5 md:px-12 lg:m-0 lg:px-5 lg:self-start lg:sticky lg:top-24 lg:min-w-sm lg:flex-shrink-0">
                <section>
                    <header>
                        <AvatarUserCreatedAt
                            profilePic={profilePic}
                            name={name}
                            userName="blexxy"
                            createdAt={createdAt}
                            id={creatorId}
                            // extraClass=""
                        />
                    </header>
                    {creator.bio && <p>{creator.bio}</p>}
                    <div className="mt-4">
                        {user._id === creatorId ? (
                            <Button
                                text="profile"
                                disabled={false}
                                extraClass={`btn-submit btn-submit-enable`}
                                onClick={() =>
                                    history.push(`/profile/${user._id}`)
                                }
                            />
                        ) : (
                            <Button
                                text={
                                    getUserIsFollowing(
                                        user,
                                        user.following,
                                        creatorId
                                    )
                                        ? "unfollow"
                                        : "follow"
                                }
                                disabled={false}
                                extraClass={`btn-submit btn-submit-enable`}
                                onClick={handleFollowClicked}
                            />
                        )}
                    </div>
                </section>
            </aside>
        </div>
    );
};

export default Moment;
