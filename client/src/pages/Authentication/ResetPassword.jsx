import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Alert from "../../components/Alert";
import FormButton from "../../components/Form/FormButton";
import FormText from "../../components/Form/FormText";
import HomeLogo from "../../components/HomeLogo";
import { useMomentContext } from "../../context/MomentsContext";
import { actions } from "../../reducer/actions";
import { resetPassword } from "../../reducer/fetchActions/auth";

const ResetPassword = () => {
    let history = useHistory();
    let { token } = useParams();
    let { state, dispatch } = useMomentContext();
    let { errorAlert } = state;
    const [data, setData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [disableSubmitBtn, setDisableSubmitBtn] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(data);
        setDisableSubmitBtn(true);

        if (!data.email || !data.password || !data.confirmPassword) {
            setDisableSubmitBtn(false);
            return;
        }

        try {
            let req = await resetPassword(token, data);
            // console.log(req);
            dispatch({ type: actions.AUTHENTICATION, payload: req.user });

            let message = {
                show: true,
                type: "valid",
                msg: "successfully logged in. Redirecting in a second..",
            };
            dispatch({ type: actions.ERROR, payload: message });

            history.replace("/");
        } catch (error) {
            // console.log(error);
            dispatch({ type: actions.ERROR, payload: error });
            setDisableSubmitBtn(false);
        }
    };

    const handleChange = (e) => {
        let { name, value } = e.target;
        setData({ ...data, [name]: value });
    };
    return (
        <section data-form="auth">
            {errorAlert.show && <Alert {...errorAlert} />}
            <h2 className="form__home">
                <HomeLogo />
            </h2>
            <form className="form" onSubmit={handleSubmit}>
                <h2>Change Password</h2>
                <FormText
                    type="email"
                    name="email"
                    value={data.email}
                    // handleChange={(e) => setEmail(e.target.value)}
                    handleChange={handleChange}
                />
                <FormText
                    type="password"
                    name="password"
                    value={data.password}
                    // handleChange={(e) => setEmail(e.target.value)}
                    handleChange={handleChange}
                />
                <FormText
                    type="password"
                    name="confirmPassword"
                    value={data.confirmPassword}
                    // handleChange={(e) => setEmail(e.target.value)}
                    handleChange={handleChange}
                    placeholder="confrim password"
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
        </section>
    );
};

export default ResetPassword;
