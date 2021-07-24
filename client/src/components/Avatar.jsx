import { BsPerson } from "react-icons/bs";

const Avatar = ({ src, sub_class, alt }) => {
    // console.log(src);
    return (
        // <figure className={`avatar__img-cont ${sub_class}`}>
        <figure className={`avatar ${sub_class}`}>
            {/* {src ? (
                <img src={src} alt="user" className="avatar__img" />
            ) : (
                <BsPerson />
            )} */}
            {src ? <img src={src} alt={alt} /> : <BsPerson />}
        </figure>
    );
};

Avatar.defaultProps = {
    sub_class: "",
    src: "",
    alt: "",
};

export default Avatar;
