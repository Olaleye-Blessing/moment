/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useHistory, useParams } from "react-router-dom";
import ProcessIndicator from "../../components/ProcessIndicator";

import { useMomentContext } from "../../context/MomentsContext";
import { actions } from "../../reducer/actions";
import { getData } from "../../reducer/fetchActions";
// import NavBar from "./../../components/Navbar/Navbar";

const ActivateAccount = () => {
    let { token } = useParams();
    let history = useHistory();

    let { dispatch } = useMomentContext();

    useEffect(() => {
        const activateAccount = async () => {
            try {
                let result = await getData(`/auth/activateAccount/${token}`);
                dispatch({
                    type: actions.AUTHENTICATION,
                    payload: result.user,
                });
                history.replace("/");
                toast.success("Account activated successfully");
            } catch (error) {
                // console.log(error);
            } finally {
                // history.replace("/");
            }
        };
        activateAccount();
    }, []);
    return (
        <>
            {/* <NavBar /> */}
            <main className="h-screen flex pt-12">
                <ProcessIndicator
                    parentExtraClass="w-full h-80"
                    childExtraClass="w-40 h-40"
                />
            </main>
        </>
    );
};

export default ActivateAccount;
