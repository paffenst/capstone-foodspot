import axios from "axios";
import {ChangeEvent, useEffect, useState} from "react";
import {User} from "../models/User";
import {useNavigate} from "react-router-dom";

export default function useRegister() {
    const nav = useNavigate();
    const [addUser, setAddUser] = useState<User>()
    const [emailError, setEmailError] = useState<string | boolean>(false)
    const [passError, setPassError] = useState<string | boolean>(false)
    const [inputTextFields, setInputTextFields] = useState({
        username: "",
        password: "",
        email: "",
        firstname: "",
        lastname: "",
    });

    useEffect(() => {
        setAddUser({
            username: inputTextFields.username,
            password: inputTextFields.password,
            email: inputTextFields.email,
            firstname: inputTextFields.firstname,
            lastname: inputTextFields.lastname,
        })
    }, [inputTextFields, passError, emailError])

    useEffect(() => {
        setEmailError(false)
        setPassError(false)
    }, [inputTextFields])

    function validEmail(email: string) {
        const rex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}])|(([a-zA-Z0-9]+\.)+[a-zA-Z]{2,}))$/;
        return rex.test(email);
    }

    function validPassword(password: string): boolean {
        return password.trim().length > 5;
    }

    const handleInputChange = (
        event: ChangeEvent<HTMLInputElement>,
        fieldName: string
    ) => {
        const {value} = event.target;
        setInputTextFields((prevState) => ({
            ...prevState,
            [fieldName]: value,
        }));
    };

    function registerInputHandler(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (validEmail(inputTextFields.email) && validPassword(inputTextFields.password)) {
            event.preventDefault();
            axios.post("/api/register", {
                username: inputTextFields.username,
                password: inputTextFields.password,
                email: inputTextFields.email,
                firstname: inputTextFields.firstname,
                lastname: inputTextFields.lastname,
            }).then((response) => {
                nav(`/login`)
            })
                .catch((error) => console.error(error))
        } else if (!validEmail(inputTextFields.email)) {
            return setEmailError("Enter a valid email address ' ")
        } else if (!validPassword(inputTextFields.password)) {
            return setPassError("Enter a password with at least 6 characters")
        }
    }

    return {
        addUser, inputTextFields, handleInputChange, passError, emailError, registerInputHandler
    }
}