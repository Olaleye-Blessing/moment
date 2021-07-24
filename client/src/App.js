import { Route, Switch, useLocation } from "react-router";

import AddMoment from "./components/Moments/AddMoment";
import Navbar from "./components/Navbar/Navbar";
import Homepage from "./pages/Homepage";
import Login from "./pages/Authentication/Login";
import Signup from "./pages/Authentication/Signup";
import ForgetPassword from "./pages/Authentication/ForgetPassword";
import Moment from "./pages/Moment";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import ResetPassword from "./pages/Authentication/ResetPassword";
import Settings from "./pages/Settings";

function App() {
    let { pathname } = useLocation();

    return (
        <>
            {!pathname.startsWith("/auth") && <Navbar />}
            <Switch>
                <Route path="/" exact>
                    <Homepage />
                </Route>
                <Route path="/moment">
                    <AddMoment />
                </Route>
                <Route path="/moments/:id" exact>
                    <Moment />
                </Route>
                <Route path="/auth/login">
                    <Login />
                </Route>
                <Route path="/auth/signup">
                    <Signup />
                </Route>
                <Route path="/auth/forgotPassword">
                    <ForgetPassword />
                </Route>
                <Route path="/auth/resetPassword/:token">
                    <ResetPassword />
                </Route>
                <Route path="/profile/:id">
                    <Profile />
                </Route>
                <Route path="/settings">
                    <Settings />
                </Route>
                <Route path="*">
                    <NotFound />
                </Route>
            </Switch>
        </>
    );
}

export default App;
