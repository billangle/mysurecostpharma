import DrugForm from './DrugForm';
import { useDispatch } from 'react-redux';
import { addDrug } from './drugSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

export default function AddDrugPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    try {
      const payload = { ...data, id: uuidv4() };
      await dispatch(addDrug(payload)).unwrap();
      toast.success('Drug added successfully!');
      navigate('/');
    } catch (error) {
      toast.error('Failed to add drug.');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add New Drug</h1>
      <DrugForm onSubmit={handleSubmit} defaultValues={{ name: '', manufacturer: '', quantity: 0, type: '', price: 0 }} />
    </div>
  );
}