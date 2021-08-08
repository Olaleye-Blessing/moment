import { links } from "./links";
import NavLinkItem from "./NavLinkItem";

const NavSitePagesAction = () => {
    return (
        <ul className="ml-auto flex items-center justify-center space-x-2 fixed bottom-0 left-0 right-0 pt-1 pb-0 border-t border-white sm:border-t-0 sm:relative sm:py-0 sm:ml-auto bg-black-subtle sm:bg-transparent">
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
    );
};

export default NavSitePagesAction;
