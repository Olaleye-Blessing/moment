import CloseButton from "../Button/CloseButton";

const CloseAsideBtn = ({ closeSideBar }) => {
    return (
        <div className=" absolute top-3 right-3">
            <CloseButton
                onClick={closeSideBar}
                extraClass="ml-auto block mb-3 sm:hidden bg-red-subtle hover:bg-red hover:opacity-80"
            />
        </div>
    );
};

export default CloseAsideBtn;
