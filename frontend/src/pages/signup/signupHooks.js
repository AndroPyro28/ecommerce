import * as yup from 'yup';
import axios from 'axios';
function signupHooks() {

    const onSubmit = async (values) => {

        const response = await axios.post("https://fullstack-backend-ecommerce.herokuapp.com/api/signup", {
            values
        }, {
            withCredentials: true
        });
        console.log(response.data)
        const { msg, success } = response.data;
        alert(msg);

        if(success) {
            window.location.href = "/login";
        }
    }

    const initialValues = () => {
        return {
            firstname: '',
            lastname: '',
            email: '',
            phoneNumber: '',
            password: '',
            confirmPassword: ''
        }
    }
    const validationSchema = yup.object({
        firstname: yup.string().required("Firstname is required!").min(3),
        lastname: yup.string().required("Lastname is required!").min(3),
        email: yup.string().required("Email is required!").email("Enter a valid email!"),
        phoneNumber: yup.number().required("Phone-number is required!"),
        password: yup.string().required("Password is required!").min(6),
        confirmPassword: yup.string().required("Confirmation of your password is required!"),
    });
    return { validationSchema, initialValues, onSubmit }
}

export default signupHooks
