import { combineReducers } from 'redux';
import companiesReducer from './companiesSlice';
import employeesReducer from './employeesSlice';

const rootReducer = combineReducers({
    companies: companiesReducer,
    employees: employeesReducer
});

export default rootReducer;
