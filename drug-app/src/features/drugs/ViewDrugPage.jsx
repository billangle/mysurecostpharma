import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';

export default function ViewDrugPage() {
  const { id } = useParams();
  const drug = useSelector(state => state.drugs.items.find(d => d.id === id));

  if (!drug) {
    return <p className="p-4">Drug not found.</p>;
  }

  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-2">{drug.name}</h1>
      <p><strong>Manufacturer:</strong> {drug.manufacturer}</p>
      <p><strong>Type:</strong> {drug.type}</p>
      <p><strong>Quantity:</strong> {drug.quantity}</p>
      <p><strong>Price:</strong> ${drug.price}</p>
      <Link to={`/edit/${drug.id}`} className="text-blue-600 underline mt-4 block">Edit</Link>
    </div>
  );
}