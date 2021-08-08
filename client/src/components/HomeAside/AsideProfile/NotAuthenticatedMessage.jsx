import NavLinkItem from "../../Navbar/NavLinkItem";

const NotAuthenticatedMessage = () => {
    return (
        <div className="mb-3 py-6 px-3 sm:box-shadow sm:bg-black-subtle sm:pt-6 sm:mb-12">
            <p className="mb-6">
                <span>MOMENT</span> is a place of where users can save their
                special moments for others to see. Users can come back to view
                and enjoy their old Moments
            </p>
            <ul>
                <li className="mb-4 text-center">
                    <NavLinkItem
                        href="/auth/signup"
                        text="Signup"
                        extraClass="pl-4 pr-4 bg-green-secondary font-semibold hover:bg-green-secondary w-full"
                    />
                </li>
                <li className="text-center">
                    <NavLinkItem
                        href="/auth/login"
                        text="Login"
                        extraClass="w-full"
                    />
                </li>
            </ul>
        </div>
    );
};

export default NotAuthenticatedMessage;
