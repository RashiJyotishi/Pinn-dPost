import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const navItems = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/contributors", label: "Contributors" },
    { to: "/resources", label: "Resources" },
];

const Header = () => {
    const [isNavOpen, setIsNavOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 flex flex-col md:flex-row bg-blue-500 text-white">
            <nav className='w-full bg-transparent py-1.5'>
                <div className='flex justify-between items-center max-w-6xl mx-auto'>
                    <Link to="/" className="flex">
                        <img
                            src="/Group 8.png"
                            className="h-16 mr-3"
                            alt="Logo"
                        />
                    </Link>
                    <div className='flex items-center md:order-2'>
                        <div className='mx-2 rounded-lg hover:bg-slate-200'>
                            <div
                                className="px-1 py-2 mx-2 space-y-1 md:hidden HAMBURGER-ICON"
                                onClick={() => setIsNavOpen((prev) => !prev)}
                            >
                                <span className="block w-8 h-1 bg-gray-400 rounded-lg animate-pulse"></span>
                                <span className="block w-8 h-1 bg-gray-400 rounded-lg animate-pulse"></span>
                                <span className="block w-8 h-1 bg-gray-400 rounded-lg animate-pulse"></span>
                            </div>
                        </div>
                    </div>
                    <div className="hidden md:flex md:ml-auto">
                        <ul className='flex space-x-6 py-3'>
                            {navItems.map((item) => (
                                <li key={item.to}>
                                    <NavLink
                                        to={item.to}
                                        className={({ isActive }) =>
                                            `px-4 py-2 font-bold text-lg rounded-lg ${isActive ? "text-amber-500" : "text-white"}`
                                        }
                                    >
                                        {item.label}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </nav>
            <div
                className={`md:hidden fixed top-0 right-0 w-56 h-full bg-gray-800 transition-transform transform ${
                    isNavOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
                style={{ zIndex: 1000 }}
            >
                <div
                    className="absolute top-0 right-0 px-8 py-7 CROSS-ICON"
                    onClick={() => setIsNavOpen(false)}
                >
                    <svg
                        className="w-8 h-8 text-gray-600"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </div>
                <ul className="flex flex-col items-start p-4">
                    {navItems.map((item, index) => (
                        <li key={index} className="w-full py-2">
                            <NavLink
                                to={item.to}
                                className={({ isActive }) =>
                                    `block w-full text-white text-lg font-bold py-2 px-4 hover:bg-gray-700 ${
                                        isActive ? 'bg-gray-700 text-yellow-400' : ''
                                    }`
                                }
                                onClick={() => setIsNavOpen(false)}
                            >
                                {item.label}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        </header>
    );
}

export default Header;
