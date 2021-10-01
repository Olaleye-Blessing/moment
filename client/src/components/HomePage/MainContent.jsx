import Moments from "../Moments/Moments";
import ProcessIndicator from "../ProcessIndicator";

const MainContent = ({
    deleteMoment,
    handleLikeClicked,
    loading,
    error,
    moments,
    getUserHasLiked,
    currentMomentPage,
    scrollToMoment,
}) => {
    if (loading === "idle") return null;

    // console.log({ currentMomentPage });

    // console.log({ length: moments.length });
    return (
        <main className="sm:w-full" data-content="moments">
            {moments.length > 0 ? (
                <Moments
                    scrollToMoment={scrollToMoment}
                    moments={moments}
                    deleteMoment={deleteMoment}
                    handleLikeClicked={handleLikeClicked}
                    getUserHasLiked={getUserHasLiked}
                />
            ) : moments.length === 0 && loading === "fetched" ? (
                <div className="text-center">No moments</div>
            ) : null}
            {loading === "fetching" && (
                <ProcessIndicator
                    parentExtraClass="w-full h-80"
                    childExtraClass="w-40 h-40"
                />
            )}
            {loading === "fetched" && error && (
                <div className="text-center mb-3">{error}</div>
            )}
        </main>
    );
    // return (
    //     <main className="sm:w-full" data-content="moments">
    //         {moments.length > 0 ? (
    //             <Moments
    //                 moments={moments}
    //                 deleteMoment={deleteMoment}
    //                 handleLikeClicked={handleLikeClicked}
    //                 getUserHasLiked={getUserHasLiked}
    //             />
    //         ) : moments.length === 0 && !loading ? (
    //             <div className="text-center">No moments</div>
    //         ) : null}
    //         {loading && (
    //             <ProcessIndicator
    //                 parentExtraClass="w-full h-80"
    //                 childExtraClass="w-40 h-40"
    //             />
    //         )}
    //         {!loading && error && (
    //             <div className="text-center mb-3">{error}</div>
    //         )}
    //     </main>
    // );
};

export default MainContent;
