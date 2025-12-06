import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { cn } from '../utils/cn';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
  const toggleMenu = () => setIsOpen(!isOpen);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    // Close mobile menu when route changes
    setIsOpen(false);
  }, [location]);
  
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Sermons', path: '/sermons' },
    { name: 'Events', path: '/events' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];
  
  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header 
      className={cn(
        'fixed w-full z-50 transition-all duration-300',
        scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      )}
    >
      <div className="container-custom flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <div className="text-2xl font-serif font-bold text-primary-800">
            Wote Central <span className="text-secondary-500">SDA</span>
          </div>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navLinks.map(link => (
            <Link 
              key={link.path}
              to={link.path}
              className={cn(
                'nav-link',
                isActive(link.path) && 'nav-link-active'
              )}
            >
              {link.name}
            </Link>
          ))}
          <Link 
            to="/donate" 
            className="ml-2 btn btn-primary text-sm"
          >
            Give Online
          </Link>
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          onClick={toggleMenu} 
          className="md:hidden text-gray-700 hover:text-primary-600 p-2"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white border-t shadow-lg">
          <div className="container-custom py-4">
            <nav className="flex flex-col space-y-2">
              {navLinks.map(link => (
                <Link 
                  key={link.path}
                  to={link.path}
                  className={cn(
                    'py-2 px-4 rounded-md',
                    isActive(link.path) 
                      ? 'bg-primary-50 text-primary-700 font-medium' 
                      : 'text-gray-700 hover:bg-gray-100'
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <Link 
                to="/donate" 
                className="py-2 px-4 mt-2 bg-primary-600 text-white rounded-md text-center hover:bg-primary-700 transition-colors"
              >
                Give Online
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;