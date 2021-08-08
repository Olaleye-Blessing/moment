// import { NavLink } from "react-router-dom";
// import { BsSearch } from "react-icons/bs";
// import { IoMdNotifications } from "react-icons/io";
// import { AiOutlinePlus } from "react-icons/ai";
import { useEffect, useRef } from "react";
// import { BsPerson } from "react-icons/bs";
// import { GiHamburgerMenu } from "react-icons/gi";

import HomeLogo from "../HomeLogo";
// import Avatar from "../Avatar";
// import mjImg from "./../../data/images/mj1.jpg";
import { useMomentContext } from "../../context/MomentsContext";
import { actions } from "../../reducer/actions";
// import { logout } from "../../reducer/fetchActions/auth";
// import NavLinkItem from "./NavLinkItem";
// import NavLinkItem from "./NavLinkItem";
// import NavLinkItem from "./NavLinkItem";
// import Button from "../Button/Button";
import { getData } from "../../reducer/fetchActions";
// import { links } from "./links";
// import NavAuthenticatedUser from "./NavAuthenticatedUser";
// import NavNotAuthenticated from "./NavNotAuthenticated";
import NavAuthentication from "./NavAuthentication";
import NavSitePagesAction from "./NavSitePagesAction";
import NavHamburgerBtn from "./NavHamburgerBtn";
import { useLocation } from "react-router-dom";

const Navbar = () => {
    // let history = useHistory();
    let { pathname } = useLocation();

    let {
        dispatch,
        state,
        asideProfRef,
        showAsideProfNav,
        setShowAsideProfNav,
    } = useMomentContext();
    // console.log(state);

    let { user } = state;

    const navRef = useRef(null);

    const getCurrentScrollHeight = () => {
        if (navRef.current) {
            let currentWindowScrollHeigth = window.pageYOffset;
            currentWindowScrollHeigth > 20
                ? navRef.current.classList.add("bg-black-subtle")
                : navRef.current.classList.remove("bg-black-subtle");
        }
    };

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

    useEffect(() => {
        document.addEventListener("scroll", getCurrentScrollHeight);

        return () =>
            document.removeEventListener("scroll", getCurrentScrollHeight);
    }, []);

    useEffect(() => {
        if (pathname === "/") setShowAsideProfNav(false);
        // setShowAsideProfNav(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);

    return (
        <nav
            id="mainNav"
            className="py-3 px-3 sticky top-0 duration-300 z-30 md:px-8 border-b border-green-dark mb-1 lg:px-16 xl:px-32"
            ref={navRef}
        >
            <div className="flex items-center justify-start sm:gap-3">
                {!showAsideProfNav && (
                    <NavHamburgerBtn toggleAsideProfRef={toggleAsideProfRef} />
                )}
                <HomeLogo />
                <NavSitePagesAction />
                <NavAuthentication user={user} logoutUser={logoutUser} />
            </div>
        </nav>
    );
};

export default Navbar;
