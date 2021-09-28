import { Route, Switch, useLocation } from "react-router";
import { Toaster } from "react-hot-toast";

import AddMoment from "./pages/Moment/AddMoment";
import Navbar from "./components/Navbar/Navbar";
import Homepage from "./pages/Homepage";
import Login from "./pages/Authentication/Login";
import Signup from "./pages/Authentication/Signup";
import ForgetPassword from "./pages/Authentication/ForgetPassword";
import Moment from "./pages/Moment/Moment";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import ResetPassword from "./pages/Authentication/ResetPassword";
import Settings from "./pages/Settings";
import Search from "./pages/Search";
import HomeAsideMain from "./components/HomeAside/HomeAsideMain";
import { useMomentContext } from "./context/MomentsContext";
import ActivateAccount from "./pages/Authentication/ActivateAccount";
import FAQ from "./pages/FAQ";
import About from "./pages/About";
import Terms from "./pages/Terms";

function App() {
    let { pathname } = useLocation();
    let { asideProfRef } = useMomentContext();

    let smallDeviceClass = pathname === "/" ? "" : "sm:hidden";

    let parentFlex = `${
        pathname === "/"
            ? "sm:flex sm:items-start sm:justify-start space-x-5"
            : ""
    }`;

    let parentClass = `${
        pathname.startsWith("/profile")
            ? ""
            : "relative px-3 py-5 md:px-8 lg:px-16 xl:px-32"
    } `;

    return (
        <>
            <Toaster
                toastOptions={{
                    className: "border-2 border-current",
                    success: {
                        className: "bg-green-lighter text-green-primary",
                        icon: "✨",
                    },
                    error: {
                        className: "bg-red-lighter text-red-dark",
                    },
                }}
            />
            {!pathname.startsWith("/auth") &&
                !pathname.startsWith("/NotFound") && <Navbar />}
            <div className={`${parentClass} ${parentFlex}`}>
                {!pathname.startsWith("/NotFound") && (
                    <aside
                        className={`bg-black transition-transform fixed navHomeAsideTop bottom-0 right-full px-3 pt-0 pb-4 z-20 max-w-md sm:bg-transparent sm:sticky sm:top-24 sm:pt-0 sm:min-w-sm sm:max-w-xs sm:px-0 md:mr-auto ${smallDeviceClass}`}
                        ref={asideProfRef}
                    >
                        <HomeAsideMain />
                    </aside>
                )}
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
                    <Route path="/auth/activateAccount/:token">
                        <ActivateAccount />
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
                    <Route path="/faq">
                        <FAQ />
                    </Route>
                    <Route path="/about">
                        <About />
                    </Route>
                    <Route path="/terms">
                        <Terms />
                    </Route>
                    <Route path="/search">
                        <Search />
                    </Route>
                    <Route path="/settings">
                        <Settings />
                    </Route>
                    <Route path="/NotFound">
                        <NotFound />
                    </Route>
                    <Route path="/search">
                        <Search />
                    </Route>
                    {/* <Route path="*">
                        <Redirect to="/NotFound" />
                    </Route> */}
                </Switch>
            </div>
        </>
    );
}

export default App;
