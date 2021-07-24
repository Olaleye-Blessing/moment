import { fetchData } from "../fetchActions";

export const createComment = async (comment) =>
    await fetchData(`/comments`, "POST", undefined, comment);
