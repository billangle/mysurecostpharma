import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Home, PlusCircle, Search } from 'lucide-react';

export default function Sidebar() {
  const { pathname } = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    { path: '/', label: 'Home', icon: <Home size={18} /> },
    { path: '/adddrugs', label: 'Add New Drug', icon: <PlusCircle size={18} /> },
    { path: '/', label: 'Search', icon: <Search size={18} /> }
  ];

  return (
    <aside className={`bg-blue-100 h-full p-2 transition-all duration-300 ${collapsed ? 'w-16' : 'w-52'}`}>
      <button onClick={() => setCollapsed(!collapsed)} className="text-xs text-blue-900 mb-2">
        {collapsed ? '➤' : 'Collapse'}
      </button>
      <nav className="space-y-2">
        {navItems.map(item => (
          <Link
            key={item.path + item.label}
            to={item.path}
            className={`flex items-center px-2 py-1 rounded hover:bg-blue-200 ${pathname === item.path ? 'bg-blue-300 font-bold' : ''}`}
          >
            {item.icon}
            {!collapsed && <span className="ml-2">{item.label}</span>}
          </Link>
        ))}
      </nav>
    </aside>
  );
}