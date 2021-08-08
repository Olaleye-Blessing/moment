import { Link, useLocation, useParams } from "react-router-dom";

import { useMomentContext } from "../context/MomentsContext";
import { AiFillCamera } from "react-icons/ai";
// import { MdWork } from "react-icons/md";
// import { IoSchoolSharp } from "react-icons/io5";
// import { AiFillHome } from "react-icons/ai";
// import { GoLocation } from "react-icons/go";
// import { BsClock } from "react-icons/bs";
// import { IoWifiSharp } from "react-icons/io5";
// import { RiSignalTowerFill } from "react-icons/ri";
import { useEffect, useState } from "react";
// import FormText from "../components/Form/FormText";
import Modal from "../components/Modal";
import { getProfile, updateAbout } from "../reducer/fetchActions/user";
import { actions } from "../reducer/actions";
// import { ImTwitter } from "react-icons/im";
// import { VscGithubInverted } from "react-icons/vsc";
// import { FiInstagram, FiLinkedin } from "react-icons/fi";
import defaultImage from "./../asset/images/momentDefaultImg.JPG";
import Button from "./../components/Button/Button";
import ButtonIcon from "../components/Button/ButtonIcon";
import Moment from "../components/Moments/Moment/Moment";
import { aboutProfile } from "../components/Profile/utilities";
import FormContainer from "../components/Form/FormContainer";
import ResetButton from "../components/Button/ResetButton";
import SubmitButton from "../components/Button/SubmitButton";
import toast from "react-hot-toast";
import EditAboutFormContent from "../components/Profile/EditAboutFormContent";

// RiSignalTowerFill -- following

const Profile = () => {
    let { pathname } = useLocation();

    let { id } = useParams();
    let { state, dispatch } = useMomentContext();
    let { user } = state;
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
            console.clear();
            console.log(error);
            changeLoadingAndError(false, error);
        }
    };

    useEffect(() => {
        // if (user?._id === id) {
        //     changeLoadingAndError(false);
        //     setProfile(user);
        //     setChangedProfile(user);
        //     return;
        // }
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

    let about = aboutProfile(changedProfile);

    const handleSubmitAbout = async () => {
        // e.preventDefault();
        toggleModal(false);

        //+ in case someone manipulates your code to edit someone's data
        if (!authorize) {
            toast.error("you are not authorized to perform this action");
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
            // dispatch({ type: actions.ERROR, payload: error });
            // toast.error(error);

            //? revert changes if there is an error
            setChangedProfile({ ...profile });

            dispatch({
                type: actions.UPDATE_USER,
                payload: { ...user, ...profile },
            });
            console.log(error);
        }
    };

    let { name, bio, profilePic, coverPic, username, moments } = profile;

    return (
        <>
            <main className="-mt-1 pb-12">
                <section className="mb-6 bg-gradient">
                    <div className="relative">
                        <div className="relative mx-auto max-w-2xl rounded-b-md overflow-hidden">
                            <figure className="h-80 lg:h-96 w-full">
                                <img
                                    className="block mx-auto object-cover object-top w-full "
                                    src={coverPic || profilePic || defaultImage}
                                    alt={`${profile.name} cover`}
                                />
                            </figure>
                            {userLoggedIn ? (
                                authorize ? (
                                    <Button
                                        text="edit cover pic"
                                        extraClass="bg-green-secondary flex items-center justify-center absolute bottom-3 right-3 text-2xl pt-2 hover:bg-opacity-60 sm:text-base sm:pt-1 gap-1 z-10"
                                        childClass="hidden sm:block"
                                    >
                                        <AiFillCamera className="" />
                                    </Button>
                                ) : (
                                    <Button
                                        text="follow"
                                        extraClass="bg-green-secondary absolute bottom-3 right-3 pt-2 hover:bg-opacity-60 text-base sm:pt-1 gap-1 z-10"
                                    />
                                )
                            ) : null}
                        </div>
                        <div className="absolute -bottom-3 trans-x-50 left-1/2 w-32 h-32">
                            <figure className="">
                                <img
                                    className="rounded-50 w-32 h-32 align-middle"
                                    src={coverPic || profilePic || defaultImage}
                                    alt="kkk"
                                />
                            </figure>
                            {authorize && (
                                <ButtonIcon
                                    icon={<AiFillCamera />}
                                    extraClass="bg-green-secondary absolute bottom-1 right-1 rounded-50 p-2 hover:bg-opacity-60 sm:text-base"
                                />
                            )}
                        </div>
                    </div>
                    <header className="px-4 mt-8 mb-3">
                        <h1 className="text-center text-2xl">{name}</h1>
                        <small className="block mx-auto text-center mt-0 text-gray">
                            @{username}
                        </small>
                    </header>
                    {bio && (
                        <div className="px-4 text-center mx-auto max-w-2xl pb-3">
                            <p className="text-center mb-1 text-white text-opacity-90">
                                {bio}
                            </p>
                            {authorize && (
                                <Button
                                    text="edit bio"
                                    extraClass="text-green-secondary text-center mx-auto block hover:underline hover:opacity-90"
                                />
                            )}
                        </div>
                    )}
                    {authorize && (
                        <div className="w-max ml-auto mr-4">
                            <Link
                                to="/settings"
                                className="btn bg-green-secondary hover:bg-opacity-80 pb-1"
                            >
                                Edit Profile
                            </Link>
                        </div>
                    )}
                </section>
                <div className="px-4 sm:flex sm:gap-5 sm:items-start sm:justify-start md:gap-6 max-w-3xl mx-auto">
                    <div className="sm:min-w-sm sm:w-full max-w-xs sm:px-0">
                        <section className="box-shadow bg-black-subtle rounded py-4 px-4">
                            <h4 className="mb-4">About</h4>
                            <ul className="">
                                {about.map(({ text, icon, value, link }) => {
                                    if (!value) return null;
                                    return (
                                        <li
                                            key={link || text}
                                            className="flex items-center justify-start mb-3 gap-3"
                                        >
                                            {link ? (
                                                <a
                                                    href={link}
                                                    className="flex items-center justify-start gap-3 group hover:text-green-secondary"
                                                    target="_blank"
                                                    rel="noreferrer"
                                                >
                                                    {icon}
                                                    {value}
                                                </a>
                                            ) : (
                                                <>
                                                    {icon}
                                                    <p className="text-white text-opacity-80">
                                                        {text}{" "}
                                                        <span className="text-white text-opacity-100 font-semibold">
                                                            {value}
                                                        </span>
                                                    </p>
                                                </>
                                            )}
                                        </li>
                                    );
                                })}
                                {authorize && (
                                    <li className="text-center mt-6">
                                        <Button
                                            text="Edit About"
                                            disabled={false}
                                            extraClass="btn-submit btn-submit-enable w-full text-base"
                                            onClick={() => {
                                                console.log("toggle");
                                                toggleModal(true);
                                            }}
                                        />
                                    </li>
                                )}
                            </ul>
                            {showModal && (
                                <Modal
                                    title="Edit About"
                                    toggleModal={closeModal}
                                >
                                    <FormContainer onSubmit={handleSubmitAbout}>
                                        <EditAboutFormContent
                                            changedProfile={changedProfile}
                                            onChange={onChange}
                                        />
                                        <div className="flex items-center justify-center gap-3">
                                            <ResetButton
                                                onClick={closeModal}
                                                text="Cancel"
                                            />
                                            <SubmitButton text="Save" />
                                        </div>
                                    </FormContainer>
                                    {/* <form
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
                                    </form> */}
                                </Modal>
                            )}
                        </section>
                    </div>
                    <div className="md:mr-auto sm:w-full lg:max-w-2xl">
                        {moments.length > 0 && (
                            <section className="mt-5 sm:mt-0">
                                <ul>
                                    {moments.map((moment) => (
                                        <Moment
                                            key={moment._id}
                                            moment={moment}
                                        />
                                    ))}
                                </ul>
                            </section>
                        )}
                    </div>

                    {/* </section> */}
                </div>
            </main>
            {/* <button
                                            className=""
                                            type="button"
                                            onClick={() => {
                                                toggleModal(true);
                                            }}
                                        >
                                            edit about
                                        </button> */}
            {/* <main data-page="profile">
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
            </main> */}
        </>
    );
};

export default Profile;
