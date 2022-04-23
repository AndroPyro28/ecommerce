import React from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';
function ChangePassHooks({currentPassword, confirmPassword, newPassword}) {
    const onSubmit = async (e) => {

        e.preventDefault();

        if(!currentPassword || !confirmPassword || !newPassword) {
            return alert("All input fields are required to change the password")
        }

        if(newPassword.length <= 4) {
            return alert("New password minimum length of 4")
        }

        try {
            const userToken = Cookies.get("userToken");
            const response = await axios.post("https://fullstack-backend-ecommerce.herokuapp.com/api/update-password", {newPassword, currentPassword, userToken}, {
                withCredentials: true
            })
            const {success, msg} = response.data;

            alert(msg);

            if(success) return window.location.href = "/user/profile"

        } catch (error) {
            
        }
        
    }
return {onSubmit}

}

export default ChangePassHooks
