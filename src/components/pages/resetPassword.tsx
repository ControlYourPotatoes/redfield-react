import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';


const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  
  `;
  
  const FormContainer = styled.div`
  padding: 30px;
  border: 1px solid #ccc;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  width:400px;
  background-color: white;
  color: black;
  `;




const InputContainer = styled.div`
  margin-bottom: 20px; // Adjust spacing between fields
`;

const RequirementsContainer = styled.div`
  min-width: 200px;
`;

const SubmitButton = styled.button`
  display: block;
  width: 100%;
  padding: 10px;
  margin-top: 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const ErrorMessageStyled = styled.div`
  
  color: red;
  display: flex;
  visibility: ${(props) => (props.children ? 'visible' : 'hidden')}; // Only show when there are children
`;

const FormAndRequirements = styled.div`
  display: flex;
  flex-direction: row; // Change from column to row
  align-items: flex-end; // Align items at the start of the flex container
  gap: 50px; // Add some gap between the form and the requirements
  justify-content: center; // Center the content horizontally
`;

const Requirement = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'meets',
})<{ meets: boolean }>`
  color: ${props => props.meets ? 'green' : 'red'};
`;


const PasswordRequirements = ({ password }: { password: string }) => {
  const requirements = [
    { test: (password: string) => password.length >= 8, text: "At least 8 characters" },
    { test: (password: string) => /[A-Z]/.test(password), text: "At least one uppercase letter" },
    { test: (password: string) => /[!@#$&*]/.test(password), text: "At least one special character (!@#$&*)" },
    { test: (password: string) => /[0-9]/.test(password), text: "At least one number" },
  ];

  return (
    <RequirementsContainer>
      {requirements.map((requirement, index) => (
        <Requirement key={index} meets={requirement.test(password)}>
        {requirement.text}
        </Requirement>
      ))}
    </RequirementsContainer>
  );
};

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  return (
    <Container>
        <Formik
          initialValues={{ password: '', confirmPassword: '' }}
          validationSchema={Yup.object({
            password: Yup.string()
            .min(8, 'Password is too short')
            .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
            .matches(/[\W_]+/, 'Password must contain at least one special character')
            .matches(/[0-9]/, 'Password must contain at least one number')
            .required('Required'),
            confirmPassword: Yup.string()
              .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
              .required('Required'),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              await axios.post('/api/reset-password', { token, password: values.password });
              alert('Password reset successfully');
              navigate('/login');
            } catch (error) {
              alert('Failed to reset password. Please try again.');
              setSubmitting(false);
            }
          }}
        >
          {({ values }) => (
            <Form>
              
              <FormContainer>
                <h2>Reset Your Password</h2>
                <InputContainer>
                  <label htmlFor="password">New Password </label>
                  <Field name="password" type="password" />
                  <ErrorMessage name="password">
                    {(msg) => <ErrorMessageStyled>{msg || "\u00A0"}</ErrorMessageStyled>}
                  </ErrorMessage>
                </InputContainer>
                <InputContainer>
                  <label htmlFor="confirmPassword">Confirm New Password </label>
                  <Field name="confirmPassword" type="password" />
                  <ErrorMessage name="confirmPassword">
                    {(msg) => <ErrorMessageStyled>{msg || "\u00A0"}</ErrorMessageStyled>}
                  </ErrorMessage>
                </InputContainer>
                <SubmitButton type="submit">Submit</SubmitButton>
              </FormContainer>
              <FormAndRequirements>
              {values.password && <PasswordRequirements password={values.password} />}
              </FormAndRequirements>
            </Form>
          )}
        </Formik>
    </Container>
  );
};

export default ResetPassword;
