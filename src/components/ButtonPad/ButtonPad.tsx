import React, {FC} from 'react';
import './ButtonPad.css';

interface ButtonPadProps {
    children: any,
}
const ButtonPad: FC<ButtonPadProps> = ({
    children,
}) => {
    return (
        <div className="button-pad">
            {children}
        </div>
    )
}

export default ButtonPad;