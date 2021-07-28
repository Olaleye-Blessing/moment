// import { NavLink } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { IoMdNotifications } from "react-icons/io";
import { AiOutlinePlus } from "react-icons/ai";
import { useEffect, useRef } from "react";
import { BsPerson } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";

import HomeLogo from "../HomeLogo";
import Avatar from "../Avatar";
import mjImg from "./../../data/images/mj1.jpg";
import { useMomentContext } from "../../context/MomentsContext";
import { actions } from "../../reducer/actions";
import { logout } from "../../reducer/fetchActions/auth";
// import NavLinkItem from "./NavLinkItem";
// import NavLinkItem from "./NavLinkItem";
import NavLinkItem from "./NavLinkItem";
import Button from "../Button/Button";
import { getData } from "../../reducer/fetchActions";

const Navbar = () => {
    let {
        dispatch,
        state,
        asideProfRef,
        showAsideProfNav,
        setShowAsideProfNav,
    } = useMomentContext();
    console.log(state);

    let { user } = state;

    let links = [
        {
            name: "search",
            active: "false",
            icon: <BsSearch className="" />,
        },
        {
            name: "notification",
            active: "false",
            icon: <IoMdNotifications className="" />,
        },
        {
            name: "moment",
            active: "false",
            icon: <AiOutlinePlus className="" />,
        },
    ];
    const navRef = useRef(null);

    const getCurrentScrollHeight = () => {
        if (navRef.current) {
            let currentWindowScrollHeigth = window.pageYOffset;
            currentWindowScrollHeigth > 20
                ? navRef.current.classList.add("bg-black-subtle")
                : navRef.current.classList.remove("bg-black-subtle");
        }
    };

    useEffect(() => {
        document.addEventListener("scroll", getCurrentScrollHeight);

        return () =>
            document.removeEventListener("scroll", getCurrentScrollHeight);
    }, []);

    const logoutUser = async (e) => {
        // let res = await logout();
        let res = await getData(`/auth/logout`);
        if (res.status === "success") {
            dispatch({ type: actions.LOGOUT, payload: res });
        }
    };

    const toggleAsideProfRef = () => {
        asideProfRef.current.classList.remove("right-full");
        asideProfRef.current.classList.add("right-0");
        asideProfRef.current.classList.add("left-0");

        setShowAsideProfNav(true);
    };

    return (
        <nav
            className="py-3 px-3 sticky top-0 duration-300 z-30 md:px-8 border-b border-green-dark mb-1 lg:px-16 xl:px-32"
            ref={navRef}
        >
            <div className="flex items-center justify-start sm:gap-3">
                {!showAsideProfNav && (
                    <Button
                        onClick={toggleAsideProfRef}
                        extraClass="mr-2 btn-icon hover:text-green-secondary flex-shrink-0 sm:hidden text-2xl"
                        type="button"
                    >
                        <GiHamburgerMenu />
                    </Button>
                )}
                <HomeLogo />
                <ul className="ml-auto flex items-center justify-center gap-2 fixed bottom-0 left-0 right-0 pt-1 pb-0 border-t border-white sm:border-t-0 sm:relative sm:py-0 bg-black-subtle sm:bg-transparent">
                    {links.map((link) => {
                        let { name, icon } = link;
                        return (
                            <li key={name} className="">
                                <NavLinkItem
                                    href={`/${name}`}
                                    extraClass="pt-2 text-2xl"
                                >
                                    {icon}
                                </NavLinkItem>
                            </li>
                        );
                    })}
                </ul>

                <ul className="flex items-center justify-end gap-2 ml-auto sm:ml-0">
                    {user ? (
                        <>
                            <li className="flex-shrink-0">
                                <NavLinkItem
                                    href={`/profile/${user._id}`}
                                    // extraClass="rounded-50 flex items-center justify-center pt-2"
                                    extraClass="rounded-50 btn-icon py-1 px-1"
                                >
                                    <Avatar
                                        sub_class=""
                                        src={user.profilePic}
                                    />
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
                    ) : (
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
                            {/* <li>
                                <NavLink to="/auth/login" className="">
                                    Login
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/auth/signup" className="">
                                    Signup
                                </NavLink>
                            </li> */}
                        </>
                    )}
                    {/* {user ? (
                        <>
                            <li>
                                <NavLink
                                    to={`/profile/${user._id}`}
                                    className=""
                                >
                                    <Avatar
                                        sub_class=""
                                        src={user.profilePic}
                                    />
                                </NavLink>
                            </li>
                            <li>
                                <button className="" onClick={logoutUser}>
                                    Logout
                                </button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <NavLink to="/auth/login" className="">
                                    Login
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/auth/signup" className="">
                                    Signup
                                </NavLink>
                            </li>
                        </>
                    )} */}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
// {/* <li key={name}>
//     <NavLink to={`/${name}`} className={``}>
//         {icon}
//         <span className="">
//             {`${name[0].toUpperCase()}${name.slice(1)}`}
//         </span>
//     </NavLink>
// </li> */}
