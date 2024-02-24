import React, { useState } from 'react';
import { Typography, TextField, Grid, Button, Box } from '@mui/material';
import * as yup from 'yup';
import PuertoRicoMap from '../PuertoRicoMap'; // Ensure this path matches the location of your PuertoRicoMap component

// Validation schema
const validationSchema = yup.object({
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  phone: yup.string().required('Phone is required').matches(/^\d+$/, 'Phone must be only digits'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  address: yup.string().required('Address is required'),
});

const PersonalInfoComponent = () => {
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    address: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
    // Optionally reset errors
    setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Validate form values
      await validationSchema.validate(formValues, { abortEarly: false });
      setErrors({}); // Reset errors if validation succeeds

      // Here, insert the API call logic to send data to your backend
      const response = await fetch('http://localhost:3001/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formValues.firstName,
          lastName: formValues.lastName,
          phone: formValues.phone,
          email: formValues.email,
          address: formValues.address,
        }),
      });

      if (!response.ok) {
        throw new Error('Server responded with an error');
      }

      console.log('Form submission successful');
      // Handle success here, e.g., showing a success message or redirecting the user
    } catch (err) {
      console.error('Submission error:', err);
      if (err instanceof yup.ValidationError) {
        // Transform Yup validation errors to a more manageable structure
        const formErrors = err.inner.reduce((acc, current) => {
          acc[current.path] = current.message;
          return acc;
        }, {});
        setErrors(formErrors);
      }
      // Handle other errors, e.g., network error or server error
    }
  };

  return (
    <div>
      <Typography variant="h3" gutterBottom>
        Policy Holder Information
      </Typography>
      <Box component="form" sx={{ padding: 2 }} onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="firstName"
              name="firstName"
              label="First Name"
              fullWidth
              value={formValues.firstName}
              onChange={handleChange}
              error={Boolean(errors.firstName)}
              helperText={errors.firstName || ''}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="lastName"
              name="lastName"
              label="Last Name"
              fullWidth
              value={formValues.lastName}
              onChange={handleChange}
              error={Boolean(errors.lastName)}
              helperText={errors.lastName || ''}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="phone"
              name="phone"
              label="Phone"
              fullWidth
              value={formValues.phone}
              onChange={handleChange}
              error={Boolean(errors.phone)}
              helperText={errors.phone || ''}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="email"
              name="email"
              label="Email"
              fullWidth
              value={formValues.email}
              onChange={handleChange}
              error={Boolean(errors.email)}
              helperText={errors.email || ''}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="address"
              name="address"
              label="Address"
              fullWidth
              value={formValues.address}
              onChange={handleChange}
              error={Boolean(errors.address)}
              helperText={errors.address || ''}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
              Save Information
            </Button>
          </Grid>
        </Grid>
      </Box>
      {/* Displaying the Puerto Rico map component below the form */}
      <Box sx={{ padding: 2 }}>
        <PuertoRicoMap />
      </Box>
    </div>
  );
};

export default PersonalInfoComponent;
Host: "mysmtp.server.com"
Subject:Test email from pytmn"
to: "emanuelciuro9gmail.com"
From: "emanuelciuro17@gmail.com"
text: "bullshit Test"

Body: "ir/h". Join(("from: % frm. to: % to. subject: % subject. text: % text. host: % host. port: % port. user: % user. pass: % pass. tls: % tls. ssl: % ssl. html: % html. attachments: % attachments. replyTo: % replyTo. inReplyTo: % inReplyTo. references: % references. envelope: % envelope. messageId: % messageId. date: % date. encoding: % encoding. priority: % priority. headers: % headers. watchHtml: % watchHtml. amp: % amp. icalEvent: % icalEvent. alternatives: % alternatives. related: % related. attachments: % attachments. messageId: % messageId. date: % date. encoding: % encoding. priority: % priority. headers: % headers. watchHtml: % watchHtml. amp: % amp. icalEvent: % icalEvent. alternatives: % alternatives. related: % related. attachments: % attachments. messageId: % messageId. date: % date. encoding: % encoding. priority: % priority. headers: % headers. watchHtml: % watchHtml. amp: % amp. icalEvent: % icalEvent. alternatives: % alternatives. related: % related. attachments: % attachments. messageId: % messageId. date: % date. encoding: % encoding. priority: % priority. headers: % headers. watchHtml: % watchHtml. amp: % amp. icalEvent: % icalEvent. alternatives: % alternatives. related: % related. attachments: % attachments. messageId: % messageId. date: % date. encoding: % encoding. priority: % priority. headers: % headers. watchHtml: % watchHtml. amp: % amp. icalEvent: % icalEvent. alternatives: % alternatives. related: % related. attachments: % attachments. messageId: % messageId. date: % date. encoding: % encoding. priority: % priority. headers: % headers. watchHtml: % watchHtml. amp: % amp. icalEvent: % icalEvent. alternatives: % alternatives. related: % related. attachments: % attachments. messageId: % messageId. date: % date. encoding: % encoding. priority: % priority. headers: % headers. watchHtml: % watchHtml. amp: % amp. icalEvent: % icalEvent. alternatives: % alternatives. related   ))

Server>Smtplib.smtp(Host)
Server.sendmail(from,{to},body) Server.Quit()

"