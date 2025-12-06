import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  Calendar,
  Image,
  BookOpen,
  Heart,
  Mail,
  Settings,
  LogOut,
  Shield
} from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import SermonsManager from '../components/admin/SermonsManager';
import EventsManager from '../components/admin/EventsManager';
import TeamManager from '../components/admin/TeamManager';
import GalleryManager from '../components/admin/GalleryManager';
import MessagesViewer from '../components/admin/MessagesViewer';
import DonationsViewer from '../components/admin/DonationsViewer';
import AdminsManager from '../components/admin/AdminsManager';

interface Admin {
  id: string;
  email: string;
  full_name: string;
  role: string;
}

const AdminDashboard: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<Admin | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState({
    sermons: 0,
    events: 0,
    teamMembers: 0,
    contactMessages: 0,
    donations: 0,
    galleryImages: 0
  });
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
    loadStats();
  }, []);

  const checkAuth = async () => {
    const adminData = localStorage.getItem('adminUser');
    if (adminData) {
      setCurrentUser(JSON.parse(adminData));
    } else {
      navigate('/admin/login');
    }
  };

  const loadStats = async () => {
    try {
      const [sermons, events, teamMembers, contactMessages, donations, galleryImages] = await Promise.all([
        supabase.from('sermons').select('id', { count: 'exact' }),
        supabase.from('events').select('id', { count: 'exact' }),
        supabase.from('team_members').select('id', { count: 'exact' }),
        supabase.from('contact_messages').select('id', { count: 'exact' }),
        supabase.from('donations').select('id', { count: 'exact' }),
        supabase.from('gallery_images').select('id', { count: 'exact' })
      ]);

      setStats({
        sermons: sermons.count || 0,
        events: events.count || 0,
        teamMembers: teamMembers.count || 0,
        contactMessages: contactMessages.count || 0,
        donations: donations.count || 0,
        galleryImages: galleryImages.count || 0
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminUser');
    navigate('/admin/login');
  };

  const allMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Settings },
    { id: 'sermons', label: 'Sermons', icon: BookOpen },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'team', label: 'Team Members', icon: Users },
    { id: 'gallery', label: 'Gallery', icon: Image },
    { id: 'messages', label: 'Messages', icon: Mail },
    { id: 'donations', label: 'Donations', icon: Heart },
    { id: 'admins', label: 'Admin Users', icon: Shield, superAdminOnly: true },
  ];

  const menuItems = allMenuItems.filter(item => {
    if (item.superAdminOnly) {
      return currentUser?.role === 'super_admin';
    }
    return true;
  });

  const statCards = [
    { title: 'Sermons', count: stats.sermons, icon: BookOpen, color: 'bg-blue-500' },
    { title: 'Events', count: stats.events, icon: Calendar, color: 'bg-green-500' },
    { title: 'Team Members', count: stats.teamMembers, icon: Users, color: 'bg-orange-500' },
    { title: 'Messages', count: stats.contactMessages, icon: Mail, color: 'bg-yellow-500' },
    { title: 'Donations', count: stats.donations, icon: Heart, color: 'bg-red-500' },
    { title: 'Gallery Images', count: stats.galleryImages, icon: Image, color: 'bg-teal-500' },
  ];

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-serif font-bold text-gray-900">
                Church Admin Panel
              </h1>
              <p className="text-sm text-gray-600">
                Welcome back, {currentUser.full_name}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">
                Role: {currentUser.role.replace('_', ' ').toUpperCase()}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center px-3 py-2 text-sm text-gray-700 hover:text-red-600 transition-colors"
              >
                <LogOut size={16} className="mr-1" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-64">
            <nav className="bg-white rounded-lg shadow-sm p-4">
              <ul className="space-y-2">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.id}>
                      <button
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                          activeTab === item.id
                            ? 'bg-primary-100 text-primary-700'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <Icon size={16} className="mr-3" />
                        {item.label}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          <div className="flex-1">
            {activeTab === 'dashboard' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">
                  Dashboard Overview
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {statCards.map((card, index) => {
                    const Icon = card.icon;
                    return (
                      <motion.div
                        key={card.title}
                        className="bg-white rounded-lg shadow-sm p-6 cursor-pointer hover:shadow-md transition-shadow"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        onClick={() => {
                          const tabMap: Record<string, string> = {
                            'Sermons': 'sermons',
                            'Events': 'events',
                            'Team Members': 'team',
                            'Messages': 'messages',
                            'Donations': 'donations',
                            'Gallery Images': 'gallery'
                          };
                          setActiveTab(tabMap[card.title]);
                        }}
                      >
                        <div className="flex items-center">
                          <div className={`${card.color} p-3 rounded-lg`}>
                            <Icon size={24} className="text-white" />
                          </div>
                          <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">
                              {card.title}
                            </p>
                            <p className="text-2xl font-bold text-gray-900">
                              {card.count}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Quick Actions
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Select a section from the sidebar to manage church content, view messages, or administer users.
                  </p>
                </div>
              </motion.div>
            )}

            {activeTab === 'sermons' && <SermonsManager />}
            {activeTab === 'events' && <EventsManager />}
            {activeTab === 'team' && <TeamManager />}
            {activeTab === 'gallery' && <GalleryManager />}
            {activeTab === 'messages' && <MessagesViewer />}
            {activeTab === 'donations' && <DonationsViewer />}
            {activeTab === 'admins' && currentUser?.role === 'super_admin' && <AdminsManager />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
