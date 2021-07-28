import { Link, NavLink } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
// import { BiUserPlus } from "react-icons/bi";
import { FaQuestion } from "react-icons/fa";
// import { BsInfoCircle, BsEyeFill, BsPerson } from "react-icons/bs";
import { BsInfoCircle, BsEyeFill } from "react-icons/bs";
import { useMomentContext } from "../../context/MomentsContext";
// import Avatar from "../Avatar";

import { AiOutlineTags } from "react-icons/ai";
import { ImTwitter } from "react-icons/im";
import { VscGithubInverted } from "react-icons/vsc";
import { GrFacebook } from "react-icons/gr";
import { SiLinkedin } from "react-icons/si";
import { BsPerson } from "react-icons/bs";
import NavLinkItem from "../Navbar/NavLinkItem";
import CloseButton from "../Button/CloseButton";

const HomeAsideProfile = () => {
    let { state, asideProfRef, setShowAsideProfNav, showAsideProfNav } =
        useMomentContext();
    let { user } = state;

    let lists = [
        {
            text: "Home",
            icon: (
                <AiOutlineHome className="group-hover:text-green-secondary" />
            ),
            link: "/",
        },
        {
            text: "Tags",
            icon: (
                <AiOutlineTags className="group-hover:text-green-secondary" />
            ),
        },
        {
            text: "FAQ",
            icon: <FaQuestion className="group-hover:text-green-secondary" />,
        },
        {
            text: "About",
            icon: <BsInfoCircle className="group-hover:text-green-secondary" />,
        },
        {
            text: "Terms of Use",
            icon: <BsEyeFill className="group-hover:text-green-secondary" />,
            link: "terms",
        },
    ];

    if (user)
        lists.splice(1, 0, {
            text: "Profile",
            icon: <BsPerson className="group-hover:text-green-secondary" />,
            link: `profile/${user._id}`,
        });

    let socialmedia = [
        {
            icon: <GrFacebook />,
            text: "facebook",
            link: "https://web.facebook.com/blessing.olaleye.378/",
        },
        {
            icon: <ImTwitter />,
            text: "twitter",
            link: "https://twitter.com/OlaleyeBlessin7",
        },
        {
            icon: <VscGithubInverted />,
            text: "github",
            link: "https://github.com/Olaleye-Blessing",
        },
        {
            icon: <SiLinkedin />,
            text: "linkedin",
            link: "https://www.linkedin.com/in/blessing-olaleye-139a22204/",
        },
    ];
    return (
        <>
            {showAsideProfNav && (
                <div className="">
                    <CloseButton
                        onClick={() => {
                            setShowAsideProfNav(false);
                            asideProfRef.current.classList.add("right-full");
                            asideProfRef.current.classList.remove("right-0");
                            asideProfRef.current.classList.remove("left-0");
                        }}
                        extraClass="ml-auto block mb-3 sm:hidden"
                    />
                </div>
            )}
            {!user && (
                <div className="mb-3 py-6 px-3 sm:box-shadow sm:bg-black-subtle sm:pt-6 sm:mb-12">
                    <p className="mb-6">
                        <span>MOMENT</span> is a place of where users can save
                        their special moments for others to see. Users can come
                        back to view and enjoy their old Moments
                    </p>
                    <ul>
                        {/* <li>
                            <NavLink to="/auth/login" className="">
                                Login
                            </NavLink>
                        </li> */}

                        {/* <li>
                            <NavLink to="/auth/signup" className="">
                                Signup
                            </NavLink>
                        </li> */}
                        <li className="mb-4 text-center">
                            <NavLinkItem
                                href="/auth/signup"
                                text="Signup"
                                // title="create new account"
                                extraClass="pl-4 pr-4 bg-green-secondary font-semibold hover:bg-green-secondary w-full"
                            />
                        </li>
                        <li className="text-center">
                            <NavLinkItem
                                href="/auth/login"
                                text="Login"
                                // title="login to your account"
                                extraClass="w-full"
                            />
                        </li>
                    </ul>
                </div>
            )}
            <div className=" px-3 py-4 sm:bg-black-subtle sm:box-shadow">
                <ul className="">
                    {lists.map((list) => {
                        let { text, icon, link } = list;
                        return (
                            <li key={text}>
                                {/* <Link
                                to={text === "Home" ? "/" : `/${link || text}`}
                                className=""
                            >
                                {icon}
                                <span>{text}</span>
                            </Link> */}
                                <NavLinkItem
                                    href={
                                        text === "Home"
                                            ? "/"
                                            : `/${link || text}`
                                    }
                                    // title={text}
                                    extraClass="flex items-center justify-start gap-3 mb-2 pt-2 pb-2 group"
                                >
                                    {icon}
                                    <span className="">{text}</span>
                                </NavLinkItem>
                            </li>
                        );
                    })}
                </ul>
                <ul className="mt-4 flex items-center justify-center gap-6">
                    {socialmedia.map((media) => {
                        let { text, icon, link } = media;
                        return (
                            <li key={text}>
                                <a
                                    href={link}
                                    title={text}
                                    className={`btn btn-general btn-icon p-2 hover:text-green-secondary`}
                                    target="_blank"
                                    rel="noreferrer noopener"
                                >
                                    {icon}
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </div>
            <ul className="box-shadow bg-black-subtle hidden sm:block sm:mt-12">
                <h3>Popular Tags</h3>
            </ul>
        </>
    );
};

export default HomeAsideProfile;
