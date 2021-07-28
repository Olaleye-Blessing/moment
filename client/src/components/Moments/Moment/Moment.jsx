import { useHistory } from "react-router-dom";
// import { BiLike, BiDislike } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
// import { BsBookmark } from "react-icons/bs";
// import { BiVideo } from "react-icons/bi";
import { VscEdit, VscReactions } from "react-icons/vsc";

import { useMomentContext } from "../../../context/MomentsContext";
import humanDate from "../../../utilities/humanDate";
// import defaultImage from "./../../../data/images/blueFlower.jpg";
import Avatar from "../../Avatar";
// import { deletePost } from "../../../reducer/fetchActions";
import { deletePost } from "../../../reducer/fetchActions/moment";
import { actions } from "../../../reducer/actions";
import UserName from "../../User/UserName";
import Button from "../../Button/Button";
import ButtonIcon from "../../Button/ButtonIcon";
import MomentTags from "./MomentTags";
import AvatarUserCreatedAt from "../../User/AvatarUserCreatedAt";
import { deletedToastNotification } from "../../../utilities/Toast";

const Moment = ({ moment }) => {
    // console.log(moment);
    let { setCurrentMomentId, state, dispatch } = useMomentContext();
    // let { state } = useMomentContext();
    let history = useHistory();

    let { user } = state;
    let {
        creator,
        createdAt,
        // image,
        title,
        _id,
        tags,
        message,
        likes,
        dislikes,
        comments,
    } = moment;
    // console.log(moment);
    let { profilePic, name } = creator;

    // profilePic = profilePic || defaultImage;

    tags = [...new Set([...tags])]; //? eliminate duplicate tags

    // let secondsAgo = Date.now() - new Date(createdAt).getTime();

    // let formattedTime = formatDate(secondsAgo / 1000);

    // console.log(humanDate(createdAt));

    // image = !image ? defaultImage : image;

    const showMomentDetail = (e) => {
        e.stopPropagation();
        history.push(`/moments/${_id}`);
    };

    // console.log(moment);
    // console.log(likes, dislikes);

    // let reactions = Number(likes) + Number(dislikes);

    // console.log(creator);

    const deleteMoment = async (e) => {
        e.stopPropagation();
        // console.log("delete clicked");
        dispatch({
            type: actions.DELETE_MOMENT,
            payload: moment._id,
        });
        try {
            // console.log("got to delete moment...");
            await deletePost(moment._id);
            deletedToastNotification("successfully deleted");
            // console.log("done");
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
            {/* <div className="mb-5 flex gap-2">
                <Avatar src={profilePic} extraClass="bg-black" />
                <div className="">
                    <UserName name={name} username={"kikky"} id={creator._id} />
                    <p className="text-xs text-white-secondary">
                        {humanDate(createdAt)}
                    </p>
                </div>
            </div> */}
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
                            <div className="flex items-center justify-start btn-icon gap-1">
                                <VscReactions
                                    className=""
                                    style={{ fontSize: "20px" }}
                                />
                                <span className="text-base text-white-secondary">
                                    2
                                </span>
                            </div>
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
                                <ButtonIcon
                                    extraClass="hover:text-red-primary"
                                    icon={<MdDelete />}
                                    onClick={deleteMoment}
                                />
                            </li>
                        ) : null}
                        {user?._id === creator._id && (
                            <li>
                                <ButtonIcon
                                    icon={<VscEdit />}
                                    extraClass="hover:text-green-primary"
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
                11 days ago
            </div>
        </article>
    );
};

export default Moment;
