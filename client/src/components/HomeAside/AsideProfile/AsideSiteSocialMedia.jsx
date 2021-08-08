import { siteSocialmedia } from "./siteSocialmedia";

const AsideSiteSocialMedia = () => {
    return (
        <ul className="mt-4 flex items-center justify-center space-x-5 flex-wrap">
            {siteSocialmedia.map((media) => {
                let { text, icon, link } = media;
                return (
                    <li key={text} className="flex-shrink-0 flex-grow-0">
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
    );
};

export default AsideSiteSocialMedia;
