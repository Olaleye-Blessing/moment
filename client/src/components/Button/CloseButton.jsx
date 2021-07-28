import Button from "./Button";
import { VscChromeClose } from "react-icons/vsc";

const CloseButton = ({ onClick, extraClass }) => {
    return (
        <Button
            onClick={onClick}
            extraClass={`${extraClass} bg-red-subtle hover:bg-red hover:opacity-80 text-white btn-icon rounded-50 p-1`}
        >
            <VscChromeClose />
        </Button>
    );
};

export default CloseButton;
