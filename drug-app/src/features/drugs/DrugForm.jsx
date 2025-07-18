import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object({
  name: yup.string().required('Name is a required field'),
  manufacturer: yup.string().required('Manufacturer is a required field'),
  quantity: yup.number().min(1, 'Quantity must be greater than or equal to 1').required(),
  type: yup.string().required('Type is a required field'),
  price: yup.number().min(0, 'Price must be a non-negative number').required(),
});

function DrugForm({ onSubmit, defaultValues }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <div>
        <input {...register("name")} placeholder="Name" className="w-full p-2 border rounded" />
        <p className="text-red-500 text-sm">{errors.name?.message}</p>
      </div>
      <div>
        <input {...register("manufacturer")} placeholder="Manufacturer" className="w-full p-2 border rounded" />
        <p className="text-red-500 text-sm">{errors.manufacturer?.message}</p>
      </div>
      <div>
        <input type="number" {...register("quantity")} placeholder="Quantity" className="w-full p-2 border rounded" />
        <p className="text-red-500 text-sm">{errors.quantity?.message}</p>
      </div>
      <div>
        <input {...register("type")} placeholder="Type" className="w-full p-2 border rounded" />
        <p className="text-red-500 text-sm">{errors.type?.message}</p>
      </div>
      <div>
        <input type="number" {...register("price")} placeholder="Price" className="w-full p-2 border rounded" />
        <p className="text-red-500 text-sm">{errors.price?.message}</p>
      </div>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
    </form>
  );
}

export default DrugForm;