import React, { FC } from 'react';
import './CalculatorDisplay.css';

interface DisplayProps {
    text: string,
}

const CalculatorDisplay: FC<DisplayProps> = ({
    text,
}) => {
    return(
        <div className="calculator-display">{text}</div>
    )
}

export default CalculatorDisplay;