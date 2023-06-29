import {Box, Button, TextField} from "@mui/material";
import useUser from "../../hooks/useUser";
import {FormEvent} from "react";
import {useNavigate} from "react-router-dom";

export default function LoginPage() {
    const {LoginUser, handleUsernameChange, handlePasswordChange, inputFields} = useUser();
    const navigator = useNavigate()

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        LoginUser(event)
            .then(() => navigator("/")
            );
    };

    return (
        <Box
            sx={{
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                flexWrap: "wrap",
                alignContent: "space-around",
                rowGap: "5px",
            }}
        >
            <Box sx={{height: "50px"}}></Box>
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    "& .MuiTextField-root": {
                        m: 1,
                        width: "25ch",
                        display: "flex",
                        flexDirection: "column",
                        flexWrap: "wrap",
                        rowGap: "5px",
                        justifyContent: "center",
                    },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField
                    size="medium"
                    label="username"
                    id="usernameTextfield"
                    value={inputFields.username}
                    onChange={handleUsernameChange}
                />
                <TextField
                    size="medium"
                    label="password"
                    type="password"
                    id="passwordTextfield"
                    value={inputFields.password}
                    onChange={handlePasswordChange}
                />
                <Button type="submit" variant="outlined" color="inherit" size="medium">
                    Login
                </Button>
            </Box>
        </Box>
    );
}
