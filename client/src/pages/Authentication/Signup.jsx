import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import {
//     AiFillExclamationCircle,
//     AiFillCheckCircle,
// } from "react-icons/ai";

import FormFile from "../../components/Form/FormFile";
import FormText from "../../components/Form/FormText";
import useSignUpForm from "../../hook/useSignUpForm";
// import { actions } from "../../reducer/actions";
// import { signup } from "../../reducer/fetchActions";
// import { imagesToBase64 } from "../../utilities/imageToBase64";
import validateInfo from "../../utilities/Form/validateSignUpInfo";
import validatePasswordErrors from "../../utilities/Form/validatePassword";
import ToggleButton from "../../components/ToggleButton";
// import ProcessIndicator from "../../components/ProcessIndicator";
import FormHomeLogo from "../../components/Form/FormHomeLogo";
import FormErrorMsg from "../../components/Form/FormErrorMsg";
// import Button from "../../components/Button/Button";
import FormContainer from "../../components/Form/FormContainer";
import SubmitButton from "../../components/Button/SubmitButton";

const Signup = () => {
    let {
        handleChange,
        handleImageChange,
        values,
        errors,
        handleSubmit,
        touched,
        handleKeyDown,
        disabledSubmitBtn,
        loading,
    } = useSignUpForm(validateInfo);

    const fieldError = (field) => {
        const hasError = errors[field].status;
        const shouldShow = touched[field];
        if (!shouldShow) {
            return "";
        }
        return hasError ? "invalid" : "valid";
    };

    const [passwordConditions, setpasswordConditions] = useState([
        {
            label: "uppercase",
            text: "At least one upper case English letter",
            valid: false,
        },
        {
            label: "lowercase",
            text: "At least one lower case English letter",
            valid: false,
        },
        {
            label: "digit",
            text: "At least one digit",
            valid: false,
        },
        {
            label: "specialCharacter",
            text: "At least one special character",
            valid: false,
        },
        {
            label: "length",
            text: "Minimum of eight characters",
            valid: false,
        },
    ]);

    const [showPswd, setShowPswd] = useState(false);
    const [showConfirmPswd, setShowConfirmPswd] = useState(false);

    useEffect(() => {
        let result = validatePasswordErrors(values.password);

        let pswdConditions = [...passwordConditions];

        pswdConditions = pswdConditions.map((condition) => {
            let { label } = condition;
            let newCond = { ...condition };
            newCond.valid = result[label];
            return newCond;
        });

        setpasswordConditions(pswdConditions);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [values.password]);

    return (
        <section data-form="auth" className="px-4">
            <FormHomeLogo />
            <FormContainer
                onSubmit={handleSubmit}
                headerTitle="Create An Account"
            >
                <FormText
                    name="firstName"
                    label="First Name"
                    placeholder="first name"
                    value={values.firstName}
                    handleChange={handleChange}
                    handleKeyDown={(e) => handleKeyDown(e, "firstName")}
                    errorClass={fieldError("firstName")}
                    required={true}
                >
                    {errors.firstName.status && (
                        <FormErrorMsg text={errors.firstName.msg} />
                    )}
                </FormText>
                <FormText
                    name="lastName"
                    label="last Name"
                    placeholder="last name"
                    value={values.lastName}
                    handleChange={handleChange}
                    handleKeyDown={(e) => handleKeyDown(e, "lastName")}
                    errorClass={fieldError("lastName")}
                    required={true}
                >
                    {errors.lastName.status && (
                        <FormErrorMsg text={errors.lastName.msg} />
                    )}
                </FormText>
                <FormText
                    type="email"
                    name="email"
                    value={values.email}
                    handleChange={handleChange}
                    handleKeyDown={(e) => handleKeyDown(e, "email")}
                    errorClass={fieldError("email")}
                    required={true}
                >
                    {errors.email.status && (
                        <FormErrorMsg text={errors.email.msg} />
                    )}
                </FormText>
                <FormText
                    type="text"
                    name="username"
                    value={values.username}
                    handleChange={handleChange}
                    handleKeyDown={(e) => handleKeyDown(e, "username")}
                    errorClass={fieldError("username")}
                    required={true}
                >
                    {errors.username.status && (
                        <FormErrorMsg text={errors.username.msg} />
                    )}
                </FormText>
                <FormText
                    type={showPswd ? "text" : "password"}
                    name="password"
                    value={values.password}
                    handleChange={handleChange}
                    handleKeyDown={(e) => handleKeyDown(e, "password")}
                    errorClass={fieldError("password")}
                    required={true}
                >
                    <ToggleButton
                        onClick={() => setShowPswd((prev) => !prev)}
                        showPswd={showPswd}
                    />
                    {errors.password.status && (
                        <FormErrorMsg text={errors.password.msg} />
                    )}
                </FormText>
                {fieldError("password") === "invalid" && (
                    <ul className="mb-4">
                        {passwordConditions.map((condition) => {
                            let { label, text, valid } = condition;
                            return (
                                <li
                                    key={label}
                                    className={`text-sm mb-1 transition-colors duration-400 ${
                                        valid
                                            ? "text-green-primary"
                                            : "text-red"
                                    }`}
                                >
                                    {text}
                                </li>
                            );
                        })}
                    </ul>
                )}

                <FormText
                    type={showConfirmPswd ? "text" : "password"}
                    name="confirmPassword"
                    label="Confirm Password"
                    placeholder="confirm password"
                    value={values.confirmPassword}
                    handleChange={handleChange}
                    handleKeyDown={(e) => handleKeyDown(e, "confirmPassword")}
                    errorClass={fieldError("confirmPassword")}
                    required={true}
                >
                    <ToggleButton
                        onClick={() => setShowConfirmPswd((prev) => !prev)}
                        showPswd={showConfirmPswd}
                    />
                    {errors.confirmPassword.status && (
                        <FormErrorMsg text={errors.confirmPassword.msg} />
                    )}
                </FormText>
                <FormFile name="profilePic" handleChange={handleImageChange} />
                {/* <FormButton
                    text="create"
                    type="submit"
                    classname={`form__button-submit ${
                        disabledSubmitBtn ? "disabled" : "not"
                    }`}
                    disabled={disabledSubmitBtn}
                >
                    {loading && <ProcessIndicator />}
                </FormButton> */}
                <div className="text-center mt-14 mb-7">
                    <SubmitButton
                        text="Create My Account"
                        loading={loading}
                        disabled={disabledSubmitBtn}
                    />
                    {/* <Button
                        text="create"
                        type="submit"
                        disabled={disabledSubmitBtn}
                        extraClass={`btn-submit ${
                            disabledSubmitBtn
                                ? "btn-submit-disable"
                                : "btn-submit-enable"
                        }`}
                    >
                        {loading && <ProcessIndicator />}
                    </Button> */}
                </div>
            </FormContainer>
            {/* </form> */}
            <div className="form__alt">
                <p>
                    Already have an account? <Link to="/auth/login">Login</Link>
                </p>
                <p>
                    <Link to="/auth/forgotPassword">Forgot Password?</Link>
                </p>
            </div>
        </section>
    );
};

export default Signup;
