import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
const ToggleButton = ({ onClick, showPswd }) => {
    return (
        <button
            type="button"
            className="toggle btn link link__icon-action link__noAction link__noAction-white"
            onClick={onClick}
            // style={{
            //     width: "auto",
            //     color: "#fff",
            //     backgroundColor: "transparent",
            // }}
        >
            {showPswd ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
        </button>
    );
};

export default ToggleButton;
