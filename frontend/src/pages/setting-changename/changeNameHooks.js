import React from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';

function changeNameHooks({firstname, lastname}) {
    
    const onSubmit = async (e) => {
        e.preventDefault();

        if(firstname === "" || lastname === "") return;
        const userToken = Cookies.get("userToken");
        const response = await axios.post("https://fullstack-backend-ecommerce.herokuapp.com/api/update-name", {firstname, lastname , userToken}, {
            withCredentials: true
        });

        const {msg, success} = response.data;

        alert(msg);

        if(success) {
            window.location.href = "/user/profile"
        }

    }

    

return {onSubmit}
}

export default changeNameHooks
