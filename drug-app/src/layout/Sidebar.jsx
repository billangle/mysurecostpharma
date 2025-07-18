import { NavLink } from 'react-router-dom';
import { PlusCircle, Home, Search } from 'lucide-react';

export default function Sidebar() {
  return (
    <aside className="bg-blue-100 h-full p-2 transition-all duration-300 min-w-[180px] border-r border-blue-200">
      <nav className="flex flex-col space-y-2">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center px-3 py-2 rounded hover:bg-blue-200 ${
              isActive ? 'bg-blue-300 font-bold' : ''
            }`
          }
        >
          <Home size={18} className="mr-2" />
          Home
        </NavLink>

        <NavLink
          to="/adddrugs"
          className={({ isActive }) =>
            `flex items-center px-3 py-2 rounded hover:bg-blue-200 ${
              isActive ? 'bg-blue-300 font-bold' : ''
            }`
          }
        >
          <PlusCircle size={18} className="mr-2" />
          Add New Drug
        </NavLink>

        <NavLink
          to="/search"
          className={({ isActive }) =>
            `flex items-center px-3 py-2 rounded hover:bg-blue-200 ${
              isActive ? 'bg-blue-300 font-bold' : ''
            }`
          }
        >
          <Search size={18} className="mr-2" />
          Search
        </NavLink>
      </nav>
    </aside>
  );
}
