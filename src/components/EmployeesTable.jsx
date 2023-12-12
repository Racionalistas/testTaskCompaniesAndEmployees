import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import EmployeeForm from './EmployeeForm';

const EmployeesTable = ({
    employees,
    companyIdsArray,
    onRemoveEmployees,
    onToggleEmployeeSelection,
    onAddEmployee,
    onSelectAllEmployees,
    handleEmployeeInfoChange,
    editNumOfWorkers
}) => {
    const [selectedAmount, setSelectedAmount] = useState(0);

    useEffect(() => {
        const selectedEmployeeIds = employees.filter(employee => employee.selected);
        setSelectedAmount(selectedEmployeeIds.length);
    }, [employees]);

    const handleToggleAll = (e) => {
        onSelectAllEmployees(e.target.checked);
    };

    const handleToggleEmployee = (employeeId) => {
        onToggleEmployeeSelection(employeeId);
    };

    const handleRemoveSelected = () => {
        const selectedEmployeeIds = employees
            .filter((employee) => employee.selected)
            .map((employee) => employee.id);

        if (!selectedEmployeeIds.length > 0) {
            alert('Не выбрано ни одного сотрудника')
            return
        }

        selectedEmployeeIds.forEach((employeeId) => {
            const selectedEmployee = employees.find((employee) => employee.id === employeeId);
            if (selectedEmployee) {
                editNumOfWorkers(selectedEmployee.companyId, 'SUBSTRACT');
            }
        });
        onRemoveEmployees(selectedEmployeeIds);
    };

    const handleAddEmployee = (employeeData) => {
        onAddEmployee(employeeData);
    };

    return (
        <div className='tableOutput'>
            <h2>Сотрудники</h2>
            <EmployeeForm onAddEmployee={handleAddEmployee} companyIdsArray={companyIdsArray} editNumOfWorkers={editNumOfWorkers} />
            <button onClick={handleRemoveSelected}>Удалить Выбранных Сотрудников</button>
            <table>
                {companyIdsArray.length > 0 && <thead>
                    <tr>
                        <th className='chooseAll'>
                            Выбрать всех
                            <input type="checkbox" checked={employees.length && selectedAmount === employees.length} onChange={handleToggleAll} />
                        </th>
                        <th>Фамилия</th>
                        <th>Имя</th>
                        <th>Должность</th>
                    </tr>
                </thead>
                }

                <tbody>
                    {employees.filter(employee =>
                        companyIdsArray.some(company => company.id === employee.companyId))
                        .map((employee) => (
                            <tr key={employee.id} style={{ backgroundColor: employee.selected ? 'lightblue' : 'white' }}>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={employee.selected}
                                        onChange={() => handleToggleEmployee(employee.id)}
                                    />
                                </td>
                                <td>
                                    <input
                                        value={employee.lastName}
                                        style={{ backgroundColor: employee.selected ? 'lightblue' : 'white' }}
                                        onChange={(event) => { handleEmployeeInfoChange(employee.id, 'lastName', event.target.value) }}
                                    />
                                </td>
                                <td>
                                    <input
                                        value={employee.firstName}
                                        style={{ backgroundColor: employee.selected ? 'lightblue' : 'white' }}
                                        onChange={(event) => { handleEmployeeInfoChange(employee.id, 'firstName', event.target.value) }}
                                    />
                                </td>
                                <td>
                                    <input
                                        value={employee.position}
                                        style={{ backgroundColor: employee.selected ? 'lightblue' : 'white' }}
                                        onChange={(event) => { handleEmployeeInfoChange(employee.id, 'position', event.target.value) }}
                                    />
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

EmployeesTable.propTypes = {
    employees: PropTypes.array.isRequired,
    onRemoveEmployees: PropTypes.func.isRequired,
    onToggleEmployeeSelection: PropTypes.func.isRequired,
    onAddEmployee: PropTypes.func.isRequired,
    onSelectAllEmployees: PropTypes.func.isRequired,
    companyIdsArray: PropTypes.array.isRequired,
    handleEmployeeInfoChange: PropTypes.func.isRequired,
    editNumOfWorkers: PropTypes.func.isRequired
};

export default EmployeesTable;