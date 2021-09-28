import { validateEmail } from "./validateEmail";
import { validatePassword } from "./validatePassword";
import { validateUserName } from "./validateUserName";
import { validateName } from "./validation";

const validateInfo = (name, value, values) => {
    let { password, confirmPassword } = values;
    let error = { [name]: {} };

    switch (name) {
        case "firstName":
            if (!value.trim()) {
                error.firstName.msg = "provide your first name";
                error.firstName.status = true;
            } else if (!validateName(value.trim())) {
                error.firstName.msg =
                    "Invalid name!! Name should be letters only!!";
                error.firstName.status = true;
            } else {
                error.firstName.msg = "";
                error.firstName.status = false;
            }
            return error;

        case "lastName":
            if (!value.trim()) {
                error.lastName.msg = "provide last name";
                error.lastName.status = true;
            } else if (!validateName(value.trim())) {
                error.lastName.msg =
                    "Invalid name!! Name should be letters only!!";
                error.lastName.status = true;
            } else {
                error.lastName.msg = "";
                error.lastName.status = false;
            }
            return error;

        case "email":
            if (!value.trim()) {
                error.email.msg = "provide email";
                error.email.status = true;
            } else if (!validateEmail(value.trim())) {
                error.email.msg = "Invalid Email";
                error.email.status = true;
            } else {
                error.email.msg = "";
                error.email.status = false;
            }
            return error;

        case "username":
            if (!value.trim()) {
                error.username.msg = "provide unique username";
                error.username.status = true;
            } else if (value.length < 5) {
                error.username = {
                    msg: "username should be at least 5 chracters long",
                    status: true,
                };
            } else if (!validateUserName(value)) {
                error.username = {
                    msg: "invalid username",
                    status: true,
                };
            } else {
                error.username.msg = "";
                error.username.status = false;
            }
            return error;

        case "password":
            if (!value) {
                error.password.msg = "password is required";
                error.password.status = true;
            } else if (!validatePassword(value)) {
                error.password.msg = "invalid password";
                error.password.status = true;
            } else if (value !== confirmPassword && confirmPassword) {
                error.password.msg = "Passwords do not match";
                error.password.status = true;
            } else if (value === confirmPassword) {
                error.password.msg = "";
                error.password.status = false;
                error.confirmPassword = {
                    msg: "",
                    status: false,
                };
            }
            return error;

        case "confirmPassword":
            if (!value) {
                error.confirmPassword.msg = "Please confirm password";
                error.confirmPassword.status = true;
            } else if (value !== password) {
                error.confirmPassword.msg = "Passwords do not match";
                error.confirmPassword.status = true;
            } else if (!validatePassword(value)) {
                error.confirmPassword.msg = "Invalid Password";
                error.confirmPassword.status = true;
            } else if (value === password) {
                error.confirmPassword.msg = "";
                error.confirmPassword.status = false;

                error.password = {
                    msg: "",
                    status: false,
                };
            }

            return error;

        default:
            break;
    }
};

export default validateInfo;
