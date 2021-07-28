import Button from "./Button";

const ResetButton = ({ onClick, text }) => (
    <Button
        onClick={onClick}
        extraClass="btn-reset mx-auto"
        text={text}
        disabled={false}
    />
);

ResetButton.defaultProps = {
    text: "Reset",
};

export default ResetButton;
