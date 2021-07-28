/* eslint-disable default-case */
import toast from "react-hot-toast";
import {
    deletedToastNotification,
    updatedToastNotification,
} from "../utilities/Toast";

export const handleToastNotification = (method, message) => {
    switch (method) {
        case "POST":
            toast.success(message);
            break;
        case "PATCH":
            updatedToastNotification("done");
            break;
        case "DELETE":
            deletedToastNotification("deleted");
    }
};
