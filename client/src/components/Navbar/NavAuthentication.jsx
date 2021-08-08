import NavAuthenticatedUser from "./NavAuthenticatedUser";
import NavNotAuthenticated from "./NavNotAuthenticated";

const NavAuthentication = ({ user, logoutUser }) => {
    return (
        <ul className="flex items-center justify-end gap-2 ml-auto sm:ml-0">
            {user ? (
                <NavAuthenticatedUser user={user} logoutUser={logoutUser} />
            ) : (
                <NavNotAuthenticated />
            )}
        </ul>
    );
};

export default NavAuthentication;
