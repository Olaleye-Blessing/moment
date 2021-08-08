import Moments from "../Moments/Moments";
import ProcessIndicator from "../ProcessIndicator";

const MainContent = ({ moments, loading, error }) => {
    return (
        <main className="sm:w-full lg:max-w-2xl" data-content="moments">
            {moments.length === 0 && loading && (
                <ProcessIndicator
                    parentExtraClass="w-full h-80"
                    childExtraClass="w-40 h-40"
                />
            )}
            {error && <div>Error...</div>}
            {!loading && moments.length < 1 ? (
                <div className="text-center">No moments</div>
            ) : (
                <Moments moments={moments} />
            )}
        </main>
    );
};

/*
{moments.length === 0 && loading && (
                    <ProcessIndicator
                        parentExtraClass="w-full h-80"
                        childExtraClass="w-40 h-40"
                    />
                )}
                {error && <div>Error...</div>}
                {!loading && moments.length < 1 ? (
                    <div className="text-center">No moments</div>
                ) : (
                    <Moments moments={moments} />
                )}
*/

export default MainContent;
