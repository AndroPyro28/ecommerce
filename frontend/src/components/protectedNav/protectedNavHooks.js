import React from 'react'
import Cookie from 'js-cookie';

function protectedNavHooks({showBox, setShowBox}) {
    
    const handleLogout = () => {
        Cookie.remove("userToken");
        Cookie.remove("authorize");
        alert("You have been logout!");
        window.location.reload();
    }

    const handleShowBox = () => {
        setShowBox(!showBox);
    }

    return {handleLogout, handleShowBox}
}

export default protectedNavHooks
