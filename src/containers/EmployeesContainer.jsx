import { useSelector, useDispatch } from 'react-redux';
import EmployeesTable from '../components/EmployeesTable';
import { addEmployee, removeEmployees, toggleEmployeeSelection, updateAllEmployees, editEmployeeParam } from '../store/employeesSlice';
import { editCompanyEmployees } from '../store/companiesSlice';

const EmployeesContainer = () => {
    const dispatch = useDispatch();
    const employees = useSelector((state) => state.employees);
    const selectedCompanys = useSelector((state) => state.companies).filter(company => company.selected);

    const handleAddEmployee = (employeeData) => {
        dispatch(addEmployee(employeeData));
    };

    const handleEmployeeInfoChange = (id, key, value) => {
        dispatch(editEmployeeParam({ id, key, value }))
    };

    const handleRemoveEmployees = (employeeIds) => {
        dispatch(removeEmployees(employeeIds));
    };

    const handleToggleEmployeeSelection = (employeeId) => {
        dispatch(toggleEmployeeSelection(employeeId));
    };

    const editNumOfWorkers = (companyId, operation) => {
        dispatch(editCompanyEmployees({ companyId, operation }))
    }

    const handleSelectAllEmployees = (selectAll) => {
        const updatedEmployees = employees.map(employee => ({
            ...employee,
            selected: selectAll,
        }));
        dispatch(updateAllEmployees(updatedEmployees));
    };

    const employeesTableProps = {
        employees,
        onAddEmployee: handleAddEmployee,
        onRemoveEmployees: handleRemoveEmployees,
        onToggleEmployeeSelection: handleToggleEmployeeSelection,
        onSelectAllEmployees: handleSelectAllEmployees,
        handleEmployeeInfoChange: handleEmployeeInfoChange,
        companyIdsArray: selectedCompanys,
        editNumOfWorkers: editNumOfWorkers
    };

    return <EmployeesTable {...employeesTableProps} />;
};

export default EmployeesContainer;
