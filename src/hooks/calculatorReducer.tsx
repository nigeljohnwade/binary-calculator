interface State {
    inputActive: string,
    leftHandSide: string,
    rightHandSide: string,
    operator: string,
    previousAction: Action | null,
    previousOperation: any,
    previousState: any,
}

interface Action {
    type: string,
    payload: any,
}


export const initialState = {
    inputActive: 'leftHandSide',
    leftHandSide: '',
    rightHandSide: '',
    operator: '',
    previousAction: null,
    previousOperation: null,
    previousState: null,
};

export const calculatorReducer = (state: State, action: Action): State => {
    const activeKey: string = state.inputActive;
    switch (action.type) {
        case 'numeric':
            return {
                ...state,
                [activeKey]: state[activeKey as keyof State] + action.payload,
                previousAction: {
                    ...action,
                },
                previousOperation: null,
                previousState: {...state},
            };
        case 'operator':
            if(!state.leftHandSide){
                return {
                    ...state
                }
            }
            return {
                ...state,
                operator: action.payload,
                inputActive: state.inputActive === 'leftHandSide' ? 'rightHandSide' : 'leftHandSide',
                previousAction: {
                    ...action,
                },
                previousOperation: null,
                previousState: {...state},
            };
        case 'utility':
            if (action.payload === 'C') {
                return {
                    ...initialState
                };
            }
            if (action.payload === 'CE' && state.previousState) {
                return {
                    ...state.previousState,
                    previousOperation: null,
                };
            }
            return {
                ...state,
            };
        case 'evaluate':
            let result = '';
            if (state.previousOperation) {
                state.rightHandSide = state.previousOperation.rightHandSide;
                state.operator = state.previousOperation.operator;
            }
            if (state.operator === '+' && state.leftHandSide && state.rightHandSide) {
                result = (parseInt(state.leftHandSide, 2) + parseInt(state.rightHandSide, 2)).toString(2);
            }
            if (state.operator === '-' && state.leftHandSide && state.rightHandSide) {
                result = (parseInt(state.leftHandSide, 2) - parseInt(state.rightHandSide, 2)).toString(2);
            }
            return {
                ...state,
                inputActive: 'leftHandSide',
                operator: '',
                leftHandSide: result,
                rightHandSide: '',
                previousAction: null,
                previousOperation: {
                    operator: state.operator,
                    rightHandSide: state.rightHandSide
                },
                previousState: null,
            };
    }
    return state;
};
