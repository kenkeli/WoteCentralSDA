import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase } from '../lib/supabase';

// Components
import Hero from '../components/Hero';
import Section from '../components/Section';

interface GalleryImage {
  id: string;
  title: string;
  description: string;
  image_url: string;
  alt_text: string;
  category: string;
  is_published: boolean;
}

const Gallery: React.FC = () => {
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadGalleryImages();
  }, []);

  const loadGalleryImages = async () => {
    try {
      const { data, error } = await supabase
        .from('gallery_images')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setGalleryImages(data || []);
    } catch (error) {
      console.error('Error loading gallery images:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Get unique categories from the database
  const categories = [
    { value: 'all', label: 'All Photos' },
    ...Array.from(new Set(galleryImages.map(img => img.category)))
      .filter(Boolean)
      .map(cat => ({ value: cat, label: cat.charAt(0).toUpperCase() + cat.slice(1) }))
  ];

  const filteredImages = selectedCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  const openLightbox = (image: GalleryImage) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (!selectedImage) return;
    
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
    let newIndex;
    
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : filteredImages.length - 1;
    } else {
      newIndex = currentIndex < filteredImages.length - 1 ? currentIndex + 1 : 0;
    }
    
    setSelectedImage(filteredImages[newIndex]);
  };

  return (
    <main>
      <Hero
        title="Photo Gallery"
        subtitle="Capturing moments of faith, fellowship, and community service"
        backgroundImage="https://images.pexels.com/photos/2132108/pexels-photo-2132108.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        height="medium"
      />
      
      <Section
        bgColor="white"
      >
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">Loading gallery...</p>
          </div>
        ) : galleryImages.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">No images to display at this time.</p>
          </div>
        ) : (
        <>
        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-2 mb-6 px-4 sm:px-0">
            {categories.map(category => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
                  selectedCategory === category.value
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
          
          <p className="text-center text-gray-600">
            Showing {filteredImages.length} {filteredImages.length === 1 ? 'photo' : 'photos'} 
            {selectedCategory !== 'all' && ` in ${categories.find(c => c.value === selectedCategory)?.label}`}
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-4">
          {filteredImages.map((image, index) => (
            <motion.div
              key={image.id}
              className="relative group cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all duration-300 aspect-square"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              onClick={() => openLightbox(image)}
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-full h-full overflow-hidden">
                <img
                  src={image.image_url}
                  alt={image.alt_text}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-end">
                <div className="p-2 sm:p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  {image.title && (
                    <h3 className="font-medium text-xs sm:text-sm mb-1 line-clamp-2">{image.title}</h3>
                  )}
                  {image.description && !window.matchMedia('(max-width: 640px)').matches && (
                    <p className="text-xs opacity-90 line-clamp-2">{image.description}</p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredImages.length === 0 && selectedCategory !== 'all' && (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">No photos found in this category.</p>
          </div>
        )}
        </>
        )}
      </Section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-2 sm:p-4">
          <div className="relative max-w-4xl max-h-full">
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
            >
              <X size={24} />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={() => navigateImage('prev')}
              className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              onClick={() => navigateImage('next')}
              className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
            >
              <ChevronRight size={24} />
            </button>

            {/* Image */}
            <motion.img
              key={selectedImage.id}
              src={selectedImage.image_url}
              alt={selectedImage.alt_text}
              className="max-w-full max-h-full object-contain"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            />

            {/* Image Info */}
            {(selectedImage.title || selectedImage.description) && (
              <div className="absolute bottom-2 left-2 right-2 sm:bottom-4 sm:left-4 sm:right-4 bg-black bg-opacity-70 text-white p-3 sm:p-4 rounded-lg">
                {selectedImage.title && (
                  <h3 className="font-medium text-sm sm:text-lg mb-1">{selectedImage.title}</h3>
                )}
                {selectedImage.description && (
                  <p className="text-xs sm:text-sm opacity-90">{selectedImage.description}</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      <Section
        title="Share Your Photos"
        subtitle="Have photos from church events you'd like to share? We'd love to feature them in our gallery!"
        bgColor="light"
        centered={true}
      >
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-gray-700 mb-8">
            If you have photos from recent church events, activities, or special moments you'd like to contribute 
            to our gallery, please send them to us. We love showcasing the vibrant life of our church community.
          </p>
          
          <a 
            href="/contact" 
            className="btn btn-primary"
          >
            Submit Your Photos
          </a>
        </div>
      </Section>
    </main>
  );
};

export default Gallery;