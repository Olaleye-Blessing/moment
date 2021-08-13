import { useHistory } from "react-router-dom";

const UserName = ({ name, username, checkDetail, id }) => {
    let history = useHistory();
    return (
        <button
            type="button"
            className="group hover:text-green-secondary text-left inline-block overflow-hidden overflow-ellipsis whitespace-nowrap min-w-0 max-w-full capitalize"
            onClick={(e) => {
                e.stopPropagation();
                console.log("clicked....");
                history.push(`/profile/${id}`);
            }}
        >
            {name}
            <span className="text-xs text-white-secondary p-1 group-hover:text-green-light transition-colors">
                @{username}
            </span>
        </button>
    );
};

export default UserName;
