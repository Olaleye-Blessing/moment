/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import ProcessIndicator from "../components/ProcessIndicator";
import AvatarUserCreatedAt from "../components/User/AvatarUserCreatedAt";
import { useMomentContext } from "../context/MomentsContext";
import useFiniteScroll from "../hook/useFiniteScroll";
import { uniqueArrayOfObject } from "../utilities/uniqueArrayOfObject";
import Moment from "./../components/Moments/Moments";

const Search = () => {
    let { search } = useLocation();
    let history = useHistory();

    let {
        state: { user },
    } = useMomentContext();

    let authorize = user && Object.keys(user).length > 0;

    let params = new URLSearchParams(search);

    const setUrlPath = (type, period, query) => {
        let loadedUrl = ``;
        let sort = period === "desc" ? "createdAt" : "-createdAt";

        if (!type || type === "moment") {
            loadedUrl += `/moments?`;
            if (query) loadedUrl += `title=${query}&`;
        } else {
            loadedUrl += `/profile?`;
            if (query) loadedUrl += `name=${query}&username=${query}&`;
        }
        loadedUrl += `sort=${sort}&`;
        return loadedUrl;
    };

    const [query, setQuery] = useState(params.get("q") || "");
    const [period, setPeriod] = useState(params.get("period") || "");

    const [type, setType] = useState(params.get("type") || "");

    const [searchUrl, setSearchUrl] = useState(() => {
        return setUrlPath(type, period, query);
    });

    let { loading, data, error } = useFiniteScroll(searchUrl);

    useEffect(() => {
        determineUrl(type, period, query);
    }, [type, period]);

    const determineUrl = (type, period, query) => {
        let loadedUrl = setUrlPath(type, period, query);

        let params = new URLSearchParams();
        if (query) params.set("q", query);
        if (period) params.set("period", period);
        if (type) params.set("type", type);
        history.push({ search: params.toString() });
        setSearchUrl(loadedUrl);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim() === "") return;
        determineUrl(type, period, query);
    };

    const handlePeriodChange = (period) => {
        setPeriod(period);
    };

    const handleTypeChange = (type) => {
        setType(type);
    };

    let periods = [
        { text: "Most relevant", period: "" },
        { text: "Newest", period: "desc" },
        { text: "Oldest", period: "asc" },
    ];

    let types = [
        { text: "Moments", type: "moment" },
        { text: "Users", type: "users" },
    ];

    if (authorize) {
        // types.push({ text: "My Moments Only", type: "personal" });
    }

    if (data) {
        data = [...uniqueArrayOfObject(data, "_id")];
    }
    const displayResult = () => {
        if (!data) return null;

        return (
            <>
                {data.length > 0 ? (
                    type === "users" ? (
                        <ul>
                            {data.map((user) => {
                                return (
                                    <li
                                        key={user._id}
                                        className="list-none w-full box-shadow bg-black-subtle px-6 py-4 mb-8 transition-colors duration-500 cursor-pointer"
                                    >
                                        <Link to={`/profile/${user._id}`}>
                                            <AvatarUserCreatedAt
                                                profilePic={``}
                                                name={user.name}
                                                userName={user.username}
                                                createdAt={user.createdAt}
                                                id={user._id}
                                                extraClass={`w-full`}
                                            />
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    ) : (
                        <Moment moments={data} />
                    )
                ) : null}
                {error && <div className="text-center">{error}</div>}
                {loading && (
                    <div>
                        <ProcessIndicator
                            parentExtraClass="w-full h-80"
                            childExtraClass="w-40 h-40"
                        />
                    </div>
                )}
            </>
        );
        // if (data.length > 0) {
        //     if (type === "moment" || type === "")
        //         return <Moment moments={data} />;
        //     if (type === "users") {
        //         return data.map((user) => {
        //             return (
        //                 <li
        //                     key={user._id}
        //                     className="list-none w-full box-shadow bg-black-subtle px-6 py-4 mb-8 transition-colors duration-500 cursor-pointer"
        //                 >
        //                     <AvatarUserCreatedAt
        //                         profilePic={``}
        //                         name={user.name}
        //                         userName={user.username}
        //                         createdAt={user.createdAt}
        //                         id={user._id}
        //                         extraClass={`w-full`}
        //                     />
        //                 </li>
        //             );
        //         });
        //     }
        // }
        // if (loading)
        //     return (

        //     );

        // if (error) return <div>error</div>;

        // if (data.length === 0) return <div>No result</div>;

        // if (type === "moment" || type === "") return <Moment moments={data} />;

        // if (type === "users") {
        //     return data.map((user) => {
        //         return (
        //             <li
        //                 key={user._id}
        //                 className="list-none w-full box-shadow bg-black-subtle px-6 py-4 mb-8 transition-colors duration-500 cursor-pointer"
        //             >
        //                 <AvatarUserCreatedAt
        //                     profilePic={``}
        //                     name={user.name}
        //                     userName={user.username}
        //                     createdAt={user.createdAt}
        //                     id={user._id}
        //                     extraClass={`w-full`}
        //                 />
        //             </li>
        //         );
        //     });
        // }
    };

    return (
        <main className="mx-auto lg:max-w-4xl">
            <form onSubmit={handleSubmit}>
                <div className="form__control w-full max-w-md mb-6">
                    <input
                        type="search"
                        name="search"
                        id="search"
                        className="form-input focus:ring-2 focus:ring-offset-1 focus:ring-offset-green focus:ring-green-secondary caret-green-primary"
                        placeholder="search"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>
            </form>
            <header className="flex flex-wrap justify-between">
                <h1 className="mr-3 mb-3">Search Result</h1>
                <ul className="flex ">
                    {periods.map(({ text, period: btnPeriod }) => {
                        return (
                            <li key={text} className="first:ml-0 ml-3">
                                <button
                                    onClick={() =>
                                        handlePeriodChange(btnPeriod)
                                    }
                                    type="button"
                                    className={`btn btn-general ${
                                        btnPeriod === period
                                            ? " text-green-secondary bg-black-subtle"
                                            : ""
                                    }`}
                                >
                                    {text}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </header>
            <div className="mt-6 sm:flex">
                <section className="mb-7 max-w-sm sm:min-w-sm sm:max-w-xs sm:mr-5">
                    <ul>
                        {types.map(({ text, type: btnType }) => {
                            return (
                                <li key={text} className={`mt-2 first:mt-0`}>
                                    <button
                                        onClick={() =>
                                            handleTypeChange(btnType)
                                        }
                                        type="button"
                                        className={`btn btn-general w-full text-left ${
                                            type === "" && text === "Moments"
                                                ? "bg-black-subtle text-green-secondary"
                                                : btnType === type
                                                ? "bg-black-subtle text-green-secondary"
                                                : ""
                                        }`}
                                    >
                                        {text}
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </section>
                <section className=" flex-grow">{displayResult()}</section>
            </div>
        </main>
    );
};

export default Search;
