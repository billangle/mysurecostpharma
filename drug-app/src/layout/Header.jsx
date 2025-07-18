import { useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';

const pageTitles = {
  '/': 'Drug List',
  '/adddrugs': 'Add New Drug',
  '/view': 'Drug Details',
  '/edit': 'Edit Drug',
  '/search': 'Search Drugs',
};

export default function Header() {
  const { pathname } = useLocation();
  const basePath = pathname.split('/')[1] || '/';
  const title = pageTitles[pathname] || pageTitles[`/${basePath}`] || 'MySureCostPharma';

  return (
    <header className="flex items-center justify-between bg-blue-900 text-white px-4 py-3 shadow">
      <div className="flex items-center space-x-3">
        <img src={logo} alt="MySureCostPharma" className="w-[300px] h-[117px]"  />
        <h1 className="text-xl font-semibold">{title}</h1>
      </div>
    </header>
  );
}