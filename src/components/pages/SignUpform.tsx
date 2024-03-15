import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers} from 'formik';
import * as Yup from 'yup';
import styled, {css}from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faUser, faPhone, faUserAlt } from '@fortawesome/free-solid-svg-icons';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { FormControlLabel, Switch} from '@mui/material';


type FormContainerProps = {
  $show?: boolean;
};

// Interfaces for the form values
interface SignUpFormValues {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface LoginFormValues {
  email: string;
  password: string;
}

// Initial values for the forms
const initialValuesSignUp: SignUpFormValues = {
  firstName: '',
  lastName: '',
  phoneNumber: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const initialValuesLogin: LoginFormValues = {
  email: '',
  password: '',
};

const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center; /* Center content vertically */
height: 100vh;
position: relative;
`;

const FormContainer = styled.div<FormContainerProps>`
  ${({ $show }) => css`
    opacity: ${$show ? 1 : 0};
    display: ${$show ? 'flex' : 'none'};
    flex-direction: column;
    transition: all 0.5s ease;
    width: 100%;
    max-width: 550px;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    background-color: white;
    max-height: 890px; 
    color: black;
    margin-bottom: 20px;
  `}
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin: 8px 0;
`;

const StyledInput = styled(Field)`
  padding: 12px 15px 12px 35px; /* Adjust left padding to make room for the icon */
  width: calc(100% - 30px);
  border: 1px solid #ccc;
  border-radius: 4px;
  &:focus {
    border-color: #4A90E2;
    outline: none;
  }
  box-sizing: border-box;
`;

const Icon = styled(FontAwesomeIcon)`
  position: absolute;
  left: 10px;
  color: #ccc;
`;

const FormTitle = styled.h2`
  text-align: center;
  margin-bottom: 20px; /* Adjust as needed */
`;

const StyledLabel = styled.h4`
  margin: 0 0 -8px 0;
  padding: 0;
`;

const ErrorMessageContainer = styled.div`
  height: 20px;
  margin-bottom: 10px;
  color: #ff4d4d;
  text-align: center;
`;

const SwitchButton = styled.button`
  background-color: #f0f0f0;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
`;

const SubmitButton = styled.button`
  background-color: black; /* Set background color to black */
  color: white; /* Set text color to white for contrast */
  width: calc(100% - 30px);
  box-sizing: border-box; 
  padding: 15px 30px; /* Increase padding to make the button bigger */
  border: none; /* Remove the border */
  border-radius: 5px; /* Optional: Add some border-radius for rounded corners */
  font-size: 16px; /* Increase font size for better readability */
  cursor: pointer; /* Change cursor to pointer on hover */
  transition: background-color 0.3s; /* Smooth transition for hover effect */

  &:hover {
    background-color: #333; /* Darken the button a bit on hover for feedback */
  }

  &:disabled {
    background-color: #666; /* Lighten the button when disabled */
    cursor: not-allowed; /* Change cursor to indicate the button is disabled */
  }
`;

// Adding a styled component for the checkbox label
const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  margin: 10px 0;
  cursor: pointer;
`;

const Checkbox = styled(Field)`
  margin-right: 10px;
`;

const ForgotPasswordWrapper = styled.div`
  display: flex;
  justify-content: flex-end; /* Aligns the child to the right */
  width: 100%; /* Ensures it spans the full width of its parent container */
  margin: 10px 0;
`;

const ForgotPasswordLink = styled.a`
  color: #4A90E2;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center; // Center the buttons
  gap: 20px; // Add space between buttons
  width: 100%;
  margin-top: 20px;
`;

const ForgotPasswordFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  max-width: 550px;
  padding: 40px; /* Increased padding */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  background-color: white;
  color: black;
`;

const signInSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6, 'Password is too short').required('Required'),
});

const signUpSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password is too short').required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), undefined], "Passwords don't match")
    .required('Confirming password is required'),
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  phoneNumber: Yup.string()
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(10, 'Must be exactly 10 digits')
    .max(10, 'Must be exactly 10 digits')
    .required('Phone number is required'),
});

// Yup validation schema for the forgot password email
const forgotPasswordSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Email is required'),
  });

  const SignInSignUpPage = () => {
    const navigate = useNavigate();
    const [isSignUp, setIsSignUp] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [signUpError, setSignUpError] = useState(''); // Add a state for sign-up errors
    const [loginError, setLoginError] = useState(''); 
  

    const toggleForm = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
      setIsSignUp(checked);
      setShowForgotPassword(false);
    };

  const handleForgotPassword = () => {
    setShowForgotPassword(true);
  };

  const handleBack = () => {
    setShowForgotPassword(false);

  };

  // const sendForgotPasswordRequest = (values: any) => {
  //   console.log('Sending forgot password request for:', values.email);
  //   // Here you would send a request to your backend
  //   // This is just a placeholder for demonstration
  //   alert('If this email exists in our database, a password reset link will be sent.');
  //   setShowForgotPassword(false);
  // };

  // db forgot Password
  const sendForgotPasswordRequest = async (
    values: { email: string },
    formikHelpers: FormikHelpers<{ email: string }>
  ) => {
    try {
      await axios.post('http://localhost:3001/api/forgot-password', values);
      alert('If this email is registered, a reset link has been sent.');
      formikHelpers.setSubmitting(false); // Use formikHelpers to set submitting state
      setShowForgotPassword(false); // Optionally, manage the display state based on the operation
    } catch (error: any) {
      const axiosError = error as AxiosError; // Typecast the error to AxiosError for TypeScript
      console.error('Forgot Password Error', axiosError.response?.data || 'An error occurred');
      formikHelpers.setSubmitting(false);
    }
  };

  if (showForgotPassword) {
    return (
        <Container>
      <ForgotPasswordFormContainer>
      <Formik
        initialValues={{ email: '' }}
        validationSchema={forgotPasswordSchema}
        onSubmit={(values, formikHelpers) => {
        sendForgotPasswordRequest(values, formikHelpers);
       }}
      >
          {({ isSubmitting, errors, touched  }) => (
            <Form>
              <FormTitle>Forgot Password</FormTitle>
              <StyledLabel>Email</StyledLabel>
              <InputWrapper>
              <Icon icon={faEnvelope} />
              <StyledInput name="email" type="email" placeholder="Enter your email" />
              {errors.email && touched.email ? (
                <div style={{ color: 'red', marginTop: '0.5rem' }}></div>
              ) : null}
              </InputWrapper>
              <ErrorMessageContainer>
                <ErrorMessage name="email" component="div" />
              </ErrorMessageContainer>
              <ButtonContainer>
              <SubmitButton type="submit" disabled={isSubmitting}>Submit</SubmitButton>
              <SwitchButton onClick={handleBack}>Back</SwitchButton>
              </ButtonContainer>
            </Form>
          )}
        </Formik>
      </ForgotPasswordFormContainer>
      </Container>
    );
  }




    // local signup
    // const handleSignUpSubmit = async (values: SignUpFormValues, { setSubmitting }: FormikHelpers<SignUpFormValues>) => {
    //   try {
    //     await axios.post('http://localhost:8080/api/signup', values);
    //     navigate('/dashboard'); // Navigate to dashboard upon successful signup
    //   } catch (error: any) {
    //     console.error('Sign Up Error', error?.response?.data || 'An error occurred');
    //   } finally {
    //     setSubmitting(false);
    //   }
    // };

    //db signup 
    const handleSignUpSubmit = async (values: SignUpFormValues, { setSubmitting }: FormikHelpers<SignUpFormValues>) => {
      try {
        await axios.post('http://localhost:3001/api/signup', values);
        console.log('Signup successful');
        navigate('/dashboard'); // Navigate to dashboard upon successful signup
        setSignUpError(''); // Clear any previous error messages
      } catch (error: any) {
        console.error('Sign Up Error', error?.response?.data || 'An error occurred');
        // Directly use the backend's error message
        setSignUpError(error?.response?.data?.message || 'An unexpected error occurred. Please try again.');
      } finally {
        setSubmitting(false);
      }
    };
    


  //local login 
    // const handleLoginSubmit = async (values: LoginFormValues, { setSubmitting }: FormikHelpers<LoginFormValues>) => {
    //   try {
    //     await axios.post('http://localhost:8080/api/login', values);
    //     navigate('/dashboard'); // Navigate to dashboard upon successful login
    //   } catch (error: any) {
    //     console.error('Login Error', error?.response?.data || 'An error occurred');
    //   } finally {
    //     setSubmitting(false);
    //   }
    // };

    //db Log in 

    const handleLoginSubmit = async (values: LoginFormValues, { setSubmitting }: FormikHelpers<LoginFormValues>) => {
      try {
        const response = await axios.post('http://localhost:3001/api/login', values);

        const authToken = response.data.token; // Assuming the token is returned in the response
        localStorage.setItem('authToken', authToken); // Save the token to localStorage
        console.log(authToken);


        navigate('/dashboard'); // Navigate to dashboard upon successful login
      } catch (error: any) {
        console.error('Login Error', error?.response?.data || 'An error occurred');
      } finally {
        setSubmitting(false);
      }
    };

  return (
    <Container>
      <FormControlLabel
        control={<Switch checked={isSignUp} onChange={toggleForm} color="primary" />}
        label={isSignUp ? 'Switch to Sign In' : 'Switch to Sign Up'}
      />

      {/* Log-In Form */}
      <FormContainer $show={!isSignUp}>
        <Formik
          initialValues={initialValuesLogin}
          validationSchema={signInSchema}
          onSubmit={handleLoginSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <StyledLabel>Email</StyledLabel>
              <InputWrapper>
               <Icon icon={faEnvelope} />
              <StyledInput name="email" type="email" placeholder="Enter email" />
              </InputWrapper>
              <ErrorMessageContainer>
                <ErrorMessage name="email" component="div" />
              </ErrorMessageContainer>

              <StyledLabel>Password</StyledLabel>
              <InputWrapper>
               <Icon icon={faLock} />
              <StyledInput name="password" type="password" placeholder="Enter password" />
              </InputWrapper>
              <ErrorMessageContainer>
                <ErrorMessage name="password" component="div" />
              </ErrorMessageContainer>
              <CheckboxLabel>
                <Checkbox type="checkbox" name="rememberMe" />
                Remember Me
              </CheckboxLabel>
              
              <SubmitButton type="submit" disabled={isSubmitting}>
             {isSignUp ? 'Sign Up' : 'Sign In'}
             </SubmitButton>
             {loginError && <div style={{ color: 'red' }}> {loginError}</div>}
             <ForgotPasswordWrapper>
          <ForgotPasswordLink onClick={handleForgotPassword}>
            Forgot Password?
          </ForgotPasswordLink>
            </ForgotPasswordWrapper>
            </Form>
          )}
        </Formik>
      </FormContainer>

            {/* Sign-Up Form */}
      <FormContainer $show={isSignUp}>
        <Formik
          initialValues={initialValuesSignUp}
          validationSchema={signUpSchema}
          onSubmit={handleSignUpSubmit} 
        >
          {({ isSubmitting }) => (
            <Form>
              <StyledLabel>Email</StyledLabel>
              <InputWrapper>
              <Icon icon={faEnvelope} />
              <StyledInput name="email" type="email" placeholder="Enter email" />
              </InputWrapper>
              <ErrorMessageContainer>
                <ErrorMessage name="email" component="div" />
              </ErrorMessageContainer>

              <StyledLabel>First Name</StyledLabel>
                <InputWrapper>
                  <Icon icon={faUser} />
                  <StyledInput name="firstName" type="text" placeholder="First Name" />
                </InputWrapper>
                <ErrorMessageContainer>
                 <ErrorMessage name="firstName" component="div" />
                </ErrorMessageContainer>

              <StyledLabel>last Name</StyledLabel>
                <InputWrapper>
                <Icon icon={faUserAlt} />
                  <StyledInput name="lastName" type="text" placeholder="Last Name" />
                </InputWrapper>
                <ErrorMessageContainer>
                 <ErrorMessage name="lastName" component="div" />
                </ErrorMessageContainer>

              <StyledLabel>Phone Number</StyledLabel>
               <InputWrapper>
                <Icon icon={faPhone} />
                <StyledInput name="phoneNumber" type="tel" placeholder="Phone Number" />
               </InputWrapper>
                <ErrorMessageContainer>
                 <ErrorMessage name="phoneNumber" component="div" />
                </ErrorMessageContainer>

              <StyledLabel>Password</StyledLabel>
              <InputWrapper>
              <Icon icon={faLock} />
              <StyledInput name="password" type="password" placeholder="Enter password" />
              </InputWrapper>
              <ErrorMessageContainer>
                <ErrorMessage name="password" component="div" />
              </ErrorMessageContainer>

              <StyledLabel>Confirm Password</StyledLabel>
              <InputWrapper>
              <Icon icon={faLock} />
              <StyledInput name="confirmPassword" type="password" placeholder="Confirm Password" />
              </InputWrapper>
              <ErrorMessageContainer>
                <ErrorMessage name="confirmPassword" component="div" />
              </ErrorMessageContainer>
              <SubmitButton type="submit" disabled={isSubmitting}>
                {isSignUp ? 'Sign Up' : 'Sign In'}
              </SubmitButton>
              {signUpError && <div style={{ color: 'red' }}>{signUpError}</div>}
            </Form>
          )}
        </Formik>
      </FormContainer>
     
    </Container>
  );
};

export default SignInSignUpPage;
