import React, { useEffect, useState } from 'react'
import ProtectedNav from '../../components/protectedNav/ProtectedNav'
import ProtectedSideBar from '../../components/ProtectedSB/ProtectedSideBar'
import './changename.css'
import changeNameHooks from './changeNameHooks'
function ChangeName({ currentUser }) {
    const [toggleSidebar, setToggleSidebar] = useState(false)
    const [firstname, setFirstname] = useState(currentUser.firstname);
    const [lastname, setLastname] = useState(currentUser.lastname);

    useEffect(() => {
        const errorFirstname = document.querySelector('.error_firstname')
        const errorLastname = document.querySelector('.error_lastname')

        errorFirstname.textContent = (!firstname) ? "Firstname is required" : "";
        
        errorLastname.textContent = (!lastname) ? "Lastname is required" : "";

    },[firstname, lastname])

    const {handleOnChange, onSubmit} = changeNameHooks({firstname, lastname});

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
                        <h2>Manage Name</h2>

                        <input value={firstname} name="firstname" placeholder ="Firstname" onChange={(e) => setFirstname(e.target.value)} />
                        <div className="error-message error_firstname" id="" ></div>

                        <input value={lastname} name="lastname" placeholder ="Lastname"  onChange={(e) => setLastname(e.target.value)} />
                        <div className="error-message error_lastname" id="" ></div>

                        <div className="button__container">
                            <button  className="button" type="submit">Commit Change</button>
                            <a href="/market/products" className="button" >Cancel </a>
                        </div>
                        
                        <p><strong>Please note:</strong> If you change your name it will appear on your transaction records, Don't add any unusual capitalization, punctuation, characters or random words.</p>

                    </div>
                    
                </form>
            </div>


        </div>
    )
}

export default ChangeName
