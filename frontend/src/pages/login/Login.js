import React, { useState } from 'react'
import { Formik, Form, ErrorMessage, Field } from 'formik'
import UnprotectedNav from '../../components/UnProtectedNav/UnprotectedNav';
import UnprotectedSidebar from '../../components/UprotectedSB/UnprotectedSidebar';
import Footer from '../../components/footer/Footer'
import '../signup/signup.css';
import './login.css';
import loginHooks from './loginHooks';

function Login() {

    const [toggleSideBar, setToggleSideBar] = useState(false);

    const { validationSchema, initialValues, onSubmit } = loginHooks();

    return (
        <>
            {toggleSideBar && <UnprotectedSidebar setToggleSideBar={setToggleSideBar} currentPage = {"login"}/>}

            <UnprotectedNav setToggleSideBar={setToggleSideBar} currentPage = {"login"} />

            <div className="signup__container">

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    {
                        formik => {

                            const { password, confirmPassword, phoneNumber } = formik.values;
                            return (
                                <Form autoComplete="off" className="form">

                                    <h1><i className="fas fa-shopping-cart"></i> Login form</h1>

                                    <div className="input__container">
                                        <Field type="text" placeholder="Email" className="input" name="email" />
                                        <ErrorMessage name="email" component="div" className="error-message" />
                                    </div>

                                    <div className="input__container">
                                        <Field type="password" placeholder="Password" className="input" name="password" />
                                        <ErrorMessage name="password" component="div" className="error-message" />
                                    </div>

                                    <div className="input__container"><a href="/signup">Don't Have an account? click here</a></div>

                                    <div className="input__container"> <button className="btn" type="submit">Login</button> </div>
                                </Form>
                            )
                        }
                    }
                </Formik>
                <div className="space"></div>
                <Footer />
            </div>
        </>
    )
}

export default Login
