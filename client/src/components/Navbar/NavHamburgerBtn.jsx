import { GiHamburgerMenu } from "react-icons/gi";
import Button from "../Button/Button";

const NavHamburgerBtn = ({ toggleAsideProfRef }) => {
    return (
        <Button
            onClick={toggleAsideProfRef}
            extraClass="mr-2 btn-icon hover:text-green-secondary flex-shrink-0 sm:hidden text-2xl"
            type="button"
        >
            <GiHamburgerMenu />
        </Button>
    );
};

export default NavHamburgerBtn;
