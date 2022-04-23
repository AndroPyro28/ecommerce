import * as yup from 'yup';
import cookies from 'js-cookie';
import axios from 'axios';

function loginHooks() {

    const onSubmit = async (values) => {

        const response = await axios.post("https://fullstack-backend-ecommerce.herokuapp.com/api/login", {
            values
        }, {
            withCredentials: true
        })
        const { msg, success, userToken } = response.data;

        if (success) {
            cookies.set("userToken", userToken, {
                expires: 1,
                secure: true,
            });
            window.location.href = "/market/products";
        }

        alert(msg);
    }

    const initialValues = () => {
        return {
            email: '',
            password: '',
        }
    }
    const validationSchema = yup.object({
        email: yup.string().required("Email is required!"),
        password: yup.string().required("Password is required!"),
    });

    return { validationSchema, initialValues, onSubmit }
}

export default loginHooks
