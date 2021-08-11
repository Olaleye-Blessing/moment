import Moment from "./Moment/Moment";

const Moments = ({
    moments,
    deleteMoment,
    handleLikeClicked,
    getUserHasLiked,
}) => {
    return (
        <>
            <section className="">
                {moments.map((moment) => (
                    <Moment
                        key={moment._id}
                        moment={moment}
                        deleteMoment={deleteMoment}
                        getUserHasLiked={getUserHasLiked}
                        handleLikeClicked={handleLikeClicked}
                    />
                ))}
            </section>
        </>
    );
};

export default Moments;
