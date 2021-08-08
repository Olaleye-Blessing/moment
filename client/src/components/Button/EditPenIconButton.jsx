import { VscEdit } from "react-icons/vsc";
import ButtonIcon from "./ButtonIcon";

const EditPenIconButton = ({ onClick }) => {
    return (
        <ButtonIcon
            icon={<VscEdit />}
            extraClass="hover:text-green-primary"
            onClick={onClick}
        />
    );
};

export default EditPenIconButton;
