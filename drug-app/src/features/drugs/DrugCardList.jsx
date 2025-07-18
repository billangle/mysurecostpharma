import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchDrugs,
  deleteDrug,
  setSearchTerm,
  setCurrentPage
} from './drugSlice';
import { Link, useLocation } from 'react-router-dom';
import { Eye, Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';

const ITEMS_PER_PAGE = 5;

export default function DrugCardList() {
  const dispatch = useDispatch();
  const location = useLocation();
  const drugs = useSelector((state) => state.drugs.items);
  const status = useSelector((state) => state.drugs.status);
  const searchTerm = useSelector((state) => state.drugs.searchTerm);
  const currentPage = useSelector((state) => state.drugs.currentPage);

  // 🔁 Refetch and reset state on route navigation
  useEffect(() => {
    dispatch(fetchDrugs());
    dispatch(setSearchTerm(''));
    dispatch(setCurrentPage(0));
  }, [location.pathname, dispatch]);

  const handleDelete = (drug) => {
    const confirmed = window.confirm(`Delete "${drug.name}"?`);
    if (confirmed) {
      dispatch(deleteDrug(drug.id))
        .unwrap()
        .then(() => toast.success(`"${drug.name}" deleted`))
        .catch(() => toast.error(`Failed to delete "${drug.name}"`));
    }
  };

  const filteredDrugs = drugs.filter((d) =>
    d.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const start = currentPage * ITEMS_PER_PAGE;
  const paginatedDrugs = filteredDrugs.slice(start, start + ITEMS_PER_PAGE);

  if (status === 'loading') {
    return <div className="text-center mt-10 text-blue-600">Loading drugs...</div>;
  }

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Search drugs..."
        value={searchTerm}
        onChange={(e) => {
          dispatch(setSearchTerm(e.target.value));
          dispatch(setCurrentPage(0));
        }}
        className="mb-4 p-2 border rounded w-full max-w-md"
      />

      {filteredDrugs.length === 0 ? (
        <div className="text-center mt-8 text-gray-600">
          No drugs found.{' '}
          <Link to="/adddrugs" className="text-blue-500 underline">
            Add one?
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {paginatedDrugs.map((drug) => (
            <div
              key={drug.id}
              className="bg-white shadow-lg rounded-lg p-6 border border-gray-200"
            >
              <h2 className="text-xl font-bold text-indigo-700 mb-1">
                <Link to={`/view/${drug.id}`} className="hover:underline">
                  {drug.name}
                </Link>
              </h2>
              <p className="text-sm text-gray-500">Manufacturer: {drug.manufacturer}</p>
              <p className="text-sm text-gray-500">Type: {drug.type}</p>
              <p className="text-sm text-gray-500">Qty: {drug.quantity}</p>
              <p className="text-sm text-gray-500 mb-2">Price: ${drug.price}</p>

              <div className="flex items-center space-x-4 mt-2">
                <Link
                  to={`/view/${drug.id}`}
                  className="text-blue-600 hover:text-blue-800 flex items-center space-x-1"
                >
                  <Eye size={18} />
                  <span>View</span>
                </Link>

                <button
                  onClick={() => handleDelete(drug)}
                  className="text-red-600 hover:text-red-800 flex items-center space-x-1"
                >
                  <Trash2 size={18} />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center space-x-4 mt-6">
        <button
          disabled={currentPage === 0}
          onClick={() => dispatch(setCurrentPage(currentPage - 1))}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <button
          disabled={start + ITEMS_PER_PAGE >= filteredDrugs.length}
          onClick={() => dispatch(setCurrentPage(currentPage + 1))}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
