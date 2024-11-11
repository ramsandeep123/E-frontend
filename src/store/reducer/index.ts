import { combineReducers } from 'redux';
import ecommReducer from "./ecommreducer";

const rootReducer = combineReducers({
    ecomm: ecommReducer,
});


export default rootReducer;
