import { useSelector, useDispatch } from 'react-redux';
import CompaniesTable from '../components/CompaniesTable';
import { addCompany, removeCompanies, toggleCompanySelection, updateAllCompanies, editCompanyParam } from '../store/companiesSlice';

const CompaniesContainer = () => {
    const companies = useSelector(state => state.companies);
    const dispatch = useDispatch();

    const handleCompanyInfoChange = (id, key, value) => {
        dispatch(editCompanyParam({ id, key, value }))
    };

    const handleAddCompany = (companyData) => {
        dispatch(addCompany(companyData));
    };

    const handleRemoveCompanies = (companyIds) => {
        dispatch(removeCompanies(companyIds));
    };

    const handleToggleCompanySelection = (companyId) => {
        dispatch(toggleCompanySelection(companyId));
    };

    const handleSelectAllCompanies = (selectAll) => {
        const updatedCompanies = companies.map(company => ({
            ...company,
            selected: selectAll,
        }));
        dispatch(updateAllCompanies(updatedCompanies));
    };

    const companiesTableProps = {
        companies,
        onAddCompany: handleAddCompany,
        onRemoveCompanies: handleRemoveCompanies,
        onCompanySelection: handleToggleCompanySelection,
        onSelectAllCompanies: handleSelectAllCompanies,
        handleCompanyInfoChange: handleCompanyInfoChange
    };

    return <CompaniesTable {...companiesTableProps} />;
};

export default CompaniesContainer;
