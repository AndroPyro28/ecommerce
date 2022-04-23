import React, { useState } from 'react'
import ProtectedNav from '../../components/protectedNav/ProtectedNav'
import ProtectedSideBar from '../../components/ProtectedSB/ProtectedSideBar'
import './settings.css'
function Settings({ currentUser }) {

    const [toggleSidebar, setToggleSidebar] = useState(false)
    const {firstname, lastname, email, address} = currentUser;
    return (
        <div className="wrapper">
            {
                toggleSidebar && <ProtectedSideBar
                    setToggleSidebar={setToggleSidebar}
                />
            }

            <ProtectedNav currentUser={currentUser} setToggleSidebar={setToggleSidebar} />

            <div className="settings__body">

                <div className="settings__main__container"> {/* setting */}

                    <div className="setting__container" onClick={() => window.location.href="/user/settings/manage-name"}> {/* wrapper of setting a color white one */}

                        <div className="setting__label">Name:</div> {/* label leftside */}

                        <div className="setting__info__user" >{`${firstname} ${lastname}`}</div> {/* label middle */}

                        <div className="setting__button">edit</div> {/* label right side */}

                    </div>
                    <div className="setting__container" onClick={() => window.location.href="/user/manage-email"}> {/* wrapper of setting a color white one */}

                        <div className="setting__label">Manage email: </div> {/* label leftside */}

                        <div className="setting__info__user" >{email}</div> {/* label middle */}

                        <div className="setting__button">edit</div> {/* label right side */}

                    </div>

                    <div className="setting__container" onClick={() => window.location.href="/user/manage-address"}> {/* wrapper of setting a color white one */}

                        <div className="setting__label">Manage address: </div> {/* label leftside */}

                        <div className="setting__info__user" >{address ? address : "To make transaction please verify your address"}</div> {/* label middle */}

                        <div className="setting__button">edit</div> {/* label right side */}

                    </div>

                    <div className="setting__container" onClick={() => window.location.href="/user/settings/manage-password"}> {/* wrapper of setting a color white one */}

                        <div className="setting__label">Manage Password: </div> {/* label leftside */}

                        <div className="setting__info__user" >•••</div> {/* label middle */}

                        <div className="setting__button">edit</div> {/* label right side */}

                    </div>

                </div>

            </div>


        </div>
    )
}

export default Settings
