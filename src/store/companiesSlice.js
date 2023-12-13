import { createSlice } from '@reduxjs/toolkit';

const initialState = [
    {
        id: 1,
        name: 'Company A',
        employeeCount: 50,
        address: '123 Main St',
        selected: false,
    },
    {
        id: 2,
        name: 'Company B',
        employeeCount: 30,
        address: '456 Elm St',
        selected: false,
    },
    // ... другие компании ...
];

const companiesSlice = createSlice({
    name: 'companies',
    initialState,
    reducers: {
        addCompany: (state, action) => {
            const newCompany = {
                id: state.length + 1,
                name: action.payload.name,
                employeeCount: action.payload.employeeCount,
                address: action.payload.address,
                selected: false,
            };
            state.push(newCompany);
        },
        removeCompanies: (state, action) => {
            const idsToRemove = action.payload;
            return state.filter(company => !idsToRemove.includes(company.id));
        },
        toggleCompanySelection: (state, action) => {
            const companyId = action.payload;
            const company = state.find(c => c.id === companyId);
            if (company) {
                company.selected = !company.selected;
            }
        },
        updateAllCompanies: (state, action) => {
            return action.payload;
        },
        editCompanyParam: (state, action) => {
            const { id, key, value } = action.payload
            const company = state.find(c => c.id === id);
            if (company) {
                company[key] = value
            }
        },
        editCompanyEmployees: (state, action) => {
            const { companyId, operation } = action.payload;
            const company = state.find(c => c.id === companyId);
            if (company) {
                if (operation === 'SUBSTRACT') {
                    company.employeeCount -= 1;
                } else if (operation === 'ADD') {
                    company.employeeCount = parseInt(company.employeeCount) + 1;
                }
            }
        },

    },
});

export const { addCompany, removeCompanies, toggleCompanySelection, updateAllCompanies, editCompanyParam, editCompanyEmployees } = companiesSlice.actions;
export default companiesSlice.reducer;
