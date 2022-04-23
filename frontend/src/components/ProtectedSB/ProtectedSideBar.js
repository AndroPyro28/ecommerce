import React from 'react'
import './protectedSB.css'
import protectedSBHooks from './protectedSBHooks';

function ProtectedSideBar({ setToggleSidebar }) {

    const { handleLogout } = protectedSBHooks();

    return (
        <div className="protected__backdrop" onClick={() => setToggleSidebar(false)}>
            <div className="protected__sidebar" >
                <a href="/user/profile"><i className="far fa-user-circle"></i>&nbsp; Profile</a>
                <a href="/market/products"><i className="fas fa-shopping-cart"></i>&nbsp; Market</a>
                <a href="/user/inventory"><i className="fas fa-dollar-sign"></i>&nbsp; Sell Item</a>
                <a href="#"><i className="fas fa-history"></i>&nbsp; Transaction History</a>
                <a href="/user/settings"><i className="fas fa-user-cog"></i>&nbsp; Settings</a>
                <a href="#" onClick={handleLogout}> <i className="fas fa-sign-out-alt"></i>&nbsp; Log out</a>
            </div>
        </div>
    )
}

export default ProtectedSideBar
