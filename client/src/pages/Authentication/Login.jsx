import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
// import Alert from "../../components/Alert";
import Button from "../../components/Button/Button";
// import FormButton from "../../components/Form/FormButton";
import FormContainer from "../../components/Form/FormContainer";
import FormHomeLogo from "../../components/Form/FormHomeLogo";
import FormText from "../../components/Form/FormText";
import ProcessIndicator from "../../components/ProcessIndicator";
import ToggleButton from "../../components/ToggleButton";
import { useMomentContext } from "../../context/MomentsContext";
import { actions } from "../../reducer/actions";
import { createData } from "../../reducer/fetchActions";
// import { login } from "../../reducer/fetchActions/auth";
// import { login } from "../../reducer/fetchActions";
import SubmitButton from "./../../components/Button/SubmitButton";

const Login = () => {
    let { dispatch } = useMomentContext();
    let history = useHistory();

    const [loading, setLoading] = useState(false);
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        let { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
    };

    const [showPswd, setShowPswd] = useState(false);
    const [disableSubmitBtn, setDisableSubmitBtn] = useState(false);

    const handleSubmit = async () => {
        // e.preventDefault();
        setDisableSubmitBtn(true);
        setLoading(true);
        try {
            // let res = await login(loginData);
            let res = await createData(`/auth/login`, loginData);
            if (res.status === "success") {
                dispatch({ type: actions.AUTHENTICATION, payload: res.user });
                history.replace("/");
            }
        } catch (error) {
            setDisableSubmitBtn(false);
            setLoading(false);
            dispatch({ type: actions.ERROR, payload: error });
        }
    };

    return (
        <section data-form="auth" className="px-4">
            <FormHomeLogo />
            <FormContainer onSubmit={handleSubmit} headerTitle="Sign In">
                <FormText
                    type="email"
                    name="email"
                    value={loginData.email}
                    handleChange={handleChange}
                />
                <FormText
                    type={showPswd ? "text" : "password"}
                    name="password"
                    value={loginData.password}
                    handleChange={handleChange}
                >
                    <ToggleButton
                        onClick={() => setShowPswd((prev) => !prev)}
                        showPswd={showPswd}
                    />
                </FormText>
                <div className="text-center mt-14 mb-7">
                    <SubmitButton
                        text="Login"
                        loading={loading}
                        disabled={disableSubmitBtn}
                    />
                    {/* <Button
                        text="login"
                        type="submit"
                        disabled={disableSubmitBtn}
                        extraClass={`btn-submit ${
                            disableSubmitBtn
                                ? "btn-submit-disable"
                                : "btn-submit-enable"
                        }`}
                    >
                        {loading && <ProcessIndicator />}
                    </Button> */}
                </div>
            </FormContainer>
            <div className="form__alt">
                <p>
                    Don't have an account?{" "}
                    <Link to="/auth/signup">Sign up</Link>
                </p>
                <p>
                    <Link to="/auth/forgotPassword">Forgot Password?</Link>
                </p>
            </div>
        </section>
    );
};

export default Login;
