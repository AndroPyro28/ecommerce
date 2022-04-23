import React, { useEffect, useState } from 'react'
import './protectedNav.css'
import protectedNavHooks from './protectedNavHooks';
function ProtectedNav({ currentUser, setCategory, setToggleSidebar, currentPage }) {

    const { firstname, lastname } = currentUser;
    const [showBox, setShowBox] = useState(false);
    const { handleLogout, handleShowBox } = protectedNavHooks({ setShowBox, showBox });

    return (
        <div className="protected__nav__container">

            <div className="protected__nav__top">

                {
                    currentPage === "market" &&
                    <div className="protected__nav__logo">
                        <a href="/">Mern E-commerce</a>
                    </div>
                }


                {
                    currentPage !== "market" &&
                    <div className="protected__nav__logo show">
                        <a href="/">Mern E-commerce</a>
                    </div>
                }



                {
                    currentPage === "market" && <div className="protected__nav__categories">
                        <p>Category: </p>
                        <select onChange={(e) => setCategory(e.target.value)}>
                            <option value="">All Products</option>
                            <option value="Clothes">Clothes</option>
                            <option value="Gadgets">Gadgets</option>
                            <option value="Decorations">Decorations</option>
                            <option value="Houseware">Houseware</option>
                            <option value="Vehicles">Vehicles</option>
                            <option value="Auto Parts">Auto Parts</option>
                            <option value="Misc">Misc</option>
                            <option value="Jewelries">Jewelries</option>
                            <option value="Others">Others</option>
                        </select>
                    </div>
                }



                <div className="user__nav">
                    <a className="user" onClick={handleShowBox}><i className="fas fa-user-cog"></i> <span className="username">{`${firstname} ${lastname}`} <i className="fas fa-caret-down"></i></span>
                        {
                            showBox && <div className="hidden__box">
                                <a href="/user/profile"><i className="far fa-user-circle"></i>&nbsp;Profile</a>
                                <a href="/market/products"><i className="fas fa-shopping-cart"></i>&nbsp; Market</a>
                                <a href="/user/inventory" ><i className="fas fa-dollar-sign"></i>&nbsp; Sell Item</a>
                                <a><i className="fas fa-history"></i>&nbsp;Transaction History</a>
                                <a href="/user/settings"><i className="fas fa-user-cog"></i>&nbsp; Settings</a>
                                <a onClick={handleLogout}> <i className="fas fa-sign-out-alt"></i>&nbsp; Log out</a>
                            </div>
                        }
                    </a>
                </div>

                <div className="user__nav hamburger" onClick={() => setToggleSidebar(true)} >
                    <a><i className="fas fa-bars"></i> <span className="username">{`${firstname} ${lastname}`} </span> </a>
                </div>
            </div>


        </div>
    )
}

export default ProtectedNav
