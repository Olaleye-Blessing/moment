import { useEffect, useRef } from "react";

import HomeLogo from "../HomeLogo";
import { useMomentContext } from "../../context/MomentsContext";
import { actions } from "../../reducer/actions";
import { getData } from "../../reducer/fetchActions";
import NavAuthentication from "./NavAuthentication";
import NavSitePagesAction from "./NavSitePagesAction";
import NavHamburgerBtn from "./NavHamburgerBtn";
import { useLocation } from "react-router-dom";

const Navbar = () => {
    let { pathname } = useLocation();

    let {
        dispatch,
        state,
        asideProfRef,
        showAsideProfNav,
        setShowAsideProfNav,
    } = useMomentContext();

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
        setShowAsideProfNav(false);
        asideProfRef.current.classList.add("right-full");
        asideProfRef.current.classList.remove("right-0");
        asideProfRef.current.classList.remove("left-0");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);

    return (
        <nav
            id="mainNav"
            className="py-3 px-3 sticky top-0 duration-300 z-30 md:px-8 border-b border-green-dark mb-1 lg:px-16 xl:px-32"
            ref={navRef}
        >
            <div className="flex items-center justify-start">
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
