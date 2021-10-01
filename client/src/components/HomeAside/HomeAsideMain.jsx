import { AiOutlineHome } from "react-icons/ai";
import { FaQuestion } from "react-icons/fa";
import { BsInfoCircle, BsEyeFill } from "react-icons/bs";
import { useMomentContext } from "../../context/MomentsContext";

import { AiOutlineTags } from "react-icons/ai";
import { BsPerson } from "react-icons/bs";

import CloseAsideBtn from "./CloseAsideBtn";
import NotAuthenticatedMessage from "./AsideProfile/NotAuthenticatedMessage";
import AsideListSitePages from "./AsideProfile/AsideListSitePages";
import AsideSiteSocialMedia from "./AsideProfile/AsideSiteSocialMedia";

const HomeAsideMain = () => {
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

    const closeSideBar = () => {
        setShowAsideProfNav(false);
        asideProfRef.current.classList.add("right-full");
        asideProfRef.current.classList.remove("right-0");
        asideProfRef.current.classList.remove("left-0");
    };

    return (
        <>
            {showAsideProfNav && <CloseAsideBtn closeSideBar={closeSideBar} />}
            {!user && <NotAuthenticatedMessage />}
            <div className=" px-3 py-4 sm:bg-black-subtle sm:box-shadow">
                <AsideListSitePages />
                <AsideSiteSocialMedia />
            </div>
            <ul className="box-shadow bg-black-subtle hidden sm:block sm:mt-12">
                <h3>Popular Tags</h3>
            </ul>
        </>
    );
};

export default HomeAsideMain;
