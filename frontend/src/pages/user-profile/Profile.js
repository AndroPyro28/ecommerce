import React, { useState } from 'react'
import ProtectedNav from '../../components/protectedNav/ProtectedNav'
import { Image } from 'cloudinary-react';
import ProtectedSideBar from '../../components/ProtectedSB/ProtectedSideBar';
import UploadProfile from '../../components/uploadProfile/UploadProfile';
import Footer from '../../components/footer/Footer.js';
import './profile.css'
import profileHooks from './profileHooks';

function Profile({ currentUser, refresh, setRefresh }) {
    const [category, setCategory] = useState(""); // wag pansinin to
    const [toggleSidebar, setToggleSidebar] = useState(false);
    const [toggleUploader, setToggleUploader] = useState(false);
    const { firstname, lastname, profileUrl, transactionHistory, verified } = currentUser;
   
    const { noTransaction } = profileHooks({transactionHistory});
    
    return (
        <div>
            {toggleUploader && <UploadProfile setToggleUploader={setToggleUploader} refresh={refresh} setRefresh={setRefresh}/>}
            {toggleSidebar && <ProtectedSideBar setToggleSidebar={setToggleSidebar} />}
            <ProtectedNav currentUser={currentUser} setCategory={setCategory} setToggleSidebar={setToggleSidebar} currentPage="profile" />
            <div className="user__profile__container">
                <div className="user__profile__background">

                    <div className="image__uploader">
                       
                        <Image
                        className="user__profile__picture"
                            cloudName="iamprogrammer"
                            publicId={`${profileUrl}.jpg`}
                            width="300"
                            crop="scale"
                        />
                        
                        <button onClick = {() => setToggleUploader(true)}><i className="fas fa-camera"></i> Change Profile</button>
                    </div>
                    <div className="user__description__container">
                        <p className="user__profile__name">{`${firstname} ${lastname}`}</p>
                        <span>{`${noTransaction()}+ Transactions`}</span>
                        <span>{`${verified ? "Verified" : "Not verified"}`}</span>
                    </div>
                </div>

                <div className="user__profile__info">
                </div>
                
            </div>
            <Footer/>
        </div>
    )
}

export default Profile
