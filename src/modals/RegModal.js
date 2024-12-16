import { Dialog, DialogContent, DialogTitle, Grid, Typography, TextField, Checkbox, Button} from "@mui/material";
import { useState, useEffect } from "react";
import { AXIOS_METHOD, doApiCall } from "../hooks/useApi";
import * as Yup from "yup";
import UserFriendlyAlert from "../components/UserFriendlyAlert";

const validationSchema = Yup.object({
    username: Yup.string()
        .matches(/^[a-zA-Z0-9]+$/, "Csak betűk és számok engedélyezettek")
        .min(3, "Minimum 3 karakter")
        .max(20, "Maximum 20 karakter")
        .required("Kötelező mező"),
    password: Yup.string()
        .min(8, "Minimum 8 karakter")
        .matches(/[a-z]/, "Tartalmaznia kell kisbetűt")
        .matches(/[A-Z]/, "Tartalmaznia kell nagybetűt")
        .matches(/[0-9]/, "Tartalmaznia kell számot")
        .required("Kötelező mező"),
    password2: Yup.string()
        .oneOf([Yup.ref("password"), null], "A jelszavak nem egyeznek")
        .required("Kötelező mező"),
    legal: Yup.bool()
        .oneOf([true], "Kötelező mező")
        .required("Kötelező mező"),
});

export default function RegModal({ onClose }) {

    const [values, setValues] = useState({
        username: '',
        password: '',
        password2: '',
        legal: false,
    });
    const [valuesToReg, setValuesToReg] = useState({});
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);


    useEffect(() => {
        const validateForm = async () => {
            try {
                await validationSchema.validate(values, { abortEarly: false });
                setIsFormValid(true);
                setValuesToReg({
                    name: values.username,
                    password: values.password,
                });
            } catch {
                setIsFormValid(false);
                setValuesToReg({});
            }
        };
        validateForm();
    }, [values]);

    const validateField = async (name, value) => {
        try {
            await validationSchema.validateAt(name, { ...values, [name]: value });
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        } catch (error) {
            setErrors((prev) => ({ ...prev, [name]: error.message }));
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const fieldValue = type === 'checkbox' ? checked : value;

        setValues((prev) => ({ ...prev, [name]: fieldValue }));
        validateField(name, fieldValue);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await validationSchema.validate(values, { abortEarly: false });
            setErrors({});
            setIsSubmitting(true);

            const onFailure = (apiError) => {
                setErrors({ username: apiError });
                setIsSubmitting(false);
            };
            console.log(valuesToReg);
            doApiCall(AXIOS_METHOD.POST, '/reg', (_unusedRegData) => {
                console.log(valuesToReg);
                setOpenSnackbar(true);
                setIsSubmitting(false);
                setTimeout(() => {
                    onClose();
                }, 2000);
            }, onFailure, valuesToReg);
        }

        catch (error) {
            if (error instanceof Yup.ValidationError) {
                const fieldErrors = error.inner.reduce((acc, err) => {
                    acc[err.path] = err.message;
                    return acc;
                }, {});
                setErrors(fieldErrors);
            }
        }
    };

    return (
            <Dialog open={true} onClose={onClose}>
                <DialogTitle>Regisztráció</DialogTitle>
                <DialogContent>
                    <br />
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    label="Username"
                                    name="username"
                                    value={values.username}
                                    onChange={handleChange}
                                    fullWidth
                                    error={Boolean(errors.username)}
                                    helperText={errors.username}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Password"
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
                                <TextField
                                    label="Password again"
                                    name="password2"
                                    type="password"
                                    value={values.password2}
                                    onChange={handleChange}
                                    fullWidth
                                    error={Boolean(errors.password2)}
                                    helperText={errors.password2}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Checkbox
                                    name="legal"
                                    checked={values.legal}
                                    onChange={handleChange}
                                />
                                <Typography variant="body2">Elfogadom a feltételeket</Typography>
                                {errors.legal && (
                                    <Typography variant="body2" color="error">
                                        {errors.legal}
                                    </Typography>
                                )}
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    disabled={isSubmitting || !isFormValid}
                                >
                                    Regisztráció
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </DialogContent>
                <UserFriendlyAlert openSnackbar={openSnackbar} message="Sikeres regisztráció" setOpenSnackbar={setOpenSnackbar}/>                
            </Dialog>
    );
}
