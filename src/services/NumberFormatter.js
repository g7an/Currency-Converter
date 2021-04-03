import React, { useState } from "react";
import NumberFormat from "react-number-format";

const NumberFormatter = (props) => {
    const { inputRef, onChange, ...other } = props;
    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={values => {
                onChange({
                target: {
                    name: props.name,
                    value: values.value
                }
                });
            }}
            thousandSeparator
            // isNumericString
        />
    )
}
export default NumberFormatter