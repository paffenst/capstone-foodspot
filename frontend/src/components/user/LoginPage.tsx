import {Box, Button, TextField, Typography} from "@mui/material";
import useUser from "../../hooks/useUser";
import backgroundImage from "../../images/logformpage.jpg";
import {FormEvent} from "react";
import {useNavigate} from "react-router-dom";
import {User, UserLoginRequest} from "../../models/User";

type LoginProps = {
    handleLoginRequest(event: UserLoginRequest): void
    loggedInUser: User
}
export default function LoginPage(props: LoginProps) {

    const {handleUsernameChange, handlePasswordChange, inputFields, errorMessage} = useUser();
    const navigator = useNavigate();
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const userLoginRequest: UserLoginRequest = {
            username: inputFields.username,
            password: inputFields.password,
        };
        props.handleLoginRequest(userLoginRequest);
    };

    function onClickRegisterHandler() {
        navigator("/register");
    }

    const inputProps = {
        style: {
            color: "white",
        },
    };

    const textFieldProps = {
        InputProps: inputProps,
        InputLabelProps: {
            style: {
                color: "white",
            },
        },
        size: "medium" as const,
    };

    return (
        <div
            style={{
                position: "relative",
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "whitesmoke",
                backgroundRepeat: "no-repeat",
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: "cover",
            }}
        >
            <Box
                sx={{
                    position: "absolute",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    backdropFilter: "blur(7px)",
                    justifyContent: "center",
                    width: "90%",
                    maxWidth: "400px",
                    padding: "20px",
                    minHeight: "300px",
                }}
            >
                <Typography style={{color: "aquamarine", fontWeight: "bold"}} variant="h5" gutterBottom>
                    SIGN IN
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        width: "100%",
                        "& .MuiTextField-root": {
                            width: "100%",
                            marginBottom: "10px",
                        },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        label="username"
                        id="usernameTextfield"
                        value={inputFields.username}
                        onChange={handleUsernameChange}
                        {...textFieldProps}
                    />
                    <TextField
                        label="password"
                        type="password"
                        id="passwordTextfield"
                        autoComplete="on"
                        value={inputFields.password}
                        onChange={handlePasswordChange}
                        {...textFieldProps}
                    />
                    {errorMessage && (
                        <Typography style={{color: "#13e51d"}}>{errorMessage}</Typography>
                    )}
                    <Button
                        style={{backgroundColor: "aquamarine", color: "black", width: "100%"}}
                        type="submit"
                        variant="contained"
                        color="inherit"
                        size="medium"
                    >
                        Sign in
                    </Button>
                    <Button
                        onClick={onClickRegisterHandler}
                        style={{backgroundColor: "floralwhite", color: "black", width: "100%"}}
                        variant="contained"
                        color="inherit"
                        size="medium"
                    >
                        Sign up
                    </Button>
                </Box>
            </Box>
        </div>
    );
}
