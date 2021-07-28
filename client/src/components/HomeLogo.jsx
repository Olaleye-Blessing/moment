import { NavLink } from "react-router-dom";

const HomeLogo = ({ extraClass }) => {
    return (
        <NavLink to="/" className={`${extraClass} text-xl md:text-3xl`}>
            <div>
                <span className="text-green-secondary">M</span>
                <span className="">O</span>
                <span className="text-green-secondary">M</span>
                <span className="">E</span>
                <span className="text-green-secondary">N</span>
                <span className="">T</span>
                <span className="text-green-secondary">S</span>
            </div>
        </NavLink>
    );
};

HomeLogo.defaultProps = {
    extraClass: "",
};

export default HomeLogo;
