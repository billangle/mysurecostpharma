import { Provider } from 'react-redux';
import { store } from './app/store';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DrugCardList from './features/drugs/DrugCardList';
import AddDrugPage from './features/drugs/AddDrugPage';
import ViewDrugPage from './features/drugs/ViewDrugPage';
import EditDrugPage from './features/drugs/EditDrugPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from './layout/Layout';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<DrugCardList />} />
            <Route path="/adddrugs" element={<AddDrugPage />} />
            <Route path="/view/:id" element={<ViewDrugPage />} />
            <Route path="/edit/:id" element={<EditDrugPage />} />
            <Route path="/search" element={<DrugCardList />} />
          </Routes>
        </Layout>
        <ToastContainer />
      </Router>
    </Provider>
  );
}

export default App;