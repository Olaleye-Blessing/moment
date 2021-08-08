// import { useMomentContext } from "../../context/MomentsContext";
import FormText from "../../components/Form/FormText";
import { useState } from "react";
import { Link } from "react-router-dom";
// import { forgetPassword } from "../../reducer/fetchActions/auth";
// import { actions } from "../../reducer/actions";
import FormHomeLogo from "../../components/Form/FormHomeLogo";
import FormContainer from "../../components/Form/FormContainer";
// import Button from "../../components/Button/Button";
import { createData } from "../../reducer/fetchActions";
import SubmitButton from "../../components/Button/SubmitButton";

const ForgetPassword = () => {
    // let { dispatch } = useMomentContext();

    const [email, setEmail] = useState("");
    const [disableSubmitBtn, setDisableSubmitBtn] = useState(false);

    const handleSubmit = async () => {
        // e.preventDefault();
        console.log("submitted.....");
        setDisableSubmitBtn(true);

        if (!email) {
            setDisableSubmitBtn(false);
            return;
        }

        try {
            // let res = await forgetPassword({ email });
            let res = await createData(`/auth/forgetPassword`, { email });
            console.log(res);

            // let message = {
            //     show: true,
            //     type: "valid",
            //     msg: res.data.message,
            // };

            // dispatch({ type: actions.ERROR, payload: message });
        } catch (error) {
            // dispatch({ type: actions.ERROR, payload: error });
        }
        setDisableSubmitBtn(false);
    };

    return (
        <section data-form="auth" className="px-4">
            <FormHomeLogo />
            <FormContainer onSubmit={handleSubmit} headerTitle="Sign In">
                <FormText
                    type="email"
                    name="email"
                    value={email}
                    handleChange={(e) => setEmail(e.target.value)}
                />
                <div className="text-center mt-14 mb-7">
                    <SubmitButton
                        text="Request Reset"
                        loading={disableSubmitBtn}
                        disabled={disableSubmitBtn}
                    />
                </div>
            </FormContainer>
            <div className="form__alt">
                <p>
                    Don't have an account?{" "}
                    <Link to="/auth/signup">Sign up</Link>
                </p>
                <p>
                    <Link to="/auth/login">Remember Password?</Link>
                </p>
            </div>
        </section>
    );
};

export default ForgetPassword;
