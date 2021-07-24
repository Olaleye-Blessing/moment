import Alert from "../../components/Alert";
import { useMomentContext } from "../../context/MomentsContext";
import HomeLogo from "../../components/HomeLogo";
import FormText from "../../components/Form/FormText";
import { useState } from "react";
import FormButton from "../../components/Form/FormButton";
import { Link } from "react-router-dom";
import { forgetPassword } from "../../reducer/fetchActions/auth";
import { actions } from "../../reducer/actions";

const ForgetPassword = () => {
    let { state, dispatch } = useMomentContext();
    let { errorAlert } = state;

    const [email, setEmail] = useState("");
    const [disableSubmitBtn, setDisableSubmitBtn] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("submitted.....");
        setDisableSubmitBtn(true);

        if (!email) {
            setDisableSubmitBtn(false);
            return;
        }

        try {
            let res = await forgetPassword({ email });

            let message = {
                show: true,
                type: "valid",
                msg: res.data.message,
            };

            dispatch({ type: actions.ERROR, payload: message });
        } catch (error) {
            dispatch({ type: actions.ERROR, payload: error });
        }
        setDisableSubmitBtn(false);
    };

    return (
        <section data-form="auth">
            {errorAlert.show && <Alert {...errorAlert} />}
            <h2 className="form__home">
                <HomeLogo />
            </h2>
            <form className="form" onSubmit={handleSubmit}>
                <h2>Request Password Reset</h2>
                <FormText
                    type="email"
                    name="email"
                    value={email}
                    handleChange={(e) => setEmail(e.target.value)}
                />

                <FormButton
                    text="send"
                    type="submit"
                    classname={`form__button-submit ${
                        disableSubmitBtn ? "disabled" : ""
                    }`}
                    disabled={disableSubmitBtn}
                />
            </form>
            <p className="form__other">
                Don't have an account? <Link to="/auth/signup">Sign up</Link>
            </p>
            <p className="form__other">
                <Link to="/auth/login">Remember Password?</Link>
            </p>
        </section>
    );
};

export default ForgetPassword;
