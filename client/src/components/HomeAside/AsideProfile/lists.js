import { AiOutlineHome, AiOutlineTags } from "react-icons/ai";
import { BsEyeFill, BsInfoCircle } from "react-icons/bs";
import { FaQuestion } from "react-icons/fa";

export const lists = [
    {
        text: "Home",
        icon: <AiOutlineHome className="group-hover:text-green-secondary" />,
        link: "/",
    },
    {
        text: "Tags",
        icon: <AiOutlineTags className="group-hover:text-green-secondary" />,
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
