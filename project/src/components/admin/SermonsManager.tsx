import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import Modal from '../Modal';
import ConfirmDialog from '../ConfirmDialog';

interface Sermon {
  id: string;
  title: string;
  speaker: string;
  date: string;
  duration: string;
  scripture: string;
  description: string;
  image_url: string;
  video_url: string;
  audio_url: string;
  notes_url: string;
  is_featured: boolean;
  is_published: boolean;
}

const SermonsManager: React.FC = () => {
  const [sermons, setSermons] = useState<Sermon[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedSermon, setSelectedSermon] = useState<Sermon | null>(null);
  const [formData, setFormData] = useState<Partial<Sermon>>({
    title: '',
    speaker: '',
    date: '',
    duration: '',
    scripture: '',
    description: '',
    image_url: '',
    video_url: '',
    audio_url: '',
    notes_url: '',
    is_featured: false,
    is_published: true
  });

  useEffect(() => {
    loadSermons();
  }, []);

  const loadSermons = async () => {
    try {
      const { data, error } = await supabase
        .from('sermons')
        .select('*')
        .order('date', { ascending: false });

      if (error) throw error;
      setSermons(data || []);
    } catch (error) {
      console.error('Error loading sermons:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (selectedSermon) {
        const { error } = await supabase
          .from('sermons')
          .update(formData)
          .eq('id', selectedSermon.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('sermons')
          .insert([formData]);
        if (error) throw error;
      }
      setIsModalOpen(false);
      resetForm();
      loadSermons();
    } catch (error) {
      console.error('Error saving sermon:', error);
    }
  };

  const handleDelete = async () => {
    if (!selectedSermon) return;
    try {
      const { error } = await supabase
        .from('sermons')
        .delete()
        .eq('id', selectedSermon.id);
      if (error) throw error;
      loadSermons();
    } catch (error) {
      console.error('Error deleting sermon:', error);
    }
  };

  const handleEdit = (sermon: Sermon) => {
    setSelectedSermon(sermon);
    setFormData(sermon);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setSelectedSermon(null);
    setFormData({
      title: '',
      speaker: '',
      date: '',
      duration: '',
      scripture: '',
      description: '',
      image_url: '',
      video_url: '',
      audio_url: '',
      notes_url: '',
      is_featured: false,
      is_published: true
    });
  };

  const togglePublished = async (sermon: Sermon) => {
    try {
      const { error } = await supabase
        .from('sermons')
        .update({ is_published: !sermon.is_published })
        .eq('id', sermon.id);
      if (error) throw error;
      loadSermons();
    } catch (error) {
      console.error('Error updating sermon:', error);
    }
  };

  if (isLoading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-serif font-bold text-gray-900">Sermons Management</h2>
        <button onClick={handleAdd} className="btn btn-primary flex items-center">
          <Plus size={16} className="mr-2" />
          Add Sermon
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Speaker</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sermons.map((sermon) => (
              <tr key={sermon.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{sermon.title}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sermon.speaker}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sermon.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${sermon.is_published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {sermon.is_published ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button onClick={() => togglePublished(sermon)} className="text-gray-600 hover:text-gray-900 mr-3">
                    {sermon.is_published ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                  <button onClick={() => handleEdit(sermon)} className="text-blue-600 hover:text-blue-900 mr-3">
                    <Edit size={16} />
                  </button>
                  <button onClick={() => { setSelectedSermon(sermon); setIsDeleteDialogOpen(true); }} className="text-red-600 hover:text-red-900">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={selectedSermon ? 'Edit Sermon' : 'Add Sermon'} size="lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input type="text" required value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Speaker</label>
              <input type="text" required value={formData.speaker} onChange={(e) => setFormData({...formData, speaker: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input type="date" required value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
              <input type="text" value={formData.duration} onChange={(e) => setFormData({...formData, duration: e.target.value})} placeholder="e.g., 45 min" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Scripture</label>
            <input type="text" required value={formData.scripture} onChange={(e) => setFormData({...formData, scripture: e.target.value})} placeholder="e.g., John 3:16" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea required value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
              <input type="url" value={formData.image_url} onChange={(e) => setFormData({...formData, image_url: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Video URL</label>
              <input type="url" value={formData.video_url} onChange={(e) => setFormData({...formData, video_url: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Audio URL</label>
              <input type="url" value={formData.audio_url} onChange={(e) => setFormData({...formData, audio_url: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Notes URL</label>
              <input type="url" value={formData.notes_url} onChange={(e) => setFormData({...formData, notes_url: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500" />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input type="checkbox" checked={formData.is_featured} onChange={(e) => setFormData({...formData, is_featured: e.target.checked})} className="mr-2" />
              <span className="text-sm text-gray-700">Featured</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" checked={formData.is_published} onChange={(e) => setFormData({...formData, is_published: e.target.checked})} className="mr-2" />
              <span className="text-sm text-gray-700">Published</span>
            </label>
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">Cancel</button>
            <button type="submit" className="btn btn-primary">Save</button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDelete}
        title="Delete Sermon"
        message="Are you sure you want to delete this sermon? This action cannot be undone."
        confirmText="Delete"
      />
    </div>
  );
};

export default SermonsManager;
