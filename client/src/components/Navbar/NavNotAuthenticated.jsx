import NavLinkItem from "./NavLinkItem";

const NavNotAuthenticated = () => {
    return (
        <>
            <div>
                <NavLinkItem
                    href="/auth/login"
                    text="Login"
                    title="login to your account"
                />
            </div>
            <div>
                <NavLinkItem
                    href="/auth/signup"
                    text="Signup"
                    title="create new account"
                    extraClass="pl-4 pr-4 bg-green-secondary font-semibold hover:bg-green-secondary"
                />
            </div>
        </>
    );
};

export default NavNotAuthenticated;
