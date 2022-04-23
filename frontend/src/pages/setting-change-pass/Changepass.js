import React, { useEffect, useState } from 'react'
import ProtectedNav from '../../components/protectedNav/ProtectedNav'
import ProtectedSideBar from '../../components/ProtectedSB/ProtectedSideBar'
import ChangePassHooks from './ChangePassHooks';

function Changepass({ currentUser }) {
    const [toggleSidebar, setToggleSidebar] = useState(false)
    const [currentPassword, setCurrentPassword] = useState(null);
    const [newPassword, setNewPassword] = useState(null);
    const [confirmPassword, setConfirmPssword] = useState(null);

    useEffect(() => {
        const ErrorCurrentPassword = document.querySelector(".error_current_password")
        const ErrorNewPassword = document.querySelector(".error_new_password")
        const ErrorConfirmPassword = document.querySelector(".error_confirm_password")

        ErrorCurrentPassword.innerHTML = (currentPassword == "") ? "Current Password is required" : ""

        ErrorNewPassword.innerHTML = (newPassword == "") ? "New Password is required" : ""

        ErrorConfirmPassword.innerHTML = (confirmPassword == "") ? "Confirm Password is required":
        confirmPassword != newPassword ? "Confirmation password must match the new password" : ""
        
    },[currentPassword, confirmPassword, newPassword])

    const {onSubmit} = ChangePassHooks({currentPassword, newPassword, confirmPassword})
    
    return (
        <div>
            {
                toggleSidebar && <ProtectedSideBar
                    setToggleSidebar={setToggleSidebar}
                />
            }
            <ProtectedNav currentUser={currentUser} setToggleSidebar={setToggleSidebar} />

            <div className="changename__main__container">
                <form onSubmit={onSubmit}  autoComplete="off" >
                    <div className="changename__form">
                        <h2>Manage Password</h2>

                        <input value ={currentPassword} type="password" name="currentPassword" placeholder ="Current Password" onChange={(e) => setCurrentPassword(e.target.value)} />
                        <div className="error-message error_current_password" id="" ></div>

                        <input value={newPassword} type="password" name="newPassword" placeholder ="New Password"  onChange={(e) => setNewPassword(e.target.value)} />
                        <div className="error-message error_new_password" id="" ></div>

                        <input type="password" name="confirmPassword" placeholder ="Confirm Password"  onChange={(e) => setConfirmPssword(e.target.value)} />
                        <div className="error-message error_confirm_password" id="" ></div>

                        <div value={confirmPassword} className="button__container">
                            <button  className="button" type="submit">Commit Change</button>
                            <a href="/market/products" className="button" >Cancel </a>
                        </div>
                        
                        <p><strong>Please note:</strong>It's a good idea to use a strong password that you're not using elsewhere</p>

                    </div>
                    
                </form>
            </div>


        </div>
    )
}

export default Changepass
