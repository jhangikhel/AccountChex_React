import React from 'react';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
function MoneyInput(props) {
    const { inputRef, onChange, ...other } = props;

    return (
        <NumberFormat
            {...other}
            thousandSeparator={true}
            prefix={'$'}
            getInputRef={inputRef}
            allowNegative={false}
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

MoneyInput.propTypes = {
    inputRef: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};
export default MoneyInput;