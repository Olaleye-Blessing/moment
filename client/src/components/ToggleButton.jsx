import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
const ToggleButton = ({ onClick, showPswd }) => {
    return (
        <button
            type="button"
            className="w-max text-gray text-xl absolute right-2 top-9 inline-block"
            onClick={onClick}
        >
            {showPswd ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
        </button>
    );
};

export default ToggleButton;
