import axios from "axios";
import {ChangeEvent, FormEvent, useState} from "react";
import {useNavigate} from "react-router-dom";

export default function useUser() {
    const [user, setUser] = useState<string | undefined>();
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
                nav("/")
            }).catch((error) => {
                if (error.response) {
                    setUser(undefined);
                } else {
                    console.error(error.response.data);
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
            }
        }).then(() => {
        })
            .catch(error => {
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
        handleUsernameChange,
        handlePasswordChange,
        inputFields
    };
}
