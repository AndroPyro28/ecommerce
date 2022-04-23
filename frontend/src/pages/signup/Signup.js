import React, { useState } from 'react'
import { Formik, Form, ErrorMessage, Field } from 'formik'
import UnprotectedNav from '../../components/UnProtectedNav/UnprotectedNav';
import UnprotectedSidebar from '../../components/UprotectedSB/UnprotectedSidebar';
import Footer from '../../components/footer/Footer'
import './signup.css'
import signupHooks from './signupHooks';

function Signup() {

    const [toggleSideBar, setToggleSideBar] = useState(false);

    const { validationSchema, initialValues, onSubmit } = signupHooks();

    const validatePhone = (phoneNumber) => {
        //console.log(phoneNumber);
    }

    const validatePassword = (password, confirmPasword) => {
        return (password !== confirmPasword) ? "Password and confirmation password must be match" : null;
    }

    return (
        <>
            {toggleSideBar && <UnprotectedSidebar setToggleSideBar={setToggleSideBar} currentPage = {"signup"}/>}

            <UnprotectedNav setToggleSideBar={setToggleSideBar} currentPage = {"signup"} />

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

                                    <h1><i className="fas fa-shopping-cart"></i> Sign up form</h1>

                                    <div  className="input__container">
                                        <Field type="text" placeholder="Firstname" className="input" name="firstname" />
                                        <ErrorMessage name="firstname" component="div" className="error-message" />
                                    </div>

                                    <div className="input__container">
                                        <Field type="text" placeholder="Lastname" className="input" name="lastname" />
                                        <ErrorMessage name="lastname" component="div" className="error-message" />
                                    </div>

                                    <div className="input__container">
                                        <Field type="number" placeholder="Phone number" className="input" name="phoneNumber" validate={() => validatePhone(phoneNumber)} />
                                        <ErrorMessage name="phoneNumber" component="div" className="error-message" />
                                    </div>

                                    <div className="input__container">
                                        <Field type="text" placeholder="Email" className="input" name="email" />
                                        <ErrorMessage name="email" component="div" className="error-message" />
                                    </div>

                                    <div className="input__container">
                                        <Field type="password" placeholder="Password" className="input" name="password" />
                                        <ErrorMessage name="password" component="div" className="error-message" />
                                    </div>

                                    <div className="input__container">
                                        <Field type="password" placeholder="Confirm password" className="input" name="confirmPassword" validate={(e) => validatePassword(password, confirmPassword)} />
                                        <ErrorMessage name="confirmPassword" component="div" className="error-message" />
                                    </div>

                                    <div className="input__container"><a href="/login">Already have an account? Click here</a></div>

                                    <div className="input__container"> <button className="btn" type="submit">Sign up</button> </div>
                                </Form>
                            )
                        }
                    }
                </Formik>
                <Footer />
            </div>
        </>
    )
}

export default Signup
