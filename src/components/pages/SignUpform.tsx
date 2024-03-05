import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';

const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center; /* Center content vertically */
height: 100vh;
position: relative;
`;

const FormContainer = styled.div<{ show: boolean }>`
flex-direction: column;
transition: all 0.5s ease;
opacity: ${({ show }) => (show ? 1 : 0)};
display: ${({ show }) => (show ? 'flex' : 'none')};
  width: 100%;
  max-width: 550px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  background-color: white;
  min-height: 550px;
  color: black;
  margin-bottom: 20px; /* Adjust spacing between form and button */
`;

const StyledInput = styled(Field)`
  padding: 12px 15px;
  margin: 8px 0;
  width: calc(100% - 30px);
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
  &:focus {
    border-color: #4A90E2;
    outline: none;
  }
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
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6, 'Password is too short').required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), undefined], "Passwords don't match")
    .required('Required'),
});

// Yup validation schema for the forgot password email
const forgotPasswordSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Email is required'),
  });

const SignInSignUpPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
    setShowForgotPassword(false);
  };

  const handleForgotPassword = () => {
    setShowForgotPassword(true);
  };

  const handleBack = () => {
    setShowForgotPassword(false);

  };

  const sendForgotPasswordRequest = (values) => {
    console.log('Sending forgot password request for:', values.email);
    // Here you would send a request to your backend
    // This is just a placeholder for demonstration
    alert('If this email exists in our database, a password reset link will be sent.');
    setShowForgotPassword(false);
  };

  if (showForgotPassword) {
    return (
        <Container>
      <ForgotPasswordFormContainer>
        <Formik
          initialValues={{ email: '' }}
          validationSchema={forgotPasswordSchema}
          onSubmit={(values, { setSubmitting }) => {
            sendForgotPasswordRequest(values);
            setSubmitting(false);
          }}
        >
          {({ isSubmitting, errors, touched  }) => (
            <Form>
              <FormTitle>Forgot Password</FormTitle>
              <StyledLabel>Email</StyledLabel>
              <StyledInput name="email" type="email" placeholder="Enter your email" />
              {errors.email && touched.email ? (
                <div style={{ color: 'red', marginTop: '0.5rem' }}></div>
              ) : null}
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

  return (
    <Container>
      <FormContainer show={!isSignUp}>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={signInSchema}
          onSubmit={(values) => console.log('Sign In', values)}
        >
          {({ isSubmitting }) => (
            <Form>
              <FormTitle>Sign In</FormTitle>
              <StyledLabel>Email</StyledLabel>
              <StyledInput name="email" type="email" placeholder="Enter email" />
              <ErrorMessageContainer>
                <ErrorMessage name="email" component="div" />
              </ErrorMessageContainer>

              <StyledLabel>Password</StyledLabel>
              <StyledInput name="password" type="password" placeholder="Enter password" />
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
             <ForgotPasswordWrapper>
          <ForgotPasswordLink onClick={handleForgotPassword}>
            Forgot Password?
          </ForgotPasswordLink>
            </ForgotPasswordWrapper>
            </Form>
          )}
        </Formik>
      </FormContainer>

      <FormContainer show={isSignUp}>
        <Formik
          initialValues={{ email: '', password: '', confirmPassword: '' }}
          validationSchema={signUpSchema}
          onSubmit={(values) => console.log('Sign Up', values)}
        >
          {({ isSubmitting }) => (
            <Form>
              <FormTitle>Sign Up</FormTitle>
              <StyledLabel>Email</StyledLabel>
              <StyledInput name="email" type="email" placeholder="Enter email" />
              <ErrorMessageContainer>
                <ErrorMessage name="email" component="div" />
              </ErrorMessageContainer>

              <StyledLabel>Password</StyledLabel>
              <StyledInput name="password" type="password" placeholder="Enter password" />
              <ErrorMessageContainer>
                <ErrorMessage name="password" component="div" />
              </ErrorMessageContainer>

              <StyledLabel>Confirm Password</StyledLabel>
              <StyledInput name="confirmPassword" type="password" placeholder="Confirm Password" />
              <ErrorMessageContainer>
                <ErrorMessage name="confirmPassword" component="div" />
              </ErrorMessageContainer>
              <SubmitButton type="submit" disabled={isSubmitting}>
                {isSignUp ? 'Sign Up' : 'Sign In'}
              </SubmitButton>
            </Form>
          )}
        </Formik>
      </FormContainer>

      <SwitchButton onClick={toggleForm}>
        {isSignUp ? "Go to Sign In" : "Go to Sign Up"}
      </SwitchButton>
    </Container>
  );
};

export default SignInSignUpPage;
