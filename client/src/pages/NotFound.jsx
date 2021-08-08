import { Link } from "react-router-dom";

const NotFound = () => {
    // let location = useLocation();

    return (
        <main className="error-page-cont flex flex-col h-screen items-center justify-center pb-10">
            {/* <h1>404 Error Page #2</h1>
            <p className="zoom-area">
                <b>CSS</b> animations to make a cool 404 page.
            </p> */}
            <section className="error-container text-center font-extrabold  mx-4 mb-16">
                <span className="four inline-block relative rounded-full">
                    <span className="screen-reader-text">4</span>
                </span>
                <span className="zero inline-block relative">
                    <span className="screen-reader-text">0</span>
                </span>
                <span className="four inline-block relative rounded-full">
                    <span className="screen-reader-text">4</span>
                </span>
            </section>
            <div className="text-center">
                {/* <Link to="/" className="more-link"> */}
                <Link
                    to="/"
                    className="btn btn-general btn-submit-enable pt-2 px-6"
                >
                    Go back home
                </Link>
            </div>
        </main>
    );
};

export default NotFound;
