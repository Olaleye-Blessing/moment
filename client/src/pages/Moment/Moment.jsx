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
import useFetch from "./../../hook/useFetch";
import EditPenIconButton from "../../components/Button/EditPenIconButton";

const Moment = () => {
    let history = useHistory();
    let { id } = useParams();
    let { hash } = useLocation();
    let { state, dispatch, setCurrentMomentId } = useMomentContext();
    const [comment, setComment] = useState("");
    let { moments, user } = state;

    const [moment, setMoment] = useState(null);
    const [submitComment, setSubmitComment] = useState(false);

    let abortMoment = new AbortController();
    let signal = abortMoment.signal;

    const getMoment = () => moments.find((moment) => moment._id === id);

    // this covers all cases of either app has been initialised, a moment that is not part of context moments is searched for or a moment from a profile is clicked
    let momentFound = Boolean(getMoment());
    let url = !momentFound && `/moments/${id}`;
    let {
        status,
        error,
        data: { data },
    } = useFetch(url, signal);

    useEffect(() => {
        if (momentFound) {
            // moment is among state context moments
            setMoment(getMoment());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        if (status !== "fetched" || momentFound) return;

        setMoment(data);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

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

    if (status === "idle" && moments.length === 0) return null;

    if (status === "fetching") return <main>Loading....</main>;

    if (state === "error") return <main>There is an error</main>;

    if (!moment) return null;

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

    let {
        profilePic,
        name,
        _id: creatorId,
        username,
        lives: location,
        education,
        work,
        followers,
        following,
    } = creator;

    let creatorSubdetail = [
        { header: "Location", text: location },
        { header: "Education", text: education },
        { header: "Work", text: work },
    ];

    creatorSubdetail = creatorSubdetail.filter(({ text }) => text);

    creatorSubdetail.push(
        { header: "Following", text: following.length },
        { header: "Followers", text: followers.length }
    );

    tags = [...new Set([...tags])];
    message = message.split("\n").filter((msg) => msg !== "");

    const handleSubmit = async (e) => {
        e.preventDefault();
        let data = {
            comment,
            moment: momentId,
        };

        setSubmitComment(true);
        try {
            let res = await createComment(data);
            dispatch({
                type: actions.CREATE_COMMENT,
                payload: res.data.comment,
            });
            if (!momentFound) {
                setMoment((prev) => ({
                    ...prev,
                    comments: [...prev.comments, res.data.comment],
                }));
            }
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

    const handleLikeClicked = async (e) => {
        let result = handleLikeMoment(user, moment);

        if (!result) return;

        let resultedMoment = result.moment;
        setMoment(resultedMoment);

        dispatch({
            type: actions.LIKE_MOMENT,
            payload: resultedMoment,
        });

        try {
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
                                <EditPenIconButton
                                    onClick={(e) => {
                                        e.stopPropagation();

                                        setCurrentMomentId(moment._id);
                                        history.replace("/moment");
                                    }}
                                />
                                {/* <ButtonIcon
                                    icon={<VscEdit />}
                                    extraClass="hover:text-green-primary md:text-xl"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        history.replace("/moment");
                                    }}
                                /> */}
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
            <aside className="mt-5 border border-green-dark rounded-md py-7 px-5 md:px-12 lg:m-0 lg:px-5 lg:self-start lg:sticky lg:top-24 lg:min-w-sm lg:flex-shrink-1 lg:max-w-xs">
                <section>
                    <header>
                        <AvatarUserCreatedAt
                            profilePic={profilePic}
                            name={name}
                            userName={username}
                            createdAt={createdAt}
                            id={creatorId}
                        />
                    </header>
                    {creator.bio && (
                        <p className="text-opacity-90 text-white">
                            {creator.bio}
                        </p>
                    )}
                    <ul className="mt-5">
                        {creatorSubdetail.map(({ text, header }) => (
                            <li key={header} className="mb-5">
                                <div className="text-white-secondary text-lg font-semibold">
                                    {header}
                                </div>
                                <div className="capitalize">{text}</div>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-4">
                        {!user || user._id === creatorId ? (
                            <Button
                                text="profile"
                                disabled={false}
                                extraClass={`btn-submit btn-submit-enable`}
                                onClick={() =>
                                    history.push(`/profile/${creatorId}`)
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
