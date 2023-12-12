import CompaniesContainer from './containers/CompaniesContainer';
import EmployeesContainer from './containers/EmployeesContainer';
import './App.css'
import { Provider } from 'react-redux';
import store from './store/store'

const App = () => {
  return (
    <Provider store={store}>
      <CompaniesContainer />
      <EmployeesContainer />
    </Provider>
  );
};

export default App;