import toast from "react-hot-toast";

// ✨
// export const newToastNotification = (msg) => {
//     toast.success(msg, )
// };

// 👏
export const updatedToastNotification = (msg) => {
    toast.success(msg, {
        icon: "👏",
    });
};

// 🥺
export const deletedToastNotification = (msg) => {
    toast.error(msg, {
        icon: "🥺",
    });
};

export const errorToastNotification = () => {};
