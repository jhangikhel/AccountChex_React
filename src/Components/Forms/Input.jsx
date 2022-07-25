import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';

const Input = (props) => {
    const { type, label } = props;
    return (
        <TextField
            variant="outlined"
            error={true}
            margin="normal"
            helperText={stateObj.error.email}
            fullWidth
            type={type}
            id="email"
            label={label}
            name="email"
            autoComplete="email"
            onChange={changeHandler}
            autoFocus
        />
    );
}
Input.propTypes = {
    type: PropTypes.string,
    label: PropTypes.string.isRequired
};
Input.defaultProps = {
    type: "text"
}
export default Input;