import Moment from "./Moment/Moment";

const Moments = ({
    moments,
    deleteMoment,
    handleLikeClicked,
    getUserHasLiked,
    scrollToMoment,
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
                        scrollToMoment={scrollToMoment}
                    />
                ))}
            </section>
        </>
    );
};

export default Moments;
