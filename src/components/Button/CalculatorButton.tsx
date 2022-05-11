import React, { FC } from 'react';
import './CalculatorButton.css';

interface ButtonProps {
    functionType: string,
    dispatch?: any,
    label: string,
}

const CalculatorButton: FC<ButtonProps> = ({
    dispatch,
    functionType,
    label,
}) => {
    return (
        <button
            className="calculator-button"
            onClick={() => dispatch({type: functionType, payload: label})}
            type='button'
        >
            {label}
        </button>
    );
};

export default CalculatorButton;