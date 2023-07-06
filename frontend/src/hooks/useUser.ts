import axios from "axios";
import {ChangeEvent, FormEvent, useState} from "react";
import {useNavigate} from "react-router-dom";

export default function useUser() {
    const [user, setUser] = useState<string>();
    const [errorMessage, setErrormessage] = useState("unknown error");
    const [inputFields, setInputFields] = useState({
        username: "",
        password: "",
    });
    const nav = useNavigate();
    function LoginUser(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const {username, password} = inputFields;
        return axios
            .post("/user/login", undefined, {auth: {username, password}})
            .then((response) => {
                getUsername()
            }).catch((error) => {
                if (error.response && error.response.status === 401) {
                    setUser(undefined);
                    setErrormessage(
                        "User '" +
                        inputFields.username +
                        "' does not exist or the password is wrong."
                    );
                    console.error(errorMessage);
                } else {
                    console.error(error);
                }
            });
    }

    function getUsername() {
        let username = undefined;
        axios.get("/user/me").then((response) => {
            setUser(response.data);
            username = response.data;
            if (username === "anonymousUser" || username === undefined) {
                nav("/login")
            } else nav("/")
        }).catch(error => {
            console.log(error)
        })
    }

    function handleUsernameChange(event: ChangeEvent<HTMLInputElement>) {
        setInputFields({...inputFields, username: event.target.value});
    }

    function handlePasswordChange(event: ChangeEvent<HTMLInputElement>) {
        setInputFields({...inputFields, password: event.target.value});
    }

    return {
        LoginUser,
        user,
        getUsername,
        errorMessage,
        handleUsernameChange,
        handlePasswordChange,
        inputFields
    };
}
