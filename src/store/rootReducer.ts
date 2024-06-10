import { combineReducers } from "@reduxjs/toolkit";

const counterReducer = (state = 0, action: any) => {
    switch (action.type) {
        case "increment":
            return state + 1;
        case "decrement":
            return state - 1;
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    counter: counterReducer,
});

export default rootReducer;
