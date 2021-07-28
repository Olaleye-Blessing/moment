import { useHistory } from "react-router-dom";

const UserName = ({ name, username, checkDetail, id }) => {
    let history = useHistory();
    return (
        <button
            type="button"
            // className="btn moment__creator-name"
            className="text-lg group hover:text-green-secondary"
            onClick={(e) => {
                e.stopPropagation();
                console.log("clicked....");
                history.push(`/profile/${id}`);
            }}
            // onClick={checkDetail}
        >
            {name}
            <span className="text-xs text-white-secondary p-1 group-hover:text-green-light transition-colors">
                @{username}
            </span>
        </button>
    );
};

export default UserName;
