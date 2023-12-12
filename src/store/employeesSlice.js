import { createSlice } from '@reduxjs/toolkit';

const initialState = [
    {
        id: 1,
        companyId: 1,
        firstName: 'John',
        lastName: 'Doe',
        position: 'Software Engineer',
        selected: false,
    },
    {
        id: 2,
        companyId: 1,
        firstName: 'Jane',
        lastName: 'Smith',
        position: 'Product Manager',
        selected: false,
    },
    // ... другие сотрудники ...
];

const employeesSlice = createSlice({
    name: 'employees',
    initialState,
    reducers: {
        addEmployee: (state, action) => {
            const newEmployee = {
                id: state.length + 1,
                companyId: action.payload.companyId,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                position: action.payload.position,
                selected: false,
            };
            state.push(newEmployee);
        },
        removeEmployees: (state, action) => {
            const idsToRemove = action.payload;
            return state.filter(employee => !idsToRemove.includes(employee.id));
        },
        toggleEmployeeSelection: (state, action) => {
            const employeeId = action.payload;
            const employee = state.find(e => e.id === employeeId);
            if (employee) {
                employee.selected = !employee.selected;
            }
        },
        updateAllEmployees: (state, action) => {
            return action.payload;
        },
        editEmployeeParam: (state, action) => {
            const { id, key, value } = action.payload
            const employee = state.find(c => c.id === id);
            if (employee)
                employee[key] = value
        }
    },
});

export const { addEmployee, removeEmployees, toggleEmployeeSelection, updateAllEmployees, editEmployeeParam } = employeesSlice.actions;
export default employeesSlice.reducer;
