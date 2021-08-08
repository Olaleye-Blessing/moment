// import toast from "react-hot-toast";
import { FaRegHeart } from "react-icons/fa";
// import { useMomentContext } from "../../context/MomentsContext";
// import { actions } from "../../reducer/actions";
// import { updateData } from "../../reducer/fetchActions";
import Button from "./Button";
import { ImHeart } from "react-icons/im";

const LikeButton = ({ likes, liked, onClick, extraClass }) => {
    return (
        <Button
            onClick={onClick}
            text={likes.length}
            extraClass={`btn-icon text-sm flex items-center justify-start gap-2 btn-general py-1 px-2 text-white-secondary hover:text-white group ${extraClass}`}
        >
            {liked ? (
                <ImHeart className="text-green-secondary" />
            ) : (
                <FaRegHeart className="text-white-secondary   group-hover:text-green-secondary" />
            )}
        </Button>
    );
};

LikeButton.defaultProps = {
    likes: [],
    liked: null,
    extraClass: "",
};

export default LikeButton;
