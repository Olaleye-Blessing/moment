import { MdDelete } from "react-icons/md";
import ButtonIcon from "./ButtonIcon";

const DeleteBasketButton = ({ onClick }) => {
    return (
        <ButtonIcon
            extraClass="hover:text-red-primary"
            icon={<MdDelete />}
            onClick={onClick}
        />
    );
};

export default DeleteBasketButton;
