const FormButton = ({
    text,
    type,
    classname,
    disabled,
    handleClick,
    children,
}) => {
    return (
        <div className="form__control">
            <button
                // className={`form__button btn ${classname}`}
                className={`form__button link ${classname}`}
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
