import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import FormContainer from "../../components/Form/FormContainer";
import FormFile from "../../components/Form/FormFile";
import FormText from "../../components/Form/FormText";
import FormTextArea from "../../components/Form/FormTextArea";
import { useMomentContext } from "../../context/MomentsContext";
import { actions } from "../../reducer/actions";
import { createData, updateData } from "../../reducer/fetchActions";
import { imagesToBase64 } from "../../utilities/imageToBase64";
import { updatedToastNotification } from "../../utilities/Toast";
import SubmitButton from "../../components/Button/SubmitButton";
import Button from "../../components/Button/Button";
import ResetButton from "../../components/Button/ResetButton";

const AddMoment = () => {
    let history = useHistory();

    let { state, dispatch, currentMomentId, setCurrentMomentId } =
        useMomentContext();

    const [loading, setLoading] = useState(false);
    const [momentData, setMomentData] = useState({
        title: "",
        message: "",
        tags: "",
        image: "",
    });
    const [defaultMomentData, setDefaultMomentData] = useState({
        ...momentData,
    });

    console.log(defaultMomentData);
    let { moments } = state;
    let moment = currentMomentId
        ? moments.find((moment) => moment._id === currentMomentId)
        : null;

    useEffect(() => {
        if (moment) {
            setMomentData({ ...moment, tags: moment.tags.join(" ") });
            setDefaultMomentData({ ...moment, tags: moment.tags.join(" ") });
        }
    }, [moment]);

    useEffect(() => {
        return () => {
            reset();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleChange = (e) => {
        let { name, value } = e.target;
        setMomentData({ ...momentData, [name]: value });
    };

    const handleImageChange = async (e) => {
        let image = await imagesToBase64(e);
        image = image[0];
        setMomentData({ ...momentData, image });
    };

    const handleSubmit = async () => {
        // e.preventDefault();
        setLoading(true);

        const handleMomentSubmission = async () => {
            try {
                if (currentMomentId) {
                    let { moment } = await updateData(
                        `/moments/${currentMomentId}`,
                        {
                            id: currentMomentId,
                            ...momentData,
                        }
                    );

                    dispatch({ type: actions.UPDATE_MOMENT, payload: moment });
                    updatedToastNotification("moment updated");
                } else {
                    let { moment } = await createData(`/moments`, momentData);
                    dispatch({ type: actions.CREATE_MOMENT, payload: moment });
                    toast.success("moment created");
                }

                // reset();
                history.replace("/");
            } catch (error) {
                setLoading(false);
                console.log(error);
            }
        };

        handleMomentSubmission();
    };

    const reset = () => {
        // setCurrentMomentId(null);
        setMomentData({ ...defaultMomentData });
    };

    // unmount
    useEffect(() => {
        // set id to null so that the reset button wont be displayed when the user comes back to add new moment
        return () => {
            setCurrentMomentId(null);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <main className="px-3 mb-32">
            <FormContainer
                onSubmit={handleSubmit}
                headerTitle={`${moment ? "Update" : "Create"} Your Moment`}
            >
                {currentMomentId ? (
                    <Link
                        to="/"
                        className="btn btn-general border border-white-primary absolute top-0 right-1 text-sm"
                    >
                        back to moments
                    </Link>
                ) : null}
                <FormText
                    name="title"
                    value={momentData.title}
                    handleChange={handleChange}
                    extraClass="focus:ring-green-primary"
                />
                <FormTextArea
                    name="message"
                    value={momentData.message}
                    handleChange={handleChange}
                />
                <FormText
                    name="tags"
                    value={momentData.tags}
                    handleChange={handleChange}
                    placeholder="tag1 tag2 tag3..."
                    extraClass="focus:ring-green-primary"
                />
                <FormFile name="image" handleChange={handleImageChange} />
                <div className="text-center mt-14 mb-7 flex items-center">
                    <SubmitButton
                        loading={loading}
                        text="publish"
                        disabled={loading}
                    />
                    {currentMomentId && <ResetButton onClick={reset} />}
                    {/* <Button
                        text="reset"
                        onClick={reset}
                        extraClass="btn-red"
                        disabled={false}
                    /> */}
                </div>
            </FormContainer>
        </main>
    );
};

export default AddMoment;
