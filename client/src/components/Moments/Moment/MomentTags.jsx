import { useHistory } from "react-router-dom";
import Button from "../../Button/Button";

const MomentTags = ({ tags }) => {
    let history = useHistory();
    return (
        <ul className="mt-4 mb-3 flex flex-wrap">
            {tags.map((tag) => (
                <li key={tag} className=" first:ml-0 mx-2 my-2">
                    <Button
                        text={tag}
                        onClick={(e) => {
                            e.stopPropagation();
                            history.push(`/moments/tags/${tag}`);
                        }}
                        extraClass="bg-black-secondary btn text-green-primary hover:text-opacity-60 text-sm"
                    />
                </li>
            ))}
        </ul>
    );
};

export default MomentTags;
