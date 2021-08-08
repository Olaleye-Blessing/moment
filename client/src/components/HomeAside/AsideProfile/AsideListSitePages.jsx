import NavLinkItem from "../../Navbar/NavLinkItem";
import { lists } from "./lists";

const AsideListSitePages = () => {
    return (
        <ul className="">
            {lists.map((list) => {
                let { text, icon, link } = list;
                return (
                    <li key={text}>
                        <NavLinkItem
                            href={text === "Home" ? "/" : `/${link || text}`}
                            extraClass="flex items-center justify-start space-x-3 mb-2 pt-2 pb-2 group"
                        >
                            {icon}
                            <span className="">{text}</span>
                        </NavLinkItem>
                    </li>
                );
            })}
        </ul>
    );
};

export default AsideListSitePages;
