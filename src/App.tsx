import React, {
    useEffect,
    useReducer,
} from 'react';
import './App.css';
import CalculatorButton from './components/Button/CalculatorButton';
import CalculatorDisplay from './components/Display/CalculatorDisplay';
import {
    calculatorReducer,
    initialState,
} from './hooks/calculatorReducer';
import ButtonPad from './components/ButtonPad/ButtonPad';

function App() {
    const [state, dispatch] = useReducer(calculatorReducer, initialState);

    function handleKeyboardInput(event: any) {
        switch (event.key) {
            case '0':
            case '1':
                dispatch({type: 'numeric', payload: event.key});
                break;
            case 'c':
            case 'C':
                if (event.shiftKey) {
                    dispatch({type: 'utility', payload: 'CE'});
                } else {
                    dispatch({type: 'utility', payload: 'C'});
                }
                break;
            case '+':
            case '-':
                dispatch({type: 'operator', payload: event.key});
                break;
            case '=':
            case 'Enter':
                dispatch({type: 'evaluate', payload: '='});
                break;
        }
    }

    useEffect(() => {
        document.addEventListener('keyup', handleKeyboardInput);
        return () => {
            document.removeEventListener('keyup', handleKeyboardInput);
        };
    });

    return (
        <div
            className="app"
        >
            <form>
                <CalculatorDisplay
                    text={`${state.leftHandSide}${state.operator}${state.rightHandSide}`}
                />
                <ButtonPad>
                    <CalculatorButton
                        dispatch={dispatch}
                        functionType="numeric"
                        label="0"
                    />
                    <CalculatorButton
                        dispatch={dispatch}
                        functionType="numeric"
                        label="1"
                    />
                    <CalculatorButton
                        dispatch={dispatch}
                        functionType="operator"
                        label="+"
                    />
                    <CalculatorButton
                        dispatch={dispatch}
                        functionType="operator"
                        label="-"
                    />
                    <CalculatorButton
                        dispatch={dispatch}
                        functionType="evaluate"
                        label="="
                    />
                    <CalculatorButton
                        dispatch={dispatch}
                        functionType="utility"
                        label="CE"
                    />
                    <CalculatorButton
                        dispatch={dispatch}
                        functionType="utility"
                        label="C"
                    />
                </ButtonPad>
            </form>
        </div>
    );
}

export default App;
