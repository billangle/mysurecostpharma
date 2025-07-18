import DrugForm from './DrugForm';
import { useDispatch, useSelector } from 'react-redux';
import { updateDrug } from './drugSlice';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function EditDrugPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const drug = useSelector(state => state.drugs.items.find(d => d.id === id));
  const dispatch = useDispatch();

  if (!drug) return <p className="p-4">Drug not found</p>;

  const handleSubmit = async (data) => {
    try {
      await dispatch(updateDrug({ ...data, id })).unwrap();
      toast.success('Drug updated successfully!');
      navigate('/');
    } catch (error) {
      toast.error('Failed to update drug.');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Drug</h1>
      <DrugForm onSubmit={handleSubmit} defaultValues={drug} />
    </div>
  );
}