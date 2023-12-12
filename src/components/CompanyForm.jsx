import { useState } from 'react';
import PropTypes from 'prop-types';

const CompanyForm = ({ onAddCompany }) => {
    const [formData, setFormData] = useState({
        name: '',
        employeeCount: '',
        address: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name) {
            alert('Пожалуйста, укажите название компании')
            return
        }
        if (!formData.employeeCount) {
            alert('Пожалуйста, укажите количество сотрудниов')
            return
        }
        if (!formData.address) {
            alert('Пожалуйста, укажите адрес компании')
            return
        }
        onAddCompany(formData);
        setFormData({
            name: '',
            employeeCount: '',
            address: '',
        });
    };

    return (
        <form onSubmit={handleSubmit} className='addTableLineForm'>
            <label>
                Название:
                <input type="text" name="name" value={formData.name} onChange={handleChange} />
            </label>
            <label>
                Количество Сотрудников:
                <input
                    type="number"
                    name="employeeCount"
                    value={formData.employeeCount}
                    onChange={handleChange}
                />
            </label>
            <label>
                Адрес:
                <input type="text" name="address" value={formData.address} onChange={handleChange} />
            </label>
            <button type="submit">Добавить Компанию</button>
        </form>
    );
};

CompanyForm.propTypes = {
    onAddCompany: PropTypes.func.isRequired,
};

export default CompanyForm;
