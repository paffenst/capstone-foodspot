import axios from "axios";
import {ChangeEvent, FormEvent, useState} from "react";

export default function useUser() {
    const [user, setUser] = useState<string>();
    const [errorMessage, setErrormessage] = useState("unknown error");
    const [inputFields, setInputFields] = useState({
        username: "",
        password: "",
    });

    function LoginUser(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const {username, password} = inputFields;
        return axios
            .post("/api/login", undefined, {auth: {username, password}})
            .then((response) => {
                setUser(response.data);
            })
            .catch((error) => {
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

    function handleUsernameChange(event: ChangeEvent<HTMLInputElement>) {
        setInputFields({...inputFields, username: event.target.value});
    }

    function handlePasswordChange(event: ChangeEvent<HTMLInputElement>) {
        setInputFields({...inputFields, password: event.target.value});
    }

    return {
        LoginUser,
        user,
        errorMessage,
        handleUsernameChange,
        handlePasswordChange,
        inputFields
    };
}
