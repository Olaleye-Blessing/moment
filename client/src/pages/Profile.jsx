import { Link, NavLink, useLocation, useParams } from "react-router-dom";

import { useMomentContext } from "../context/MomentsContext";
import { AiFillCamera } from "react-icons/ai";
import { MdWork } from "react-icons/md";
import { IoSchoolSharp } from "react-icons/io5";
import { AiFillHome } from "react-icons/ai";
import { GoLocation } from "react-icons/go";
import { BsClock } from "react-icons/bs";
import { IoWifiSharp } from "react-icons/io5";
import { RiSignalTowerFill } from "react-icons/ri";
import { useEffect, useState } from "react";
import FormText from "../components/Form/FormText";
import Modal from "../components/Modal";
import { getProfile, updateAbout } from "../reducer/fetchActions/user";
import { actions } from "../reducer/actions";
import Alert from "../components/Alert";
import { ImTwitter } from "react-icons/im";
import { VscGithubInverted } from "react-icons/vsc";
import { FiInstagram } from "react-icons/fi";
import defaultImage from "./../asset/images/momentDefaultImg.JPG";

// RiSignalTowerFill -- following

const Profile = () => {
    let { pathname } = useLocation();

    let { id } = useParams();
    let { state, dispatch } = useMomentContext();
    let { user, errorAlert } = state;
    const [profileLoading, setProfileLoading] = useState(true);
    const [profileError, setProfileError] = useState(null);
    const [profile, setProfile] = useState(null);
    const [changedProfile, setChangedProfile] = useState(null);

    let abortFetch = new AbortController();
    let abortSignal = abortFetch.signal;

    const changeLoadingAndError = (loading, err = null) => {
        setProfileLoading(loading);
        setProfileError(err);
    };
    const fetchProfile = async () => {
        changeLoadingAndError(true);
        try {
            let { data: profile } = await getProfile(id, abortSignal);
            setProfile(profile);
            setChangedProfile(profile);
            changeLoadingAndError(false);
        } catch (error) {
            changeLoadingAndError(false, error);
        }
    };

    useEffect(() => {
        if (user?._id === id) {
            changeLoadingAndError(false);
            setProfile(user);
            setChangedProfile(user);
            return;
        }
        fetchProfile();

        return () => abortFetch.abort();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);

    const [showModal, setShowModal] = useState(false);

    const onChange = (e) => {
        let { name, value } = e.target;
        setChangedProfile({ ...changedProfile, [name]: value });
    };

    const toggleModal = (state) => {
        setShowModal(state);
        document.body.style.overflowY = state ? "hidden" : "auto";
    };

    const closeModal = () => {
        toggleModal(false);
        setChangedProfile({ ...profile });
    };

    if (profileLoading) {
        return <div>Loading....</div>;
    }

    if (profileError) {
        return <div>Error....</div>;
    }

    let authorize = user?._id === profile._id;
    let userLoggedIn = Boolean(user);

    let about = [
        {
            icon: <MdWork />,
            text: `Works at `,
            value: changedProfile.work,
        },
        {
            icon: <IoSchoolSharp />,
            text: `Went to `,
            value: changedProfile.education,
        },
        {
            icon: <AiFillHome />,
            text: `Lives in `,
            value: changedProfile.lives,
        },
        {
            icon: <GoLocation />,
            text: `From `,
            value: changedProfile.hometown,
        },
        { icon: <BsClock />, text: `Joined `, value: `November 2017` },
        { icon: <IoWifiSharp />, text: `Followers `, value: `200` },
        { icon: <RiSignalTowerFill />, text: `Following `, value: `1` },
        {
            icon: <ImTwitter />,
            value: changedProfile.twitter,
            link: `https://www.twitter.com/${changedProfile.twitter}`,
            classStyle: "twitter",
        },
        {
            icon: <VscGithubInverted />,
            value: changedProfile.github,
            link: `https://github.com/${changedProfile.github}`,
            classStyle: "github",
        },
        {
            icon: <FiInstagram />,
            value: changedProfile.instagram,
            link: `https://www.instagram.com/${changedProfile.instagram}`,
            classStyle: "instagram",
        },
    ];

    const handleSubmitAbout = async (e) => {
        e.preventDefault();
        toggleModal(false);

        //+ in case someone manipulates your code to edit someone's data
        if (!authorize) {
            let message = {
                show: true,
                type: "invalid",
                msg: "you are not authorized to perform this action",
            };
            dispatch({ type: actions.ERROR, payload: message });
            return;
        }

        try {
            dispatch({
                type: actions.UPDATE_USER,
                payload: { ...user, ...changedProfile },
            });
            await updateAbout(user._id, changedProfile);

            //? test revert
            // await updateAbout(`${user._id}k`, changedProfile);
        } catch (error) {
            dispatch({ type: actions.ERROR, payload: error });

            //? revert changes if there is an error
            setChangedProfile({ ...profile });

            dispatch({
                type: actions.UPDATE_USER,
                payload: { ...user, ...profile },
            });
            console.log(error);
        }
    };

    return (
        <>
            {errorAlert.show && <Alert {...errorAlert} />}
            <main data-page="profile">
                <section className="profile__detail-1">
                    <div className="profile__detail-sub">
                        <figure className="user__coverPhoto">
                            <img
                                src={profile.coverPic || defaultImage}
                                alt="hello"
                            />
                            {authorize && (
                                <button className="user__coverPhoto-edit link">
                                    <span className="user__coverPhoto-edit-icon">
                                        <AiFillCamera />
                                    </span>

                                    <span className="user__coverPhoto-edit-text">
                                        edit cover pic
                                    </span>
                                </button>
                            )}
                        </figure>
                        <figure className="user__profilePic">
                            <img
                                src={profile.profilePic || defaultImage}
                                alt="jjj"
                            />
                            {authorize && (
                                <button className="user__profilePic-edit btn">
                                    <span>
                                        <AiFillCamera />
                                    </span>
                                </button>
                            )}
                        </figure>
                    </div>
                    <div className="profile__detail-sub-1">
                        <h2 className="user__name">{profile.name}</h2>
                        <p className="user__bio">{profile.bio}</p>
                        {authorize && (
                            <button className="link user__bio-edit link__noBg-green link__noBg">
                                edit bio
                            </button>
                        )}
                    </div>
                    <div className="profile__settings">
                        {!userLoggedIn ? (
                            <NavLink
                                to="/auth/login"
                                // className="btn btn__link nav__link login"
                                className="link link-white link__extra-pad"
                            >
                                Login
                            </NavLink>
                        ) : authorize ? (
                            <Link
                                to="/settings"
                                // className="link link__noBg link__noBg-green"
                                className="link"
                            >
                                Edit Profile
                            </Link>
                        ) : (
                            <button className="link">follow</button>
                        )}
                    </div>
                </section>

                <section className="profile__detail-2">
                    <div>
                        <section className="box user__about">
                            <h4>About</h4>
                            <ul className="user__about-detail">
                                {about.map(
                                    ({
                                        text,
                                        icon,
                                        value,
                                        link,
                                        classStyle,
                                    }) => {
                                        if (!value) return null;
                                        if (link) {
                                            return (
                                                <li
                                                    key={link}
                                                    className="iconText iconText-string iconText-vertical"
                                                >
                                                    <a
                                                        href={link}
                                                        className={`btn ${classStyle}`}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                    >
                                                        {icon}
                                                        <span>{value}</span>
                                                    </a>
                                                </li>
                                            );
                                        }
                                        return (
                                            <li
                                                key={text}
                                                className="iconText iconText-string iconText-vertical"
                                            >
                                                <span>{icon}</span>
                                                <span>{text}</span>
                                                <span className="user__about-val">
                                                    {value}
                                                </span>
                                            </li>
                                        );
                                    }
                                )}
                                <li>
                                    {authorize && (
                                        <button
                                            className="btn user__about-edit link link__noBg-green link__noBg"
                                            type="button"
                                            onClick={() => {
                                                toggleModal(true);
                                            }}
                                        >
                                            edit about
                                        </button>
                                    )}
                                </li>
                            </ul>
                        </section>
                        {showModal && (
                            <Modal title="Edit About" toggleModal={closeModal}>
                                <form
                                    className="form-aboutDetail"
                                    onSubmit={handleSubmitAbout}
                                >
                                    <section>
                                        <FormText
                                            name="work"
                                            value={changedProfile.work}
                                            handleChange={onChange}
                                            placeholder={`${"your current work"}`}
                                        />
                                        <FormText
                                            name="education"
                                            value={changedProfile.education}
                                            handleChange={onChange}
                                            placeholder={`${"your last/current institution"}`}
                                        />
                                        <FormText
                                            name="lives"
                                            label="current city"
                                            value={changedProfile.lives}
                                            handleChange={onChange}
                                            placeholder={`${"city you are currently in"}`}
                                        />
                                        <FormText
                                            name="hometown"
                                            value={changedProfile.hometown}
                                            handleChange={onChange}
                                            placeholder={`${"your hometown"}`}
                                        />
                                    </section>
                                    <section className="about__social">
                                        <header
                                            className="social__header"
                                            style={{
                                                paddingLeft: "30px",
                                                paddingBottom: "30px",
                                            }}
                                        >
                                            <h5>Social Links</h5>
                                        </header>
                                        <FormText
                                            name="twitter"
                                            value={changedProfile.twitter}
                                            label="twitter"
                                            handleChange={onChange}
                                            placeholder={`${"your twitter handle without '@'"}`}
                                        />
                                        <FormText
                                            name="instagram"
                                            value={changedProfile.instagram}
                                            label="instagram"
                                            handleChange={onChange}
                                            placeholder={`${"your instagram handle without '@'"}`}
                                        />
                                        <FormText
                                            name="github"
                                            value={changedProfile.github}
                                            label="github"
                                            handleChange={onChange}
                                            placeholder={`${"your github username without '@'"}`}
                                        />
                                    </section>
                                    <div>
                                        <button
                                            className="btn danger box"
                                            type="button"
                                            onClick={closeModal}
                                        >
                                            cancel update
                                        </button>
                                        <button
                                            className="btn success box"
                                            type="submit"
                                        >
                                            save
                                        </button>
                                    </div>
                                </form>
                            </Modal>
                        )}

                        <section className="box user__friends">
                            <header className="user__friends-title">
                                <div>
                                    <h4>Friends</h4>
                                    <span className="user__friends-number">
                                        (number of friends)
                                    </span>
                                </div>
                                <button className="btn user__friends-btn box">
                                    view all
                                </button>
                            </header>
                            <ul>
                                <li></li>
                            </ul>
                        </section>
                    </div>
                    <div>moment</div>
                </section>
            </main>
        </>
    );
};

export default Profile;
