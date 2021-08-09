/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import AvatarUserCreatedAt from "../components/User/AvatarUserCreatedAt";
import { useMomentContext } from "../context/MomentsContext";
import { getData } from "../reducer/fetchActions";
import Moment from "./../components/Moments/Moments";

// console.clear();
const Search = () => {
    let { search } = useLocation();
    let history = useHistory();

    let {
        state: { user },
    } = useMomentContext();

    let authorize = user && Object.keys(user).length > 0;

    let [query, setQuery] = useState("");
    const [period, setPeriod] = useState("");
    const [type, setType] = useState("");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [result, setResult] = useState([]);

    let fetchAbort = new AbortController();
    let signal = fetchAbort.signal;

    let params = new URLSearchParams();
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (query) params.set("q", query);
        if (period) params.set("period", period);
        if (type) params.set("type", type);

        history.push({ search: params.toString() });
        await fetchQuery();
    };

    const handlePeriodChange = (period) => {
        setPeriod(period);
    };

    const handleTypeChange = (type) => {
        setType(type);
    };

    const fetchQuery = async () => {
        let url = ``;
        let sort = period === "desc" ? "-createdAt" : "createdAt";
        setLoading(true);
        setError(null);
        setResult([]);
        query = query.trim();
        try {
            if (type === "" || type === "moment") {
                if (query) {
                    url += `/moments?title=${query}&sort=${sort}`;
                } else {
                    url += `/moments?sort=${sort}`;
                }
            } else if (type === "users") {
                if (query) {
                    url = `/profile?name=${query}&username=${query}&sort=${sort}`;
                } else {
                    url += `/profile?sort=${sort}`;
                }
            } else if (type === "personal") {
            }
            console.log({ url });
            let result = await getData(url, signal);
            setLoading(false);
            setError(null);
            setResult(result.data);
        } catch (error) {}
    };

    let periods = [
        { text: "Most relevant", period: "" },
        { text: "Newest", period: "desc" },
        { text: "Oldest", period: "asc" },
    ];

    let types = [
        { text: "Moments", type: "moment" },
        { text: "Users", type: "users" },
        // { text: "My Moments Only", type: "personal" },
    ];

    if (authorize) {
        // types.push({ text: "My Moments Only", type: "personal" });
    }

    useEffect(() => {
        let params = new URLSearchParams(search);
        let type = params.get("type");
        let q = params.get("q");
        let period = params.get("period");

        setType(type || "");
        setQuery(q || "");
        setPeriod(period || "");
    }, []);

    useEffect(() => {
        if (query) params.set("q", query);
        if (period) params.set("period", period);
        if (type) params.set("type", type);
        history.push({ search: params.toString() });

        // console.log("rendered");
        fetchQuery();
    }, [period, type]);

    const displayResult = () => {
        if (loading) return <div>Loading....</div>;

        if (error) return <div>error</div>;

        if (result.length === 0) return <div>No result</div>;

        if (type === "moment" || type === "")
            return <Moment moments={result} />;

        if (type === "users") {
            return result.map((user) => {
                return (
                    <li
                        key={user._id}
                        className="list-none w-full box-shadow bg-black-subtle px-6 py-4 mb-8 transition-colors duration-500 cursor-pointer"
                    >
                        <AvatarUserCreatedAt
                            profilePic={``}
                            name={user.name}
                            userName={user.username}
                            createdAt={user.createdAt}
                            id={user._id}
                            extraClass={`w-full`}
                        />
                    </li>
                );
            });
        }
    };

    return (
        <main className="mx-auto lg:max-w-4xl">
            {/* search form */}
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
                <section className=" flex-grow">
                    {/* real result */}

                    {displayResult()}
                </section>
            </div>
        </main>
    );
};

export default Search;
