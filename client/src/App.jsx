import { useState, useEffect } from "react";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import axios from "axios"

const urlParams = new URLSearchParams(window.location.search);
const code=urlParams.get("code");

function handleClick()
{
    window.location.href=`${import.meta.env.VITE_API_URL}/login`;
}

export default function App()
{

    const [accessToken,setAccessToken]=useState(localStorage.getItem("accessToken"));
    const [refreshToken,setRefreshToken]=useState(localStorage.getItem("refreshToken"));
    const [expiresIn,setExpiresIn]=useState();
    const [expiresAt,setExpiresAt]=useState(()=>{
        const v=localStorage.getItem("expiresAt");
        return v ? parseInt(v,10) : null;
    });

    const [search,setSearch]=useState("");
    const [searchItems,setSearchItems]=useState([]);

    useEffect(()=>{
        if(!code) return;
        axios.post(`${import.meta.env.VITE_API_URL}/callback`,{code}).then(
            (res)=>{
                const {accessToken,expiresIn,refreshToken}=res.data;
                const expiresAt=Date.now()+expiresIn*1000;
                setAccessToken(accessToken);
                setExpiresIn(expiresIn);
                setRefreshToken(refreshToken);
                setExpiresAt(expiresAt);
                localStorage.setItem("accessToken",accessToken);
                localStorage.setItem("refreshToken",refreshToken);
                localStorage.setItem("expiresAt",expiresAt);
                console.log(res.data);
                window.history.pushState({},null,"/");
            }
        ).catch(e=>{
            console.log(e.message);
            window.location.href="/";
        });
    },[code]);

    useEffect(()=>{
        if(!expiresAt) return;
        const timeLeft=expiresAt-Date.now();
        var timeout;
        if(timeLeft<=60*1000) tokenRefresh();
        else timeout=setTimeout(tokenRefresh,timeLeft-60*1000);
        return ()=>{clearTimeout(timeout)};
    },[expiresAt]);

    function tokenRefresh()
    {
        axios.post(`${import.meta.env.VITE_API_URL}/refresh`,{refreshToken}).then(
            (res)=>{
                const {accessToken,expiresIn}=res.data;
                const expiresAt=Date.now()+expiresIn*1000;
                setAccessToken(accessToken);
                setExpiresIn(expiresIn);
                setExpiresAt(expiresAt);
                localStorage.setItem("expiresAt",expiresAt);
                localStorage.setItem("accessToken",accessToken);
                console.log("Token refreshed!");
            }
        ).catch(e=>{
            console.log("REFRESH ERROR:", e.response?.data || e.message);
            handleLogout();
        });

    }

    function handleLogout()
    {
        setAccessToken(null);
        setRefreshToken(null);
        setExpiresAt(null);
        setExpiresIn(null);
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("expiresAt");
        localStorage.removeItem("accessToken");
    }

    useEffect(()=>{
        if(search==="")
        {
            setSearchItems([]);
            return;
        }
        var timeout=setTimeout(()=>{
            axios.post(`${import.meta.env.VITE_API_URL}/search`,{search,accessToken}).then(
                (res)=>{
                    const {items}=res.data.tracks;
                    setSearchItems(items);
                    console.log(items);
                }
            ).catch(e=>console.log(e.message))
        },250);
        return ()=>{clearTimeout(timeout)};
    },[search]);

    return(
        (accessToken && expiresAt>Date.now()) ? <Dashboard searchItems={searchItems} onSearch={(searchText)=>setSearch(searchText)} searchText={search} code={accessToken} onLogout={handleLogout}/> : <Login onClick={handleClick}/>
    );
}