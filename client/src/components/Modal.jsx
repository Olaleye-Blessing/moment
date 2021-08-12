import CloseButton from "./Button/CloseButton";

// const Modal = ({ toggleModal, children, title }) => {
//     return (
//         <div className=" bg-black-secondary fixed inset-0 z-61 h-screen overflow-hidden px-5 py-8">
//             <div className=" bg-black-subtle w-full h-full box-shadow overflow-auto relative max-w-xl mx-auto">
//                 <div className="sticky right-0 top-0 text-right z-90">
//                     <CloseButton extraClass="text-xl" onClick={toggleModal} />
//                 </div>
//                 <section className="px-5 pb-5 bg-red" id="style-1">
//                     {title && (
//                         <h3 className="mb-3 text-center text-lg">{title}</h3>
//                     )}
//                     {children}
//                 </section>
//             </div>
//         </div>
//     );
// };
const Modal = ({ toggleModal, children, title }) => {
    return (
        <div className=" bg-black-secondary fixed inset-0 z-61 h-screen overflow-hidden px-5 py-8">
            <div className=" bg-black-subtle w-full h-full box-shadow relative max-w-xl mx-auto flex flex-col">
                <div className="absolute right-2 top-2 text-right z-90">
                    <CloseButton
                        extraClass="text-xl text-opacity-30 hover:text-opacity-50 hover:text-red-subtle"
                        onClick={toggleModal}
                    />
                </div>
                {title && (
                    <h3 className="pl-5 pt-2 pb-3 border-green-dark border-b">
                        {title}
                    </h3>
                )}
                <section
                    className="px-5 pb-5 pt-3 overflow-auto h-full"
                    id="style-1"
                >
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
