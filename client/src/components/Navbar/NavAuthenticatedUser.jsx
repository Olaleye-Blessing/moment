import Avatar from "../Avatar";
import Button from "../Button/Button";
import NavLinkItem from "./NavLinkItem";

const NavAuthenticatedUser = ({ user, logoutUser }) => {
    return (
        <>
            <li className="flex-shrink-0">
                <NavLinkItem
                    href={`/profile/${user._id}`}
                    extraClass="rounded-50 btn-icon py-1 px-1"
                >
                    <Avatar src={user.profilePic} />
                </NavLinkItem>
            </li>
            <li className="">
                <Button
                    text="Logout"
                    extraClass="pl-4 pr-4 bg-green-secondary font-semibold hover:bg-green-secondary"
                    onClick={logoutUser}
                />
            </li>
        </>
    );
};

export default NavAuthenticatedUser;
