import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../hooks/useAuth";
import { doApiCall, AXIOS_METHOD } from "../hooks/useApi";
import { Grid, TextField, Button } from '@mui/material';


const LoginPage = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    name: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { handleLoginResult } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const errors = {};
    if (!values.name) {
      errors.name = 'Username is required';
    }
    if (!values.password) {
      errors.password = 'Password is required';
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    setErrors(formErrors);

    if (Object.keys(formErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    doApiCall(
      AXIOS_METHOD.POST,
      '/login',
      (data) => {
        const { token, user } = data;
        handleLoginResult({ token, user });
        setIsSubmitting(false);
        navigate('/wallets');
      },
      (apiError) => {
        setErrors({ password: apiError });
        setIsSubmitting(false);
      },
      values
    );
  }
  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            name="name"
            type="text"
            value={values.name}
            onChange={handleChange}
            fullWidth
            error={Boolean(errors.name)}
            helperText={errors.name}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="password"
            type="password"
            value={values.password}
            onChange={handleChange}
            fullWidth
            error={Boolean(errors.password)}
            helperText={errors.password}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={isSubmitting}
          >
            Bejelentkezés
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default LoginPage;
