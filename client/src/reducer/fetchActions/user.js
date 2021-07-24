import { fetchData } from "../fetchActions";

export const getProfile = async (id, signal) =>
    await fetchData(`/profile/${id}`, "GET", signal);

export const updateAbout = async (id, about) => {
    // let body = { ...about, userEditingId: `${id}l` };
    let body = { ...about, userEditingId: id };
    // console.log(id);

    return await fetchData(
        `/profile/editAbout/${id}`,
        "PATCH",
        undefined,
        body
    );
};
