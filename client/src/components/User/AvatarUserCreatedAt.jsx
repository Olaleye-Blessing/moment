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
        <div className={`${extraClass} flex space-x-2 flex-nowrap`}>
            <Avatar src={profilePic} extraClass="bg-black" />
            <h5 className="max-w-full flex-1 min-w-0">
                <UserName name={name} username={userName} id={id} />
                <p className="text-xs font-normal  text-green-dark">
                    {humanDate(createdAt)}
                </p>
            </h5>
        </div>
    );
};

AvatarUserCreatedAt.defaultProps = {
    extraClass: "mb-5",
};

export default AvatarUserCreatedAt;
