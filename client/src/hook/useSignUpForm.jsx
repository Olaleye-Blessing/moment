import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useMomentContext } from "../context/MomentsContext";
import { actions } from "../reducer/actions";
import { createData } from "../reducer/fetchActions";
// import { signup } from "../reducer/fetchActions/auth";
// import { signup } from "../reducer/fetchActions";
import { preventUnnecessaryKeys } from "../utilities/Form/preventUnnecessaryKeys";
// import { imagesToBase64 } from "../utilities/imageToBase64";

const useSignUpForm = (validate) => {
    let history = useHistory();
    let { dispatch } = useMomentContext();
    const [loading, setLoading] = useState(false);

    const [values, setValues] = useState({
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
        // profilePic: "",
    });

    // const [errors, setErrors] = useState({});
    const [errors, setErrors] = useState({
        firstName: { msg: "", status: true },
        lastName: { msg: "", status: true },
        email: { msg: "", status: true },
        username: { msg: "", status: true },
        password: { msg: "", status: true },
        confirmPassword: { msg: "", status: true },
        // profilePic: { msg: "", status: true },
    });

    const [disabledSubmitBtn, setDisabledSubmitBtn] = useState(true);

    useEffect(() => {
        setDisabledSubmitBtn(
            Object.keys(errors).some((field) => errors[field].status === true)
        );
    }, [errors]);

    const handleChange = (e) => {
        let { name, value } = e.target;

        setValues({
            ...values,
            [name]: value,
        });

        setErrors({
            ...errors,
            ...validate(name, value, values),
        });
    };

    // const handleImageChange = async (e) => {
    //     let image = await imagesToBase64(e);
    //     image = image[0];
    //     // setSignUpData({ ...signUpData, profilePic: image });
    //     setValues({ ...values, profilePic: image });
    // };

    const [touched, setTouched] = useState({
        firstName: false,
        lastName: false,
        email: false,
        username: false,
        password: false,
        confirmPassword: false,
        profilePic: false,
    });

    const handleKeyDown = (e, name) => {
        if (!preventUnnecessaryKeys(e)) return;
        setTouched({ ...touched, [name]: true });
    };

    const handleSubmit = async () => {
        // e.preventDefault();
        setDisabledSubmitBtn(true);
        setLoading(true);

        try {
            let res = await createData(`/auth/signup`, values);
            if (res.status === "success") {
                dispatch({ type: actions.AUTHENTICATION, payload: res.user });
                toast.success(
                    `Account created successfully! An activation link has been sent to ${values.email}.`
                );
                history.replace("/");
            }
        } catch (error) {
            // dispatch({ type: actions.ERROR, payload: error });
            setDisabledSubmitBtn(false);
            setLoading(false);
        }
    };

    return {
        handleChange,
        // handleImageChange,
        values,
        errors,
        handleSubmit,
        touched,
        handleKeyDown,
        disabledSubmitBtn,
        loading,
    };
};

export default useSignUpForm;
