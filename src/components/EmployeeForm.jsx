import { useState } from 'react';
import PropTypes from 'prop-types';

const EmployeeForm = ({ onAddEmployee, companyIdsArray = undefined, editNumOfWorkers }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        position: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
            companyId: companyIdsArray[0].id
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!companyIdsArray.length || companyIdsArray.length > 1) {
            alert('Пожалуйста, выделите только одну компанию, к которой необходимо добавить сотрудника')
            return
        }
        if (!formData.firstName) {
            alert('Пожалуйста, укажите имя сотрудника')
            return
        }
        if (!formData.lastName) {
            alert('Пожалуйста, укажите фамилию сотрудника')
            return
        }
        if (!formData.position) {
            alert('Пожалуйста, укажите должность сотрудника')
            return
        }
        onAddEmployee(formData);
        editNumOfWorkers(companyIdsArray[0].id, 'ADD')
        setFormData({
            firstName: '',
            lastName: '',
            position: '',
        });
    };

    return (
        <form onSubmit={handleSubmit} className='addTableLineForm'>
            <label>
                Имя:
                <input type="text" name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    disabled={!companyIdsArray.length || companyIdsArray.length > 1}
                    style={{ backgroundColor: (!companyIdsArray.length || companyIdsArray.length > 1) && 'grey' }}
                />
            </label>
            <label>
                Фамилия:
                <input type="text" name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    disabled={!companyIdsArray.length}
                    style={{ backgroundColor: (!companyIdsArray.length || companyIdsArray.length > 1) && 'grey' }}
                />
            </label>
            <label>
                Должность:
                <input type="text" name="position"
                    value={formData.position}
                    onChange={handleChange}
                    disabled={!companyIdsArray.length}
                    style={{ backgroundColor: (!companyIdsArray.length || companyIdsArray.length > 1) && 'grey' }}
                />
            </label>
            <button type="submit">Добавить Сотрудника</button>
        </form>
    );
};

EmployeeForm.propTypes = {
    onAddEmployee: PropTypes.func.isRequired,
    companyIdsArray: PropTypes.array,
    editNumOfWorkers: PropTypes.func.isRequired
};

export default EmployeeForm;
