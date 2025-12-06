import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import Modal from '../Modal';
import ConfirmDialog from '../ConfirmDialog';

interface GalleryImage {
  id: string;
  title: string;
  description: string;
  image_url: string;
  alt_text: string;
  category: string;
  is_published: boolean;
}

const GalleryManager: React.FC = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [formData, setFormData] = useState<Partial<GalleryImage>>({
    title: '',
    description: '',
    image_url: '',
    alt_text: '',
    category: '',
    is_published: true
  });

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    try {
      const { data, error } = await supabase
        .from('gallery_images')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setImages(data || []);
    } catch (error) {
      console.error('Error loading gallery images:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (selectedImage) {
        const { error } = await supabase
          .from('gallery_images')
          .update(formData)
          .eq('id', selectedImage.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('gallery_images')
          .insert([formData]);
        if (error) throw error;
      }
      setIsModalOpen(false);
      resetForm();
      loadImages();
    } catch (error) {
      console.error('Error saving gallery image:', error);
    }
  };

  const handleDelete = async () => {
    if (!selectedImage) return;
    try {
      const { error } = await supabase
        .from('gallery_images')
        .delete()
        .eq('id', selectedImage.id);
      if (error) throw error;
      loadImages();
    } catch (error) {
      console.error('Error deleting gallery image:', error);
    }
  };

  const handleEdit = (image: GalleryImage) => {
    setSelectedImage(image);
    setFormData(image);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setSelectedImage(null);
    setFormData({
      title: '',
      description: '',
      image_url: '',
      alt_text: '',
      category: '',
      is_published: true
    });
  };

  const togglePublished = async (image: GalleryImage) => {
    try {
      const { error } = await supabase
        .from('gallery_images')
        .update({ is_published: !image.is_published })
        .eq('id', image.id);
      if (error) throw error;
      loadImages();
    } catch (error) {
      console.error('Error updating gallery image:', error);
    }
  };

  if (isLoading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-serif font-bold text-gray-900">Gallery Management</h2>
        <button onClick={handleAdd} className="btn btn-primary flex items-center">
          <Plus size={16} className="mr-2" />
          Add Image
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image) => (
          <div key={image.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
            <img src={image.image_url} alt={image.alt_text} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-1">{image.title || 'Untitled'}</h3>
              <p className="text-sm text-gray-500 mb-2">{image.category}</p>
              <div className="flex items-center justify-between">
                <span className={`px-2 py-1 text-xs rounded-full ${image.is_published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                  {image.is_published ? 'Published' : 'Draft'}
                </span>
                <div className="flex space-x-2">
                  <button onClick={() => togglePublished(image)} className="text-gray-600 hover:text-gray-900">
                    {image.is_published ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                  <button onClick={() => handleEdit(image)} className="text-blue-600 hover:text-blue-900">
                    <Edit size={16} />
                  </button>
                  <button onClick={() => { setSelectedImage(image); setIsDeleteDialogOpen(true); }} className="text-red-600 hover:text-red-900">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={selectedImage ? 'Edit Image' : 'Add Image'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
            <input type="url" required value={formData.image_url} onChange={(e) => setFormData({...formData, image_url: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Alt Text</label>
            <input type="text" required value={formData.alt_text} onChange={(e) => setFormData({...formData, alt_text: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <input type="text" required value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} rows={2} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500" />
          </div>
          <div>
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
        title="Delete Image"
        message="Are you sure you want to delete this image? This action cannot be undone."
        confirmText="Delete"
      />
    </div>
  );
};

export default GalleryManager;
