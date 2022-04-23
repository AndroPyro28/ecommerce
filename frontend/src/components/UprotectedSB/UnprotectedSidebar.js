import React from 'react'
import './unprotectedSB.css'
function UnprotectedSidebar({ setToggleSideBar, currentPage }) {
    return (
        <div className="backdrop" onClick={() => setToggleSideBar(false)}>
            <div className="UnProtectedSidebar__container">
                {
                    currentPage === "login" ?
                        (<a className="activePage" href="/login">Login</a>)
                        :
                        (<a href="/login">Login</a>)
                }
                {
                    currentPage === "signup" ?
                        (<a className="activePage" href="/signup">Signup</a>)
                        :
                        (<a href="/signup">Signup</a>)
                }
                <a href="/products">products</a>
                <a href="/company">company</a>
                <a href="/about">about</a>
                <a href="/contact">contact</a>
            </div>
        </div>

    )
}

export default UnprotectedSidebar
