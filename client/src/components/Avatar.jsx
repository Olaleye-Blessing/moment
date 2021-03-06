import { BsPerson } from "react-icons/bs";

const Avatar = ({ src, extraClass, alt, figureWidth }) => {
    return (
        <figure
            className={`flex items-center flex-shrink-0 justify-center rounded-50 ${extraClass} ${figureWidth}`}
        >
            {src ? (
                <img
                    src={src}
                    alt={alt}
                    className="w-9 h-9 rounded-50 align-middle"
                />
            ) : (
                <BsPerson className="text-xl" />
            )}
        </figure>
    );
};

Avatar.defaultProps = {
    extraClass: "",
    src: "",
    alt: "",
    figureWidth: "w-9 h-9",
};

export default Avatar;
