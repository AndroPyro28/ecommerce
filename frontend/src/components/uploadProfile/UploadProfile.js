import React, { useEffect, useState } from 'react'
import uploadHooks from './uploadHooks';
import './uploadProfile.css'
function UploadProfile({ setToggleUploader, setRefresh, refresh  }) {
    const [file, setFile] = useState();
    const [displayFile, setDisplayFile] = useState();

    const { onSubmit, handleSetFile } = uploadHooks({ file, setDisplayFile, setFile, setRefresh, refresh, setToggleUploader });

    return (
        <div className="protected__backdrop">
            <form onSubmit={onSubmit}>
                <div className="profile__upload__container">
                    <h1>Upload Image</h1>
                    {/* {displayFile && <img className="displayImg" src={displayFile} />} */}
                    <img className="displayImg" src={displayFile} />
                    <i className="exit__button fas fa-times-circle" onClick={() => setToggleUploader(false)}></i>
                    <input type="file" className="input__file" onChange={handleSetFile} required/>
                    <button className="submit_button" type="submit" >Upload as your profile picture</button>
                </div>
            </form>
        </div>
    )
}

export default UploadProfile
