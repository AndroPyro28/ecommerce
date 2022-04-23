import React, { useEffect, useState } from 'react'
import './unprotectednav.css'
function UnprotectedNav({ setToggleSideBar, currentPage }) {

    return (
        <div className="Unprotected__nav">
            <div className="Unprotected__nav__logo"> <a href="/">Mern E-commerce </a></div>

            <div className="Unprotected__left__nav">
                <a href="/products">products</a>
                <a href="/company">company</a>
                <a href="/about">about</a>
                <a href="/contact">contact</a>
            </div>

            <div className="Unprotected__right__nav">
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

            </div>

            <i className="fas fa-bars hamburger-menu" onClick={() => {

                setToggleSideBar(true)
            }}></i>
        </div>
    )
}

export default UnprotectedNav
