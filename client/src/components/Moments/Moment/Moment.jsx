import { useHistory } from "react-router-dom";
import { FaRegComment } from "react-icons/fa";

import { useMomentContext } from "../../../context/MomentsContext";
import { formatDate } from "../../../utilities/formatDate";
import Button from "../../Button/Button";
import MomentTags from "./MomentTags";
import AvatarUserCreatedAt from "../../User/AvatarUserCreatedAt";
import DeleteBasketButton from "../../Button/DeleteBasketButton";
import EditPenIconButton from "../../Button/EditPenIconButton";
import LikeButton from "../../Button/LikeButton";

const Moment = ({
    moment,
    deleteMoment,
    handleLikeClicked,
    getUserHasLiked,
    scrollToMoment,
}) => {
    // let { setCurrentMomentId, state, dispatch } = useMomentContext();
    let { setCurrentMomentId, state } = useMomentContext();
    let history = useHistory();

    let { user } = state;
    let { creator, createdAt, title, _id, tags, message, likes, comments } =
        moment;

    // Did this to prevent another type of array being passed in. This happens in the search page whenever a user array is still passed in
    if (!creator) return null;

    let { profilePic, name, username } = creator;

    tags = [...new Set([...tags])]; //? eliminate duplicate tags

    let timeAgo = Date.now() - new Date(createdAt).getTime();

    let formattedTime = formatDate(timeAgo / 1000);

    const showMomentDetail = (e) => {
        e.stopPropagation();
        if (scrollToMoment) {
            scrollToMoment(_id);
        }
        history.push(`/moments/${_id}`);
    };

    return (
        <article
            className="box-shadow bg-black-subtle px-6 py-4 mb-8 transition-colors duration-500 cursor-pointer"
            tabIndex={0}
            onClick={showMomentDetail}
            id={_id}
        >
            <AvatarUserCreatedAt
                profilePic={profilePic}
                name={name}
                userName={username}
                createdAt={createdAt}
                id={creator._id}
            />

            <div className="pl-10">
                <h2 className="text-center mb-3 text-white">{title}</h2>
                <p className="line-clamp-9 mb-3 text-white opacity-80">
                    {message}
                </p>
                {tags[0] !== "" && <MomentTags tags={tags} />}
                <div className="flex items-center justify-between mt-5">
                    <ul className="flex items-center justify-start space-x-4">
                        <li>
                            <LikeButton
                                likes={likes}
                                liked={getUserHasLiked(user, likes)}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleLikeClicked(moment);
                                }}
                            />
                        </li>
                        <li>
                            <Button
                                extraClass="btn-icon text-sm flex items-center justify-start space-x-2 btn-general py-1 px-2 text-white-secondary hover:text-white"
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
                    <ul className="flex items-center justify-start space-x-2">
                        {user?._id === creator._id ? (
                            <li>
                                <DeleteBasketButton
                                    onClick={(e) => {
                                        // e.preventDefault();
                                        e.stopPropagation();
                                        deleteMoment(moment);
                                    }}
                                />
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

Moment.defaultProps = {
    scrollToMoment: null,
};

export default Moment;
