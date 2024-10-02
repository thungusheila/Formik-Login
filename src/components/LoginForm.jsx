import React, { useState } from 'react';
// import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { TextField, Button, Typography, FormControl, InputLabel, Alert,Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { login } from '../redux/authSlice';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <LoginForm />
    </ThemeProvider>
  );
};

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showAlert, setShowAlert] = useState(false); 

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().min(6, 'Must be at least 6 characters').required('Required'),
    }),
    onSubmit: (values, { resetForm }) => {
      dispatch(login({ email: values.email }));
      navigate('/dashboard');
      resetForm(); // Reset the form fields after submission
      setShowAlert(true); // Show alert on successful submission
    },
  });

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="flex-start" // Align items to the left
      justifyContent="center"
      height="100vh"
      px={2} // Add some padding
    
    >

      <form onSubmit={formik.handleSubmit}>
      <Typography variant="h4" component="h1" gutterBottom style={{ color: '#ffffff' }}>
        Login
      </Typography>
      {/* Alert for successful login */}
      {showAlert && (
        <Alert 
          severity="success" 
          onClose={() => setShowAlert(false)} 
          sx={{ marginBottom: '16px' }} // Add margin below the alert
        >
          Successfully logged in!
        </Alert>
      )}
      <p style={{color:'grey',position:'left',}}>Enter your email below to login to your account</p>
      
        {/* Email Field */}
        <InputLabel htmlFor="email" style={{ color: '#ffffff', position: 'static' }}>Email</InputLabel>
        <FormControl fullWidth margin="normal">
        
          <TextField
            id="email"
            name="email"
            placeholder='m@example.com'
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            sx={{
              backgroundColor: '#2c2c2c', // Input field background
              borderRadius: '5px',
              '& .MuiInputBase-input': { color: '#ffffff' }, // Text color
              '& .MuiInputBase-root': { backgroundColor: '#2c2c2c' },
            }}
          />
        </FormControl>

        {/* Password Field */}
        <InputLabel htmlFor="password" style={{ color: '#ffffff', position: 'static' }}>Password</InputLabel>
        <FormControl fullWidth margin="normal">
        
          <TextField
            id="password"
            name="password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            sx={{
              backgroundColor: '#2c2c2c', // Input field background
              borderRadius: '5px',
              '& .MuiInputBase-input': { color: '#ffffff' }, // Text color
              '& .MuiInputBase-root': { backgroundColor: '#2c2c2c' },
            }}
          />
        </FormControl>

        {/* Submit Button */}
        <Button
          variant="contained"
          type="submit"
          fullWidth
          sx={{ mt: 2 , backgroundColor: '#ffffff', // White background
            color: '#000000', // Black text
            '&:hover': {
              backgroundColor: '#f0f0f0', // Slightly darker on hover
            }, }}
        >
          Sign in
        </Button>
      </form>
    </Box>
  );
};
export default LoginForm;