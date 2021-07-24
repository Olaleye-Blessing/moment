const Modal = ({ toggleModal, children, title }) => {
    return (
        <div className="modal-overshadow">
            <section className="box modal scrollbar" id="style-1">
                <button className="modal__close btn box" onClick={toggleModal}>
                    X
                </button>
                {title && <h4 className="modal__title">{title}</h4>}
                {children}
            </section>
        </div>
    );
};

Modal.defaultProps = {
    title: "",
};

export default Modal;
