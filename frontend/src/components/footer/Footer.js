import React from 'react'
import './footer.css'
function footer() {
    return (
        <footer className="footer">
            <div className="social__media">
                <i className="fab fa-facebook-square fb "></i>
                <i className="fab fa-twitter twt"></i>
                <i className="fab fa-instagram ig"></i>
                </div>
            <div className="footerOption">
                <a href="#homepage__banner">Privacy Policy</a>
                <a href="#section__1">Terms And Condition</a>
                <a href="#section__2">© All right reserves 2021</a>
            </div>
        </footer>
    )
}

export default footer
