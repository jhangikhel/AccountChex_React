import React from 'react';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
function MaskInput(props) {
    const { inputRef, onChange, ...other } = props;
    return (
        <NumberFormat
            {...other}
            format="+1 (###) ###-####" mask="_"
            getInputRef={inputRef}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value,
                    },
                });
            }}

            isNumericString

        />
    );
}

MaskInput.propTypes = {
    inputRef: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};
export default MaskInput;