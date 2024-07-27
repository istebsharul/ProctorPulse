import { Toaster } from "react-hot-toast";
import './App.css';
import { useEffect } from "react";
import { loadAdmin } from "./Actions/userActions";
import store from "./Store/store";
import { useSelector } from "react-redux";
// import TestPage from "./Pages/TestPage";

function App() {
    const isLoggedIn = useSelector(state => state.auth.isAuthenticated);

    useEffect(() => {
        console.log("Authenticated - App", isLoggedIn);
        store.dispatch(loadAdmin());
    }, [isLoggedIn]);

    return (
        <>
            <Toaster position="top-center" reverseOrder={false} />
            <div className="App pt-[3rem]">
            </div>
        </>
    );
}

export default App;
