import {Box, Button, TextField, Typography} from "@mui/material";
import {ChangeEvent} from "react";
import useRegister from "../../hooks/useRegister";

export default function RegisterPage() {
    const {addUser, inputTextFields, handleInputChange, registerInputHandler, passError, emailError} = useRegister();
    return (
        <>
            <Box sx={{textAlign: "center"}}>
                <Typography variant="h4" gutterBottom>
                    Register Form
                </Typography>
            </Box>
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
                <Box
                    component="form"
                    onSubmit={registerInputHandler}
                    sx={{
                        "& .MuiTextField-root": {
                            m: 2,
                            width: "25ch",
                            display: "flex",
                            flexDirection: "column",
                            flexWrap: "wrap",
                            rowGap: "10px",
                            justifyContent: "center",
                        },
                    }}
                    noValidate
                >
                    <TextField
                        size="small"
                        label="username"
                        id="usernameTextfield"
                        value={inputTextFields.username}
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            handleInputChange(event, "username")
                        }
                    />
                    <TextField
                        size="small"
                        label="password"
                        id="passwordTextfield"
                        type="password"
                        helperText={passError}
                        value={inputTextFields.password}
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            handleInputChange(event, "password")
                        }
                    />
                    <TextField
                        size="small"
                        label="email"
                        id="emailTextfield"
                        value={inputTextFields.email}
                        helperText={emailError}
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            handleInputChange(event, "email")
                        }
                    />
                    <TextField
                        size="small"
                        label="firstname"
                        id="firstnameTextfield"
                        type="text"
                        value={inputTextFields.firstname}
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            handleInputChange(event, "firstname")
                        }
                    />
                    <TextField
                        size="small"
                        label="lastname"
                        id="lastnameTextfield"
                        type="text"
                        value={inputTextFields.lastname}
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            handleInputChange(event, "lastname")
                        }
                    />
                    <Button type="submit" variant="contained" color="inherit" size="large">
                        Register
                    </Button>
                </Box>
            </Box>
        </>
    )
}
