import { useHistory } from "react-router-dom";
import { FaRegComment } from "react-icons/fa";
// import { VscReactions } from "react-icons/vsc";

import { useMomentContext } from "../../../context/MomentsContext";
import { formatDate } from "../../../utilities/formatDate";
import { deletePost } from "../../../reducer/fetchActions/moment";
import { actions } from "../../../reducer/actions";
import Button from "../../Button/Button";
import MomentTags from "./MomentTags";
import AvatarUserCreatedAt from "../../User/AvatarUserCreatedAt";
import { deletedToastNotification } from "../../../utilities/Toast";
import DeleteBasketButton from "../../Button/DeleteBasketButton";
import EditPenIconButton from "../../Button/EditPenIconButton";
import LikeButton from "../../Button/LikeButton";
import toast from "react-hot-toast";
import { updateData } from "./../../../reducer/fetchActions.js";
import handleLikeComment, {
    getUserHasLiked,
} from "./../../../utilities/Comment/handleLikeComment.js";

const Moment = ({ moment }) => {
    let { setCurrentMomentId, state, dispatch } = useMomentContext();
    let history = useHistory();

    let { user } = state;
    let { creator, createdAt, title, _id, tags, message, likes, comments } =
        moment;

    let { profilePic, name } = creator;

    tags = [...new Set([...tags])]; //? eliminate duplicate tags

    let timeAgo = Date.now() - new Date(createdAt).getTime();

    let formattedTime = formatDate(timeAgo / 1000);

    const showMomentDetail = (e) => {
        e.stopPropagation();
        history.push(`/moments/${_id}`);
    };

    const deleteMoment = async (e) => {
        e.stopPropagation();
        dispatch({
            type: actions.DELETE_MOMENT,
            payload: moment._id,
        });
        try {
            await deletePost(moment._id);
            deletedToastNotification("successfully deleted");
        } catch (error) {
            console.log(error);
        }
    };

    // const getUserHasLiked = user && likes.find((likeId) => user._id === likeId);
    // const getUserHasLiked = () => {
    //     return user && likes.find((likeId) => user._id === likeId);
    // };
    const userHasLiked = getUserHasLiked(user, likes);

    const handleLikeClicked = async (e) => {
        let newLikes = handleLikeComment(e, user, likes);

        moment = { ...moment, likes: newLikes };
        dispatch({ type: actions.LIKE_MOMENT, payload: moment });

        try {
            await updateData(`/moments/like/${moment._id}`, {});
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <article
            className="box-shadow bg-black-subtle px-6 py-4 mb-8 transition-colors duration-500 cursor-pointer"
            tabIndex={0}
            onClick={showMomentDetail}
        >
            <AvatarUserCreatedAt
                profilePic={profilePic}
                name={name}
                userName="kikky"
                createdAt={createdAt}
                id={creator._id}
            />

            <div className="pl-10">
                <h3 className="text-lg text-center mb-3 text-white">{title}</h3>
                <p className="line-clamp-9 mb-3 text-white opacity-80">
                    {message}
                </p>
                {tags[0] !== "" && <MomentTags tags={tags} />}
                <div className="flex items-center justify-between mt-5">
                    <ul className="flex items-center justify-start gap-4">
                        <li>
                            <LikeButton
                                likes={likes}
                                // liked={getUserHasLiked()}
                                liked={userHasLiked}
                                onClick={handleLikeClicked}
                            />
                        </li>
                        <li>
                            <Button
                                extraClass="btn-icon text-sm flex items-center justify-start gap-2 btn-general py-1 px-2 text-white-secondary hover:text-white"
                                text={comments.length}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    history.push(`/moments/${_id}/#comments`);
                                }}
                            >
                                <FaRegComment />
                            </Button>
                        </li>
                    </ul>
                    <ul className="flex items-center justify-start gap-2">
                        {user?._id === creator._id ? (
                            <li>
                                <DeleteBasketButton onClick={deleteMoment} />
                            </li>
                        ) : null}
                        {user?._id === creator._id && (
                            <li>
                                <EditPenIconButton
                                    onClick={(e) => {
                                        e.stopPropagation();

                                        setCurrentMomentId(moment._id);
                                        history.replace("/moment");
                                    }}
                                />
                            </li>
                        )}
                    </ul>
                </div>
            </div>
            <div className="text-right text-xs mt-5 text-white text-opacity-50">
                {formattedTime}
            </div>
        </article>
    );
};

export default Moment;
