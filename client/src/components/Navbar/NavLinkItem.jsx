// const { NavLink } = require("react-router-dom")
import { NavLink } from "react-router-dom";

const NavLinkItem = ({ href, isActive, children, title, text, extraClass }) => {
    return (
        // <li>
        <NavLink
            to={href}
            // w-full
            className={`${extraClass} btn btn-general`}
            title={title}
        >
            {children}
            {text}
        </NavLink>
        // </li>
    );
};

NavLinkItem.defaultProps = {
    isActive: "",
    extraClass: "",
};

export default NavLinkItem;
