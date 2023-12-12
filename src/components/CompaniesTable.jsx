import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import CompanyForm from './CompanyForm';

const CompaniesTable = ({
    companies,
    onSelectAllCompanies,
    onCompanySelection,
    onAddCompany,
    onRemoveCompanies,
    handleCompanyInfoChange
}) => {
    const [selectedAmount, setSelectedAmount] = useState(0);

    useEffect(() => {
        const selectedCompanies = companies.filter(company => company.selected);
        setSelectedAmount(selectedCompanies.length);
    }, [companies]);


    const handleSelectAll = (e) => {
        onSelectAllCompanies(e.target.checked);
    };

    const handleCompanySelection = (companyId) => {
        onCompanySelection(companyId);
    };

    const handleAddCompany = (companyData) => {
        onAddCompany(companyData);
    };

    const handleRemoveSelectedCompanies = () => {
        const selectedCompanyIds = companies
            .filter((company) => company.selected)
            .map((company) => company.id);
        if (!selectedCompanyIds.length > 0) {
            alert('Не выбрано ни одной компании')
            return
        }
        onRemoveCompanies(selectedCompanyIds);
    };

    return (
        <div className='tableOutput'>
            <h2>Компании</h2>
            <CompanyForm onAddCompany={handleAddCompany} />
            <button onClick={handleRemoveSelectedCompanies}>Удалить Выбранные Компании</button>
            <table>
                <thead>
                    <tr>
                        <th className='chooseAll'>
                            Выбрать все
                            <input type="checkbox" checked={companies.length && selectedAmount === companies.length} onChange={handleSelectAll} />
                        </th>
                        <th>Название</th>
                        <th>Количество Сотрудников</th>
                        <th>Адрес</th>
                    </tr>
                </thead>

                <tbody>
                    {companies.map((company) => (
                        <tr key={company.id} style={{ backgroundColor: company.selected ? 'lightblue' : 'white' }}>
                            <td>
                                <input
                                    type="checkbox"
                                    onChange={() => handleCompanySelection(company.id)}
                                    checked={company.selected}
                                />
                            </td>
                            <td>
                                <input
                                    value={company.name}
                                    style={{ backgroundColor: company.selected ? 'lightblue' : 'white' }}
                                    onChange={(event) => { handleCompanyInfoChange(company.id, 'name', event.target.value) }}
                                />
                            </td>
                            <td>{company.employeeCount}</td>
                            <td>
                                <input
                                    value={company.address}
                                    style={{ backgroundColor: company.selected ? 'lightblue' : 'white' }}
                                    onChange={(event) => { handleCompanyInfoChange(company.id, 'address', event.target.value) }}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

CompaniesTable.propTypes = {
    companies: PropTypes.array.isRequired,
    onSelectAllCompanies: PropTypes.func.isRequired,
    onCompanySelection: PropTypes.func.isRequired,
    onAddCompany: PropTypes.func.isRequired,
    onRemoveCompanies: PropTypes.func.isRequired,
    handleCompanyInfoChange: PropTypes.func.isRequired
};

export default CompaniesTable;