import FormValidationIcon from "./FormValidationIcon";

const FormText = ({
    type,
    label,
    name,
    value,
    handleChange,
    placeholder,
    required,
    children,
    handleKeyDown,
    errorClass,
    extraClass,
}) => {
    let getErrorClass = () =>
        errorClass === "valid"
            ? "text-green-primary"
            : errorClass === "invalid"
            ? "text-red"
            : "";
    return (
        <>
            <div className="form__control">
                <label htmlFor={name} className="capitalize">
                    {label || name}
                </label>
                {/* focus:border-blue-300 */}
                <input
                    className={`form-input ${getErrorClass()} ${extraClass}`}
                    type={type}
                    id={name}
                    name={name}
                    placeholder={placeholder || name}
                    value={value}
                    onChange={handleChange}
                    required={required}
                    onKeyDown={handleKeyDown}
                />
                {required && (
                    <span
                        className={`absolute top-0 right-0 inline-block py-1 text-xs  rounded transition duration-200 text-white-secondary font-medium ${getErrorClass()}`}
                    >
                        required
                    </span>
                )}
                {required && <FormValidationIcon type={errorClass} />}
                {children}
            </div>
        </>
    );
};

FormText.defaultProps = {
    type: "text",
    required: false,
    handleKeyDown: null,
    errorClass: "",
    extraClass: "focus:ring-current",
};

export default FormText;
