import { useState, useContext} from 'react';
import { Form, FormControl, InputGroup, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import Signup_success from '../Signup_success';
import { ErrorContext } from '../../contexts/ErrorContext';

export default function SignupForm() {

  const [errors, setErrorsUniversal] = useContext(ErrorContext);
  const [signUpSuccess, setSignUpSuccess] = useState(false);

    const FILE_TYPES = ["image/jpg", "image/jpeg", "image/png"];

    const schema = yup.object().shape({
        firstName: yup.string().required("Please enter your first name"),
        lastName: yup.string().required("Please enter your last name"),
        userName: yup.string().required("Please enter a username"),
        password: yup.string().required("Please enter your password").min(8, "Password must be at least 8 characters"),
        confirmPassword: yup.string().required("Please re-enter your password").oneOf([yup.ref("password")], "Passwords do not match"),
        email: yup.string().required("Please enter your email").email("Email is not a valid email"),
        profilePicture: yup.mixed().test("fileType", "Invalid file Type", (value) => {return value && FILE_TYPES.includes(value.type)})
    });

    const signupHandler = async(e, {setSubmitting, setErrors}) => {
        setSubmitting(true);
        let formData = new FormData();  
        for(let key in e){
            if(e.hasOwnProperty(key)){
                formData.append(key, e[key]);
            }
        }
        
        try{
            let { data } = await axios.post("/api/signup", formData, {headers: {"Content-Type": "multipart/form-data"}});
            if(data.success){
                setSignUpSuccess(true);
                console.log("success");
            }
            else{
                setErrorsUniversal({show: true, msg:data.errors, title:"Errors"});
            }
        }
        catch(e){
          let res = e.response;
          if(res.status >= 500)
            setErrorsUniversal({show: true, msg:res.data.errors, title:"Errors"});
          else
            setErrors(res.data.errors);
        }
        finally{
            setSubmitting(false);
        }
    };

    return (
      signUpSuccess ? <Signup_success /> :
      <Formik
        validationSchema={schema}
        onSubmit={signupHandler}
        initialValues={{
          firstName: '',
          lastName: '',
          userName: '',
          password: '',
          confirmPassword: '',
          email: '',
          profilePicture: ''
        }}
      >
        {({
          handleSubmit,
          handleChange,
          validateField,
          values,
          touched,
          errors,
        }) => (
          <Form noValidate onSubmit={handleSubmit}>
              <InputGroup className="mb-3">
                  <FormControl
                  required
                  placeholder="First Name"
                  aria-label="fName"
                  aria-describedby="basic-addon1"
                  name="firstName"
                  value={values.firstName}
                  onChange={handleChange}
                  isValid = {touched.firstName && !errors.firstName}
                  isInvalid = {touched.firstName && errors.firstName}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.firstName}
                  </Form.Control.Feedback>
              </InputGroup>
              <InputGroup className="mb-3">
                  <FormControl
                  required
                  placeholder="Last Name"
                  aria-label="lName"
                  aria-describedby="basic-addon1"
                  name="lastName"
                  value={values.lastName}
                  onChange={handleChange}
                  isValid = {touched.lastName && !errors.lastName}
                  isInvalid = {touched.lastName && errors.lastName}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.lastName}
                  </Form.Control.Feedback>
              </InputGroup>                                                
              <InputGroup className="mb-3">
                  <FormControl
                  required
                  placeholder="Username"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  name="userName"
                  value={values.userName}
                  onChange={handleChange}
                  isValid = {touched.userName && !errors.userName}
                  isInvalid = {touched.userName && !!errors.userName}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.userName}
                  </Form.Control.Feedback>
              </InputGroup>
              <InputGroup className="mb-3">
                  <FormControl
                  required
                  placeholder="Password"
                  aria-label="Password"
                  aria-describedby="basic-addon1"
                  type="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  isValid = {touched.password && !errors.password}
                  isInvalid = {touched.password && !!errors.password}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
              </InputGroup>
              <Form.Group className="mb-3">
                  <FormControl
                  placeholder="Re-Enter Password"
                  aria-label="Password"
                  aria-describedby="basic-addon1"
                  type="password"
                  name="confirmPassword"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  isValid = {touched.confirmPassword && !errors.confirmPassword}
                  isInvalid = {touched.confirmPassword && !!errors.confirmPassword}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.confirmPassword}
                  </Form.Control.Feedback>
              </Form.Group>
              <InputGroup className="mb-3">
                  <FormControl
                  required
                  placeholder="Email"
                  aria-label="Email"
                  aria-describedby="basic-addon1"
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  isValid = {touched.email && !errors.email}
                  isInvalid = {touched.email && !!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
              </InputGroup>
              <InputGroup className="mb-3">
                  <FormControl
                  required
                  placeholder="Profile Picture"
                  aria-label="dPicture"
                  aria-describedby="basic-addon1"
                  type="file"
                  name="profilePicture"
                  accept=".jpg, .jpeg, .png"
                  onChange={(e) => {
                    values.profilePicture = e.target.files[0];
                    validateField("profilePicture");
                  }}
                  isValid = {touched.profilePicture && FILE_TYPES.includes(values.profilePicture.type)}
                  isInvalid = {touched.profilePicture && !!errors.profilePicture}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.profilePicture}
                  </Form.Control.Feedback>
              </InputGroup>
              <Button variant="primary" type="submit">Create Account</Button>
          </Form>
        )}
      </Formik>
  );
}