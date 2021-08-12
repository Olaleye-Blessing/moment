import { NavLink } from "react-router-dom";

const NavLinkItem = ({ href, children, title, text, extraClass }) => {
    return (
        <NavLink
            to={href}
            className={`${extraClass} btn btn-general`}
            title={title}
            activeClassName="text-green-primary"
            exact
        >
            {children}
            {text}
        </NavLink>
    );
};

NavLinkItem.defaultProps = {
    extraClass: "",
};

export default NavLinkItem;
