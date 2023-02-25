import { NavigationContainer } from "@react-navigation/native";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { auth } from "../config";
import { authStateChange, authStateChangeUser } from "../redux/auth/authOperations";
import useRoute from "../router";

const Main = () => {
        const {stateChange} = useSelector((state) => state.auth);
    const [user, setUser] = useState(null);
    const routing = useRoute(stateChange);
    const dispatch = useDispatch();

    console.log(stateChange);

    useEffect(() => {
        dispatch(authStateChangeUser())
    }, [])

    return <NavigationContainer>{routing}</NavigationContainer>;
}

export default Main;