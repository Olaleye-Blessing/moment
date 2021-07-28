const FormButton = ({
    text,
    type,
    classname,
    disabled,
    handleClick,
    children,
}) => {
    return (
        <div className="">
            <button
                className={`bg-red pt-1 pb-2 px-6 rounded`}
                type={type}
                onClick={handleClick}
                disabled={disabled}
            >
                {children}
                {text}
            </button>
        </div>
    );
};

FormButton.defaultProps = {
    handleClick: null,
    disabled: false,
};

export default FormButton;
