import {useEffect, useState} from "react";
import {getTokenMap} from "../api/Mapapi";

export default function useAccessToken(){
    const [token, setToken] = useState<string>("")

    useEffect(()=>{
        getTokenMap().then(data => {
            setToken(data)
        })
    },[])

    return {token}
}