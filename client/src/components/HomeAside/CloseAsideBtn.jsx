import CloseButton from "../Button/CloseButton";

const CloseAsideBtn = ({ closeSideBar }) => {
    return (
        <div className="">
            <CloseButton
                onClick={closeSideBar}
                extraClass="ml-auto block mb-3 sm:hidden"
            />
        </div>
    );
};

export default CloseAsideBtn;
