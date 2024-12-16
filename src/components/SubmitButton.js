import {Button} from "@mui/material";
import React from 'react';

export default function SubmitButton({field, form: {isSubmitting}, ...props}) {
    return (<Button {...field}
                    disabled={isSubmitting}
                    size={"large"}
                    type="submit" fullWidth variant={"outlined"}
                    {...props}>{props.label}</Button>);
};