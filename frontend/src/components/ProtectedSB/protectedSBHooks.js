import React from 'react'
import Cookies from 'js-cookie';

function protectedSBHooks() {
    const handleLogout = () => {
        Cookies.remove("userToken");
        Cookies.remove("authorize");
        alert("You have been logout!");
        window.location.reload();
    }
    return { handleLogout }
}

export default protectedSBHooks
