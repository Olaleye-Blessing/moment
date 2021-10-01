import { Link, useLocation, useParams } from "react-router-dom";

import { useMomentContext } from "../context/MomentsContext";
import { AiFillCamera } from "react-icons/ai";
import { useEffect, useState } from "react";
import Modal from "../components/Modal";
import { getProfile, updateAbout } from "../reducer/fetchActions/user";
import { actions } from "../reducer/actions";
import defaultImage from "./../asset/images/momentDefaultImg.JPG";
import Button from "./../components/Button/Button";
import ButtonIcon from "../components/Button/ButtonIcon";
import { aboutProfile } from "../components/Profile/utilities";
import FormContainer from "../components/Form/FormContainer";
import ResetButton from "../components/Button/ResetButton";
import SubmitButton from "../components/Button/SubmitButton";
import toast from "react-hot-toast";
import EditAboutFormContent from "../components/Profile/EditAboutFormContent";
import Moments from "../components/Moments/Moments";
import { deletePost } from "../reducer/fetchActions/moment";
import { deletedToastNotification } from "../utilities/Toast";
import { updateData } from "../reducer/fetchActions";
import { handleLikeMoment } from "../utilities/Moment/handleLikeMoment";
import getUserHasLiked from "../utilities/Moment/getUserHasLiked";
import ProcessIndicator from "../components/ProcessIndicator";
import { getUserIsFollowing } from "../utilities/Profile/getUserIsFollowing";

const Profile = () => {
    let { pathname } = useLocation();

    let { id } = useParams();
    let { state, dispatch } = useMomentContext();
    let { user } = state;
    const [profileLoading, setProfileLoading] = useState(true);
    const [profileError, setProfileError] = useState(null);
    const [profile, setProfile] = useState(null);
    const [changedProfile, setChangedProfile] = useState(null);
    const [allUserMoments, setAllUserMoments] = useState([]);

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
            setAllUserMoments(profile.moments);
        } catch (error) {
            console.clear();
            console.log(error);
            changeLoadingAndError(false, error.message);
        }
    };

    useEffect(() => {
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
        return (
            <ProcessIndicator
                parentExtraClass="w-full h-80"
                childExtraClass="w-40 h-40"
            />
        );
    }

    if (profileError) {
        return <div>Error....</div>;
    }

    let authorize = user?._id === profile._id;
    let userLoggedIn = Boolean(user);

    let about = aboutProfile(changedProfile);

    const handleSubmitAbout = async () => {
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

    const deleteMoment = async (moment) => {
        // delete moment visually from profile page
        let updatedMoment = [...allUserMoments].filter(
            (userMoment) => userMoment._id !== moment._id
        );
        setAllUserMoments(updatedMoment);

        // delete moment from lists of context moment if present
        dispatch({
            type: actions.DELETE_MOMENT,
            payload: moment._id,
        });

        try {
            await deletePost(moment._id);
            deletedToastNotification("successfully deleted");
        } catch (error) {
            console.log(error);
        }
    };

    const handleLikeClicked = async (moment) => {
        let result = handleLikeMoment(user, moment);

        if (!result) return;

        let resultedMoment = result.moment;
        dispatch({ type: actions.LIKE_MOMENT, payload: resultedMoment });

        let newLikedMoment = [...allUserMoments].map((userMoment) =>
            userMoment._id === resultedMoment._id ? resultedMoment : userMoment
        );

        setAllUserMoments(newLikedMoment);

        try {
            await updateData(`/moments/like/${resultedMoment._id}`, {});
        } catch (error) {
            console.log(error);
        }
    };
    const handleFollow = async () => {
        // get the logged-in user and the person they want to follow ids
        let userId = user._id;
        let followingId = profile._id;

        try {
            let result = await updateData(`/profile/follow`, {
                followingId,
                userEditingId: userId,
            });
            let { profileResult, userResult } = result.data;

            user = { ...user, following: userResult.following };

            // update logged in user profile
            dispatch({
                type: actions.UPDATE_USER,
                payload: user,
            });

            // update the profile user is viewing
            setChangedProfile({
                ...changedProfile,
                followers: profileResult.followers,
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <main className="-mt-1 pb-12">
                <section className="mb-6 bg-gradient">
                    <div className="relative">
                        <div className="relative mx-auto max-w-2xl rounded-b-md overflow-hidden">
                            <figure className="h-80 lg:h-96 w-full">
                                <img
                                    className="block mx-auto object-cover object-top w-full h-full"
                                    src={coverPic || profilePic || defaultImage}
                                    alt={`${profile.name} cover`}
                                />
                            </figure>
                            {userLoggedIn ? (
                                authorize ? (
                                    <Button
                                        text="edit cover pic"
                                        extraClass="bg-green-secondary flex items-center justify-center absolute bottom-3 right-3 text-2xl pt-2 hover:bg-opacity-60 sm:text-base sm:pt-1 space-x-1 z-10"
                                        childClass="hidden sm:block"
                                    >
                                        <AiFillCamera className="" />
                                    </Button>
                                ) : (
                                    <Button
                                        onClick={handleFollow}
                                        text={
                                            getUserIsFollowing(
                                                user,
                                                user.following,
                                                profile._id
                                            )
                                                ? "unfollow"
                                                : "follow"
                                        }
                                        extraClass="bg-green-secondary absolute bottom-3 right-3 pt-2 hover:bg-opacity-60 text-base sm:pt-1 space-x-1 z-10"
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
                        <h1 className="text-center">{name}</h1>
                        <small className="block mx-auto text-center -mt-2 text-gray text-sm">
                            @{username}
                        </small>
                    </header>
                    <div className={`px-4 text-center mx-auto max-w-2xl pb-3`}>
                        <p className="text-center mb-1 text-white text-opacity-90">
                            {bio || "No bio"}
                        </p>
                        {authorize && (
                            <Button
                                text="edit bio"
                                extraClass="text-green-secondary text-center mx-auto block hover:underline hover:opacity-90"
                            />
                        )}
                    </div>

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
                <div className="px-4 sm:flex sm:gap-5 sm:items-start sm:justify-start md:gap-6 max-w-4xl mx-auto">
                    <div className="sm:min-w-sm sm:w-full sm:px-0 sm:sticky sm:top-20">
                        <section className="box-shadow bg-black-subtle rounded py-4 px-4">
                            <h4 className="mb-4">About</h4>
                            <ul className="">
                                {about.map(({ text, icon, value, link }) => {
                                    if (
                                        text !== "Followers " &&
                                        text !== "Following " &&
                                        !value
                                    )
                                        return null;
                                    return (
                                        <li
                                            key={link || text}
                                            className="flex items-center justify-start mb-3 space-x-3"
                                        >
                                            {link ? (
                                                <a
                                                    href={link}
                                                    className="flex items-center justify-start group hover:text-green-secondary"
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
                        </section>
                    </div>
                    <div className="md:mr-auto sm:w-full lg:max-w-2xl">
                        {moments.length > 0 && (
                            <section className="mt-5 sm:mt-0">
                                <ul>
                                    <Moments
                                        moments={allUserMoments}
                                        deleteMoment={deleteMoment}
                                        getUserHasLiked={getUserHasLiked}
                                        handleLikeClicked={handleLikeClicked}
                                    />
                                </ul>
                            </section>
                        )}
                    </div>
                </div>
            </main>
            {showModal && (
                <Modal title="Edit About" toggleModal={closeModal}>
                    <FormContainer onSubmit={handleSubmitAbout}>
                        <EditAboutFormContent
                            changedProfile={changedProfile}
                            onChange={onChange}
                        />
                        <div className="flex items-center justify-center">
                            <ResetButton onClick={closeModal} text="Cancel" />
                            <SubmitButton text="Save" />
                        </div>
                    </FormContainer>
                </Modal>
            )}
        </>
    );
};

export default Profile;
