import axios from 'axios';
import Cookies from 'js-cookie';
function uploadHooks({ file, setDisplayFile, setFile, setRefresh, refresh, setToggleUploader }) {
    {
        // const onSubmit = async (e) => { // local upload on local folder
        //     e.preventDefault();
        //     const formData = new FormData();
        //     const userToken = Cookies.get("userToken");
        //     formData.append("file", file);
        //     formData.append("userToken", userToken);
        //     try {
        //         const response = await axios.post("http://localhost:3001/profileUpload", formData, {
        //             withCredentials: true,
        //             headers: {
        //                 "Content-Type": "multipart/form-data"
        //             }
        //         })
        //         const { success, msg } = response.data;
        //         alert(msg);

        //         if (success) {
        //             window.location.reload();
        //         }

        //     } catch (error) {
        //         alert("something went wrong...");
        //     }
        // }
    }
    
    const onSubmit = async (e) => {
        e.preventDefault();
        
        if (!file) {
            return alert("please choose your desired photo");
        }

        const { name, type } = file;

        const isValidType = type.includes("image");
        if (!isValidType) {
            return alert("Incorrect type of files");
        }
        const button = document.querySelector(".submit_button");
        const reader = new FileReader();

        reader.readAsDataURL(file); //convet image to a url

        reader.onloadend = async () => {
            
            const urlData = reader.result; // data url we converted

            try {
                button.disabled = true;
                const userToken = Cookies.get("userToken");
                const response = await axios.post("https://fullstack-backend-ecommerce.herokuapp.com/api/profileUpload", { userToken, type, name, urlData }, {
                    withCredentials: true,
                })
                const { success, msg } = response.data;
                alert(msg);
                if (success) {
                    setToggleUploader(false);
                    setRefresh(!refresh)
                }

            } catch (error) {
                alert("something went wrong...");
            }
        }
    }

    const handleSetFile = (e) => {
        if (e.target.files[0]) {
            const reader = new FileReader();
            setFile(e.target.files[0])
            reader.readAsDataURL(e.target.files[0]);
            reader.onloadend = () => {
                setDisplayFile(reader.result);
            }

        }
    }

    return { onSubmit, handleSetFile }
}

export default uploadHooks
