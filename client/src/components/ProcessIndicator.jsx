const ProcessIndicator = ({ parentExtraClass, childExtraClass }) => {
    return (
        <div
            className={`inline-flex justify-center items-center ${parentExtraClass}`}
        >
            <div
                className={`animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900 ${childExtraClass}`}
            ></div>
        </div>
    );
};

ProcessIndicator.defaultProps = {
    parentExtraClass: "mr-2",
    childExtraClass: "h-4 w-4",
};

export default ProcessIndicator;
