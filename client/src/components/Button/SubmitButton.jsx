import ProcessIndicator from "../ProcessIndicator";
import Button from "./Button";

const SubmitButton = ({ loading, disabled, text }) => (
    <Button
        type="submit"
        extraClass={`btn-submit ${
            disabled ? "btn-submit-disable" : "btn-submit-enable"
        }`}
        text={text}
        disabled={disabled}
    >
        {loading && <ProcessIndicator />}
    </Button>
);

export default SubmitButton;
