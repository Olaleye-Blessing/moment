import humanDate from "../../utilities/humanDate";
import Avatar from "../Avatar";
import UserName from "./UserName";

const AvatarUserCreatedAt = ({
    profilePic,
    name,
    userName,
    createdAt,
    id,
    extraClass,
}) => {
    return (
        <div className={`${extraClass} flex space-x-2`}>
            <Avatar src={profilePic} extraClass="bg-black" />
            <div className="">
                <UserName name={name} username={userName} id={id} />
                <p className="text-xs text-white-secondary">
                    {humanDate(createdAt)}
                </p>
            </div>
        </div>
    );
};

AvatarUserCreatedAt.defaultProps = {
    extraClass: "mb-5",
};

export default AvatarUserCreatedAt;
