import { AiFillCheckCircle, AiFillExclamationCircle } from "react-icons/ai";

const FormValidationIcon = ({ type }) => {
    return (
        <div className="absolute -bottom-5 right-0">
            {type === "valid" && (
                <AiFillCheckCircle className="text-green-primary" />
            )}
            {type === "invalid" && (
                <AiFillExclamationCircle className="text-red" />
            )}
        </div>
    );
};

export default FormValidationIcon;
