import { useEffect, useState } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { FaRegComment } from "react-icons/fa";
import { VscEdit, VscReactions } from "react-icons/vsc";
// import { RiUserFollowLine } from "react-icons/ri";

import LoadingIndicator from "./../../components/LoadingIndicator";
import { useMomentContext } from "./../../context/MomentsContext";
import Avatar from "./../../components/Avatar";
import FormTextArea from "./../../components/Form/FormTextArea";
import { createComment } from "./../../reducer/fetchActions/comment";
import { actions } from "./../../reducer/actions";
import { deletePost, momentDetails } from "./../../reducer/fetchActions/moment";
import MomentTags from "./../../components/Moments/Moment/MomentTags";
import AvatarUserCreatedAt from "./../../components/User/AvatarUserCreatedAt";
import Button from "./../../components/Button/Button";
import ButtonIcon from "./../../components/Button/ButtonIcon";
import ProcessIndicator from "./../../components/ProcessIndicator";

const Moment = () => {
    let history = useHistory();
    let { id } = useParams();
    let { state, dispatch } = useMomentContext();
    const [comment, setComment] = useState("");
    let { moments, user } = state;

    const [moment, setMoment] = useState(null);
    const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(false);
    const [submitComment, setSubmitComment] = useState(false);

    let abortMoment = new AbortController();
    let signal = abortMoment.signal;

    const getMoment = () => moments.find((moment) => moment._id === id) || null;

    const fetchMoment = async () => {
        try {
            let response = await momentDetails(id, signal);
            setMoment(response.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        if (moments.length > 0) {
            setMoment(getMoment());
            setLoading(false);
        } else {
            fetchMoment();
        }
        setMoment(getMoment());

        return () => abortMoment.abort();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (loading) return <LoadingIndicator />;

    // console.log(moment);
    // console.log(state);
    let {
        _id: momentId,
        comments,
        createdAt,
        creator,
        image: momentHeaderImage,
        title,
        message,
        tags,
    } = moment;

    let { profilePic, name, _id: creatorId } = creator;

    tags = [...new Set([...tags])];
    message = message.split("\n").filter((msg) => msg !== "");
    // console.log(message);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let data = {
            comment,
            moment: momentId,
        };

        // console.log(data);
        setSubmitComment(true);
        try {
            // let res = await createComment(JSON.stringify(data));
            let res = await createComment(data);
            // console.log(res);
            dispatch({
                type: actions.CREATE_COMMENT,
                payload: res.data.comment,
            });
            setSubmitComment(false);
        } catch (error) {
            console.info(error);
            setSubmitComment(false);
        }
    };

    const deleteMoment = async (e) => {
        e.stopPropagation();

        dispatch({
            type: actions.DELETE_MOMENT,
            payload: momentId,
        });

        try {
            await deletePost(momentId);
            history.push("/");
        } catch (error) {
            // console.log(error);
        }
    };

    return (
        <div className="px-3 mb-96 mt-6 md:pr-8 lg:pr-16 xl:pr-32  lg:flex lg:gap-4">
            <main className="lg:flex-grow">
                <div className="border border-green-dark rounded-md md:ml-20 overflow-hidden lg:ml-32  xl:ml-44">
                    <div className="">
                        <article className="">
                            {momentHeaderImage && (
                                <figure className="w-full bg-red max-h-96 overflow-hidden">
                                    <img
                                        src={momentHeaderImage}
                                        alt="kk"
                                        className="w-full object-cover object-center max-h-96"
                                    />
                                </figure>
                            )}
                            <div className="px-3 pt-4 md:px-12">
                                <h1 className="text-3xl mb-4">{title}</h1>
                                {tags[0] !== "" && <MomentTags tags={tags} />}
                                <AvatarUserCreatedAt
                                    profilePic={profilePic}
                                    name={name}
                                    userName="kikky"
                                    createdAt={createdAt}
                                    id={creatorId}
                                />

                                {message.map((msg, i) => (
                                    <p
                                        key={msg}
                                        className={`${
                                            i === +message.length - 1
                                                ? "md:mb-4"
                                                : "mb-4"
                                        }`}
                                    >
                                        {msg}
                                    </p>
                                ))}
                            </div>
                        </article>
                        <div className="flex items-center justify-between bg-black-primary sticky bottom-13 mb-4 pt-4 pb-3 px-2 sm:bottom-0 md:fixed md:top-20 md:left-0 md:flex md:flex-col md:justify-start md:gap-6 md:pl-6 md:mb-0 lg:left-9 xl:ml-16">
                            <ul className="flex items-center justify-start gap-4 md:-mt-2 md:gap-4 md:flex-col-reverse">
                                <li>
                                    <Button
                                        extraClass="btn-icon text-sm flex items-center justify-start gap-2 btn-general py-1 px-2 text-white group"
                                        text={comments.length}
                                        onClick={(e) => {}}
                                    >
                                        <VscReactions
                                            className="text-white-secondary group-hover:text-green-secondary"
                                            style={{ fontSize: "20px" }}
                                        />
                                    </Button>
                                </li>
                                <li>
                                    <div className="flex items-center justify-start btn-icon gap-1">
                                        <FaRegComment className="text-white-secondary mr-1" />
                                        <span className="text-base ">2</span>
                                    </div>
                                </li>
                            </ul>
                            <ul className="flex items-center justify-start gap-2 md:flex-col md:gap-4">
                                {user?._id === creator._id ? (
                                    <li>
                                        <ButtonIcon
                                            extraClass="hover:text-red-primary md:text-xl"
                                            icon={<MdDelete />}
                                            onClick={deleteMoment}
                                        />
                                    </li>
                                ) : null}
                                {user?._id === creator._id && (
                                    <li>
                                        <ButtonIcon
                                            icon={<VscEdit />}
                                            extraClass="hover:text-green-primary md:text-xl"
                                            onClick={(e) => {
                                                e.stopPropagation();

                                                // setCurrentMomentId(
                                                //     momentId
                                                // );
                                                history.replace("/moment");
                                            }}
                                        />
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>

                    <section className="py-4 px-5 border-t border-green-dark md:px-12">
                        <h3 id="comments" className="text-xl mb-6">
                            Comments
                            <span className="text-white-secondary pl-1">
                                ({comments.length})
                            </span>
                        </h3>
                        {user ? (
                            <div className="flex gap-2">
                                <Avatar extraClass="bg-black flex-shrink-1 min-w-fg" />
                                <form
                                    className="flex-1"
                                    onSubmit={handleSubmit}
                                >
                                    <FormTextArea
                                        // name="comment"
                                        extraClass="mb-0"
                                        value={comment}
                                        handleChange={(e) =>
                                            setComment(e.target.value)
                                        }
                                        placeholder="write your comment..."
                                    />
                                    <div className="mb-7 mt-6">
                                        <Button
                                            text="comment"
                                            type="submit"
                                            disabled={submitComment}
                                            extraClass={`btn-submit ${
                                                submitComment
                                                    ? "btn-submit-disable"
                                                    : "btn-submit-enable"
                                            }`}
                                        >
                                            {submitComment && (
                                                <ProcessIndicator />
                                            )}
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        ) : (
                            <div>
                                <Link
                                    to="/auth/login"
                                    className="btn nav__link"
                                >
                                    login
                                </Link>{" "}
                                to comment
                            </div>
                        )}

                        {comments.length > 0 && (
                            <ul>
                                {comments.map((comment) => {
                                    console.log(comment);
                                    return (
                                        <li className="mb-7" key={comment._id}>
                                            <AvatarUserCreatedAt
                                                profilePic={
                                                    comment.user.profilePic
                                                }
                                                name={comment.user.name}
                                                userName={comment.user.username}
                                                createdAt={comment.createdAt}
                                                id={comment.user._id}
                                                extraClass="mb-2"
                                            />
                                            <p className="pl-10">
                                                {comment.comment}
                                            </p>
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                    </section>
                </div>
            </main>
            <aside className="mt-5 border border-green-dark rounded-md py-4 px-5 md:ml-20 md:px-12 lg:m-0 lg:min-w-sm lg:px-5 lg:self-start lg:sticky lg:top-24">
                <section>
                    <header>
                        <AvatarUserCreatedAt
                            profilePic={profilePic}
                            name={name}
                            userName="blexxy"
                            createdAt={createdAt}
                            id={creatorId}
                            // extraClass=""
                        />
                    </header>
                    {creator.bio && <p>{creator.bio}</p>}
                    <div>
                        <Button
                            text="Follow"
                            disabled={false}
                            extraClass={`btn-submit btn-submit-enable`}
                        />
                    </div>
                </section>
            </aside>
        </div>

        // <>
        // <div className="" data-page="moment">
        //     <aside>reactions</aside>
        //     <main>
        //         <article className="">
        //             {image && (
        //                 <figure className="">
        //                     <img
        //                         src={image}
        //                         alt="kk"
        //                         className=""
        //                     />
        //                 </figure>
        //             )}

        //             <section className="">
        //                 <h2 className="">{title}</h2>
        //                 <ul className="">
        //                     {tags.map((tag) => (
        //                         <li
        //                             key={tag}
        //                             className=""
        //                         >
        //                             <button
        //                                 type="button"
        //                                 className=""
        //                                 style={{ fontSize: "16px" }}
        //                                 onClick={(e) => {
        //                                     e.stopPropagation();
        //                                     history.push(
        //                                         `/moments/tags/${tag}`
        //                                     );
        //                                 }}
        //                             >
        //                                 {tag}
        //                             </button>
        //                         </li>
        //                     ))}
        //                 </ul>
        //                 <div className="">
        //                     <Avatar
        //                         src={profilePic}
        //                         sub_class=""
        //                     />

        //                     <div>
        //                         {/* <button
        //                             type="button"
        //                             // className="btn moment__creator-name"
        //                             className="btn moment__creator-name link"
        //                             onClick={(e) => {
        //                                 e.stopPropagation();
        //                                 console.log("clicked....");
        //                                 history.push(`/profile/${creator._id}`);
        //                             }}
        //                         >
        //                             {name}
        //                             <span className="moment__creator-username">
        //                                 @kikky
        //                             </span>
        //                         </button> */}
        //                         <UserName
        //                             name={name}
        //                             username={`kiki`}
        //                             id={creator._id}
        //                         />
        //                         {/* <p className="moment__createdAt"> */}
        //                         {/* sunday */}
        //                         {/* time */}
        //                         {/* {humanDate(createdAt)} */}
        //                         {/* </p> */}
        //                     </div>
        //                 </div>
        //             </section>

        //             <section className="">
        //                 {message.map((message) => (
        //                     <p key={message} className="">
        //                         {message}
        //                     </p>
        //                 ))}
        //                 {/* <p className="article__message">{message[0]}</p> */}
        //             </section>

        //             <section className="">
        //                 <h3 id="comments">Comments ({comments.length})</h3>
        //                 {user ? (
        //                     <form
        //                         className=""
        //                         onSubmit={handleSubmit}
        //                     >
        //                         <div>
        //                             {/* <Avatar
        //                                 src={user.profilePic}
        //                                 sub_class="moment__creator-avatar"
        //                             /> */}
        //                             {/* {Boolean(user.profilePic) ? (
        //                                 <Avatar
        //                                     src={profilePic}
        //                                     sub_class="moment__creator-avatar"
        //                                 />
        //                             ) : (
        //                                 <figure className="avatar__icon">
        //                                     <BsPerson />
        //                                 </figure>
        //                             )} */}
        //                             <Avatar sub_class="" />
        //                             <FormTextArea
        //                                 // name="comment"
        //                                 // rows={22}
        //                                 cols={50}
        //                                 value={comment}
        //                                 handleChange={(e) =>
        //                                     setComment(e.target.value)
        //                                 }
        //                                 placeholder="write your comment..."
        //                             />
        //                         </div>
        //                         <FormButton
        //                             text="comment"
        //                             type="submit"
        //                             classname=""
        //                         />
        //                     </form>
        //                 ) : (
        //                     <div>
        //                         <Link
        //                             to="/auth/login"
        //                             className="btn nav__link"
        //                         >
        //                             login
        //                         </Link>{" "}
        //                         to comment
        //                     </div>
        //                 )}
        //             </section>

        //             {comments.length > 0 && (
        //                 <ul className="">
        //                     {comments.map((com) => {
        //                         let { _id, comment, user } = com;
        //                         return (
        //                             <li key={_id} className="">
        //                                 <Avatar src={user.profilePic} />
        //                                 <div>
        //                                     {/* <h6>{user.name}</h6> */}
        //                                     <h6>
        //                                         <UserName
        //                                             name={user.name}
        //                                             username={`kiki`}
        //                                             id={_id}
        //                                         />
        //                                     </h6>
        //                                     <p>{comment}</p>
        //                                 </div>
        //                             </li>
        //                         );
        //                     })}
        //                 </ul>
        //             )}
        //         </article>
        //     </main>
        //     <aside>creator's profile</aside>
        // </div>
    );
};

export default Moment;
