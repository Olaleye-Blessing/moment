const Button = ({
    type,
    onClick,
    extraClass,
    children,
    text,
    disabled,
    childClass,
}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`${extraClass} btn`}
            disabled={disabled}
        >
            {children}
            <span className={childClass}>{text}</span>
            {/* {text} */}
        </button>
    );
};

Button.defaultProps = {
    onClick: null,
    type: "button",
    extraClass: "",
    disabled: false,
    childClass: "",
};

export default Button;
