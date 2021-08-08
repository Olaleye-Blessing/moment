import { AiFillHome } from "react-icons/ai";
import { BsClock } from "react-icons/bs";
import { FiInstagram, FiLinkedin } from "react-icons/fi";
import { GoLocation } from "react-icons/go";
import { ImTwitter } from "react-icons/im";
import { IoSchoolSharp, IoWifiSharp } from "react-icons/io5";
import { MdWork } from "react-icons/md";
import { RiSignalTowerFill } from "react-icons/ri";
import { VscGithubInverted } from "react-icons/vsc";
import humanDate from "../../utilities/humanDate";

export let aboutProfile = (changedProfile) => [
    {
        icon: <MdWork className="text-white-secondary text-lg" />,
        text: `Works at `,
        value: changedProfile.work,
    },
    {
        icon: <IoSchoolSharp className="text-white-secondary text-lg" />,
        text: `Went to `,
        value: changedProfile.education,
    },
    {
        icon: <AiFillHome className="text-white-secondary text-lg" />,
        text: `Lives in `,
        value: changedProfile.lives,
    },
    {
        icon: <GoLocation className="text-white-secondary text-lg" />,
        text: `From `,
        value: changedProfile.hometown,
    },
    {
        icon: <BsClock className="text-white-secondary text-lg" />,
        text: `Joined `,
        value: humanDate(changedProfile.createdAt),
    },
    {
        icon: <IoWifiSharp className="text-white-secondary text-lg" />,
        text: `Followers `,
        value: `200`,
    },
    {
        icon: <RiSignalTowerFill className="text-white-secondary text-lg" />,
        text: `Following `,
        value: `1`,
    },
    {
        icon: <ImTwitter className="text-social-twitter mr-3" />,
        value: changedProfile.twitter,
        link: `https://www.twitter.com/${changedProfile.twitter}`,
        // classStyle: "twitter",
    },
    {
        icon: <VscGithubInverted className="text-social-github mr-3" />,
        value: changedProfile.github,
        link: `https://github.com/${changedProfile.github}`,
        // classStyle: "github",
    },
    {
        icon: <FiInstagram className="text-social-instagram mr-3" />,
        value: changedProfile.instagram,
        link: `https://www.instagram.com/${changedProfile.instagram}`,
        // classStyle: "instagram",
    },
    {
        icon: <FiLinkedin className="text-social-linkedin mr-3" />,
        value: changedProfile.instagram,
        link: `https://www.linkedin.com/${changedProfile.instagram}`,
        // classStyle: "instagram",
    },
];
