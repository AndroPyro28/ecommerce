import React, { useState } from 'react'
import UnprotectedNav from '../../components/UnProtectedNav/UnprotectedNav'
import Footer from '../../components/footer/Footer'
import './homepage.css'
import UnprotectedSidebar from '../../components/UprotectedSB/UnprotectedSidebar'

function Homepage() {
    const [toggleSideBar, setToggleSideBar] = useState(false);
    return (
        
        <div className="homepage__container">
            {toggleSideBar && <UnprotectedSidebar setToggleSideBar={setToggleSideBar}/>}
            <UnprotectedNav setToggleSideBar={setToggleSideBar} />
            <div className="homepage__banner" id="homepage__banner">
           
                <h1>
                    Welcome to<br></br>
                    MernStack Ecommerce <i className="fas fa-shopping-cart"></i>
                </h1>
                <a className="browse__products" href="/products">Browse Products</a>
            </div>

            <div className="section__1" id="section__1">

                <img src="/images/shopping-online.jpg" />
                <span>
                    <h1>What's New?</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

                </span>
            </div>

            <div className="section__2"  id="section__2">
                <span>
                    <h1>What we have?</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </span>
                <img src="/images/presentation.jpg" />
            </div>
            
            <Footer />
        </div>
    )
}

export default Homepage
