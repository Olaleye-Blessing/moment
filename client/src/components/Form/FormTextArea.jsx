const FormTextArea = ({
    name,
    value,
    handleChange,
    placeholder,
    rows,
    cols,
    extraClass,
}) => {
    return (
        <div className={`form__control ${extraClass}`}>
            {name && (
                <label htmlFor={name} className="capitalize">
                    {name}
                </label>
            )}
            <textarea
                className={`form-input resize-none focus:ring-green-primary w-full`}
                id={name}
                name={name}
                rows={rows}
                cols={cols}
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
            ></textarea>
            {/* <label htmlFor={name} className="form__label">
                {name}
            </label> */}
            {/* {name && (
                <label htmlFor={name} className="form__label">
                    {name}
                </label>
            )} */}
        </div>
    );
};

FormTextArea.defaultProps = {
    extraClass: "",
    placeholder: "place your text here",
    rows: 9,
    cols: 33,
};

export default FormTextArea;
