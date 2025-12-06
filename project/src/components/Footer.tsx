import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube, Mail, MapPin, Clock } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-primary-800 text-white">
      <div className="container-custom pt-16 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-serif font-bold text-white mb-4">Wote Central SDA</h3>
            <p className="text-gray-300 mb-4">
              A welcoming community of believers dedicated to sharing God's love, 
              hope, and the Adventist message with our community.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="https://facebook.com" className="text-gray-300 hover:text-white transition-colors">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="https://instagram.com" className="text-gray-300 hover:text-white transition-colors">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="https://youtube.com" className="text-gray-300 hover:text-white transition-colors">
                <Youtube size={20} />
                <span className="sr-only">YouTube</span>
              </a>
            </div>
          </div>
          
          {/* Service Times */}
          <div>
            <h3 className="text-xl font-serif font-bold text-white mb-4">Service Times</h3>
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-start">
                <Clock size={18} className="mt-1 mr-2 text-secondary-400" />
                <div>
                  <p className="font-medium text-sm sm:text-base">Sabbath School</p>
                  <p className="text-gray-300 text-sm">Saturday, 9:30 AM</p>
                </div>
              </div>
              <div className="flex items-start">
                <Clock size={18} className="mt-1 mr-2 text-secondary-400" />
                <div>
                  <p className="font-medium text-sm sm:text-base">Divine Service</p>
                  <p className="text-gray-300 text-sm">Saturday, 11:00 AM</p>
                </div>
              </div>
              <div className="flex items-start">
                <Clock size={18} className="mt-1 mr-2 text-secondary-400" />
                <div>
                  <p className="font-medium text-sm sm:text-base">Prayer Meeting</p>
                  <p className="text-gray-300 text-sm">Wednesday, 7:00 PM</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-serif font-bold text-white mb-4">Quick Links</h3>
            <ul className="space-y-1 sm:space-y-2 text-sm sm:text-base">
              <li><Link to="/about/beliefs" className="text-gray-300 hover:text-white transition-colors">Our Beliefs</Link></li>
              <li><Link to="/about/leadership" className="text-gray-300 hover:text-white transition-colors">Leadership</Link></li>
              <li><Link to="/events" className="text-gray-300 hover:text-white transition-colors">Upcoming Events</Link></li>
              <li><Link to="/sermons" className="text-gray-300 hover:text-white transition-colors">Recent Sermons</Link></li>
              <li><Link to="/donate" className="text-gray-300 hover:text-white transition-colors">Support Our Mission</Link></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-serif font-bold text-white mb-4">Contact Us</h3>
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-start">
                <MapPin size={18} className="mt-1 mr-2 text-secondary-400" />
                <p className="text-gray-300 text-sm sm:text-base">123 Faith Avenue<br />Hopeville, CA 90210</p>
              </div>
              <div className="flex items-start">
                <Mail size={18} className="mt-1 mr-2 text-secondary-400" />
                <p className="text-gray-300 text-sm sm:text-base break-all">info@hopesdachurch.org</p>
              </div>
              <div className="flex items-start">
                <Clock size={18} className="mt-1 mr-2 text-secondary-400" />
                <p className="text-gray-300 text-sm sm:text-base">Office Hours: Mon-Thu, 9AM - 4PM</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400 text-xs sm:text-sm">
          <p>© {currentYear} Wote Central Seventh-day Adventist. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;