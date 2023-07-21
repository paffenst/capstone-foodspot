import axios, {AxiosError, AxiosResponse} from "axios";
import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {User} from "../models/User";

export default function useUser() {
    const initialUser = {
        username: "anonymousUser",
        password: "",
        email: "",
        firstname: "",
        lastname: "",
    }
    const [user, setUser] = useState<string | undefined>();
    const [inputFields, setInputFields] = useState({
        username: "",
        password: "",
    });
    const navigator = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    const [loggedInUser, setLoggedInUser] = useState<User>(initialUser)

    const loginUser = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const {username, password} = inputFields;
        try {
            const response = await axios.post("/user/login", undefined, {
                auth: {username, password},
            });
            setUser(response.data);
            setErrorMessage("");
            navigator("/");
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError;
                if (axiosError.response?.status === 401) {
                    setErrorMessage("username or password is incorrect !");
                } else {
                    setErrorMessage("An error has occurred. Please try again.");
                }
            } else {
                console.error(error);
            }
        }
    };

    function logoutUser(): Promise<AxiosResponse> {
        return axios.post("/user/logout")
    }

    function logout(): Promise<void> {
        return logoutUser()
            .then(() => setLoggedInUser(initialUser))
            .catch(console.error)
    }

    // eslint-disable-next-line
    const getUsername = async () => {
        try {
            const response = await axios.get("/user/me");
            const username = response.data;
            setUser(username);
            if (username === "anonymousUser" || !username) {
                navigator("/login");
            }
        } catch (error) {
            console.log(error);
        }
    };

// eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        // react-hooks/exhaustive-deps
        getUsername();
        // eslint-disable-next-line
    }, []);

    const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputFields({...inputFields, username: event.target.value});
    };

    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputFields({...inputFields, password: event.target.value});
    };

    return {
        loginUser,
        logout,
        user,
        getUsername,
        handleUsernameChange,
        handlePasswordChange,
        inputFields,
        errorMessage,
    };
}
