const FormFile = ({ name, handleChange }) => {
    return (
        <div className="border-2 border-white py-5 mb-10">
            <input
                type="file"
                id={name}
                name={name}
                className="form__input"
                accept="image/*"
                onChange={handleChange}
            />
            {/* <label htmlFor={name} className="form__label">
                {name}
            </label> */}
        </div>
    );
};

export default FormFile;
