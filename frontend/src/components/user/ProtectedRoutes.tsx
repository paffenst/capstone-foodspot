import React from 'react';
import {Navigate, Outlet} from "react-router-dom";

type Props = {
    user: string | undefined
}

function ProtectedRoutes(props: Props) {

    const authenticated = props.user !== undefined && props.user !== "Not Logged in"

    return (
        authenticated ? <Outlet/> : <Navigate to={"/login"}/>
    );
}

export default ProtectedRoutes;