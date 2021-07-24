import { useHistory } from "react-router-dom";

const UserName = ({ name, username, checkDetail, id }) => {
    let history = useHistory();
    return (
        <button
            type="button"
            // className="btn moment__creator-name"
            className="btn moment__creator-name link"
            onClick={(e) => {
                e.stopPropagation();
                console.log("clicked....");
                history.push(`/profile/${id}`);
            }}
            // onClick={checkDetail}
        >
            {name}
            <span className="moment__creator-username">@{username}</span>
        </button>
    );
};

export default UserName;
