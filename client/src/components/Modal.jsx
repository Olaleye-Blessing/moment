import CloseButton from "./Button/CloseButton";

const Modal = ({ toggleModal, children, title }) => {
    // bg-red
    return (
        <div className=" bg-black-secondary fixed inset-0 z-61 h-screen overflow-hidden px-5 py-8">
            <div className=" bg-black-subtle w-full h-full box-shadow overflow-auto relative max-w-xl mx-auto">
                {/* <button className="" onClick={toggleModal}>
                    X
                </button> */}
                <div className="sticky right-0 top-0 text-right z-90">
                    <CloseButton extraClass="text-xl" onClick={toggleModal} />
                </div>
                <section className="px-5 pb-5" id="style-1">
                    {title && (
                        <h3 className="mb-3 text-center text-lg">{title}</h3>
                    )}
                    {children}
                </section>
            </div>
        </div>
    );
};

Modal.defaultProps = {
    title: "",
};

export default Modal;
