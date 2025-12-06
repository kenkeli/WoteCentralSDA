import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, UserCheck, UserX } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { hashPassword } from '../../utils/auth';
import Modal from '../Modal';
import ConfirmDialog from '../ConfirmDialog';

interface Admin {
  id: string;
  email: string;
  full_name: string;
  role: string;
  is_active: boolean;
  last_login: string;
  created_at: string;
}

const AdminsManager: React.FC = () => {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [currentUser, setCurrentUser] = useState<Admin | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<Admin | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    full_name: '',
    role: 'admin',
    is_active: true
  });

  useEffect(() => {
    checkAuth();
    loadAdmins();
  }, []);

  const checkAuth = () => {
    const adminData = localStorage.getItem('adminUser');
    if (adminData) {
      setCurrentUser(JSON.parse(adminData));
    }
  };

  const isSuperAdmin = currentUser?.role === 'super_admin';

  const loadAdmins = async () => {
    try {
      const { data, error } = await supabase
        .from('admins')
        .select('id, email, full_name, role, is_active, last_login, created_at')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAdmins(data || []);
    } catch (error) {
      console.error('Error loading admins:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isSuperAdmin) {
      setError('Only Super Admins can create or edit admin users.');
      return;
    }

    setIsSaving(true);
    setError('');

    try {
      if (selectedAdmin) {
        const updateData: any = {
          full_name: formData.full_name,
          role: formData.role,
          is_active: formData.is_active
        };

        if (formData.password) {
          updateData.password_hash = await hashPassword(formData.password);
        }

        const { error } = await supabase
          .from('admins')
          .update(updateData)
          .eq('id', selectedAdmin.id);
        if (error) throw error;
      } else {
        const password_hash = await hashPassword(formData.password);
        const { error } = await supabase
          .from('admins')
          .insert([{
            email: formData.email,
            password_hash,
            full_name: formData.full_name,
            role: formData.role,
            is_active: formData.is_active
          }]);
        if (error) throw error;
      }
      setIsModalOpen(false);
      resetForm();
      await loadAdmins();
    } catch (error: any) {
      console.error('Error saving admin:', error);
      setError(error.message || 'Error saving admin. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedAdmin) return;

    if (!isSuperAdmin) {
      alert('Only Super Admins can delete admin users.');
      return;
    }

    try {
      const { error } = await supabase
        .from('admins')
        .delete()
        .eq('id', selectedAdmin.id);
      if (error) throw error;
      setSelectedAdmin(null);
      await loadAdmins();
    } catch (error: any) {
      console.error('Error deleting admin:', error);
      alert(`Error deleting admin: ${error.message || 'Please try again.'}`);
    }
  };

  const handleEdit = (admin: Admin) => {
    if (!isSuperAdmin) {
      alert('Only Super Admins can edit admin users.');
      return;
    }
    setSelectedAdmin(admin);
    setFormData({
      email: admin.email,
      password: '',
      full_name: admin.full_name,
      role: admin.role,
      is_active: admin.is_active
    });
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    if (!isSuperAdmin) {
      alert('Only Super Admins can add new admin users.');
      return;
    }
    resetForm();
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setSelectedAdmin(null);
    setError('');
    setFormData({
      email: '',
      password: '',
      full_name: '',
      role: 'admin',
      is_active: true
    });
  };

  const toggleActive = async (admin: Admin) => {
    if (!isSuperAdmin) {
      alert('Only Super Admins can activate/deactivate admin users.');
      return;
    }

    try {
      const { error } = await supabase
        .from('admins')
        .update({ is_active: !admin.is_active })
        .eq('id', admin.id);
      if (error) throw error;
      loadAdmins();
    } catch (error) {
      console.error('Error updating admin:', error);
    }
  };

  if (isLoading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  if (!isSuperAdmin) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <h2 className="text-xl font-serif font-bold text-gray-900 mb-2">Access Restricted</h2>
        <p className="text-gray-600">Only Super Admins can manage admin users.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-serif font-bold text-gray-900">Admin Users Management</h2>
        <button onClick={handleAdd} className="btn btn-primary flex items-center">
          <Plus size={16} className="mr-2" />
          Add Admin
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {admins.map((admin) => (
              <tr key={admin.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{admin.full_name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{admin.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                    {admin.role.replace('_', ' ').toUpperCase()}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${admin.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {admin.is_active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button onClick={() => toggleActive(admin)} className="text-gray-600 hover:text-gray-900 mr-3">
                    {admin.is_active ? <UserX size={16} /> : <UserCheck size={16} />}
                  </button>
                  <button onClick={() => handleEdit(admin)} className="text-blue-600 hover:text-blue-900 mr-3">
                    <Edit size={16} />
                  </button>
                  <button onClick={() => { setSelectedAdmin(admin); setIsDeleteDialogOpen(true); }} className="text-red-600 hover:text-red-900">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={selectedAdmin ? 'Edit Admin' : 'Add Admin'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
              {error}
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              required
              value={formData.full_name}
              onChange={(e) => setFormData({...formData, full_name: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              required
              disabled={!!selectedAdmin}
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password {selectedAdmin && '(leave blank to keep current)'}
            </label>
            <input
              type="password"
              required={!selectedAdmin}
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({...formData, role: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="editor">Editor</option>
              <option value="admin">Admin</option>
              <option value="super_admin">Super Admin</option>
            </select>
          </div>
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.is_active}
                onChange={(e) => setFormData({...formData, is_active: e.target.checked})}
                className="mr-2"
              />
              <span className="text-sm text-gray-700">Active</span>
            </label>
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50" disabled={isSaving}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={isSaving}>
              {isSaving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDelete}
        title="Delete Admin"
        message="Are you sure you want to delete this admin user? This action cannot be undone."
        confirmText="Delete"
      />
    </div>
  );
};

export default AdminsManager;
