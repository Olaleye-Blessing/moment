const FormErrorMsg = ({ text }) => {
    return (
        <small className="absolute left-0 -bottom-5 text-white-secondary">
            {text}
        </small>
    );
};

export default FormErrorMsg;
