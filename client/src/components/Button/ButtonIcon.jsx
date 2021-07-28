import Button from "./Button";

const ButtonIcon = ({ onClick, extraClass, icon }) => (
    <Button
        onClick={onClick}
        extraClass={`${extraClass} btn-icon p-1 btn-general`}
    >
        {icon}
    </Button>
);

ButtonIcon.defaultProps = {
    extraClass: "",
};

export default ButtonIcon;
