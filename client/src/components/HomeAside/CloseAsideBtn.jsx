import CloseButton from "../Button/CloseButton";

const CloseAsideBtn = ({ closeSideBar }) => {
    return (
        <div className=" absolute top-3 right-3">
            <CloseButton
                onClick={closeSideBar}
                extraClass="ml-auto block mb-3 sm:hidden"
            />
        </div>
    );
};

export default CloseAsideBtn;
