import React, { useState, useEffect } from 'react';
import { Search, Filter, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';

// Components
import Hero from '../components/Hero';
import Section from '../components/Section';
import SermonCard from '../components/SermonCard';

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

const Sermons: React.FC = () => {
  const [sermons, setSermons] = useState<Sermon[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSpeaker, setFilterSpeaker] = useState('');
  const [filterScripture, setFilterScripture] = useState('');
  const [filteredSermons, setFilteredSermons] = useState<Sermon[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load sermons from database
  useEffect(() => {
    loadSermons();
  }, []);

  const loadSermons = async () => {
    try {
      const { data, error } = await supabase
        .from('sermons')
        .select('*')
        .eq('is_published', true)
        .order('date', { ascending: false });

      if (error) throw error;
      setSermons(data || []);
      setFilteredSermons(data || []);
    } catch (error) {
      console.error('Error loading sermons:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Get unique speakers for filter
  const speakers = [...new Set(sermons.map(sermon => sermon.speaker))];

  // Get unique books of the Bible for filter (extracted from scripture references)
  const bibleBooks = [...new Set(
    sermons
      .map(sermon => {
        const match = sermon.scripture.match(/^([\d\s]*[A-Za-z]+)/);
        return match ? match[0].trim() : null;
      })
      .filter(Boolean)
  )];

  useEffect(() => {
    // Filter sermons based on search term and filters
    const filtered = sermons.filter(sermon => {
      const matchesSearch = searchTerm === '' || 
        sermon.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sermon.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sermon.scripture.toLowerCase().includes(searchTerm.toLowerCase());
        
      const matchesSpeaker = filterSpeaker === '' || sermon.speaker === filterSpeaker;
      
      const matchesScripture = filterScripture === '' || 
        sermon.scripture.toLowerCase().includes(filterScripture.toLowerCase());
        
      return matchesSearch && matchesSpeaker && matchesScripture;
    });
    
    setFilteredSermons(filtered);
  }, [searchTerm, filterSpeaker, filterScripture, sermons]);
  
  const clearFilters = () => {
    setSearchTerm('');
    setFilterSpeaker('');
    setFilterScripture('');
  };

  return (
    <main>
      <Hero
        title="Sermons & Media"
        subtitle="Listen, watch, and grow in your faith through our message archive"
        backgroundImage="https://images.pexels.com/photos/355952/pexels-photo-355952.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        height="medium"
      />
      
      <Section
        bgColor="white"
      >
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">Loading sermons...</p>
          </div>
        ) : (
        <>
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search sermons by title, scripture, or content..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              <Filter size={18} />
              <span>Filters</span>
              <ChevronDown size={18} className={`transform transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>
          
          {isFilterOpen && (
            <motion.div 
              className="bg-gray-50 rounded-lg p-4 mb-6"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label htmlFor="speaker" className="block text-sm font-medium text-gray-700 mb-1">
                    Speaker
                  </label>
                  <select
                    id="speaker"
                    value={filterSpeaker}
                    onChange={(e) => setFilterSpeaker(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">All Speakers</option>
                    {speakers.map(speaker => (
                      <option key={speaker} value={speaker}>{speaker}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="scripture" className="block text-sm font-medium text-gray-700 mb-1">
                    Scripture
                  </label>
                  <select
                    id="scripture"
                    value={filterScripture}
                    onChange={(e) => setFilterScripture(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">All Books</option>
                    {bibleBooks.map(book => (
                      <option key={book} value={book}>{book}</option>
                    ))}
                  </select>
                </div>
                
                <div className="lg:col-span-2 flex items-end">
                  <button
                    onClick={clearFilters}
                    className="px-4 py-2 text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            </motion.div>
          )}
          
          {filteredSermons.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600 mb-4">No sermons match your search criteria.</p>
              <button
                onClick={clearFilters}
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                Clear filters and try again
              </button>
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSermons.map(sermon => (
            <SermonCard key={sermon.id} sermon={sermon} />
          ))}
        </div>
        
        {filteredSermons.length > 0 && filteredSermons.length < sermons.length && (
          <div className="text-center mt-8">
            <p className="text-gray-600">
              Showing {filteredSermons.length} of {sermons.length} sermons
            </p>
          </div>
        )}
        </>
        )}
      </Section>
      
      <Section
        title="Subscribe to Our Sermons"
        subtitle="Never miss a message - subscribe to our podcast or YouTube channel"
        bgColor="secondary"
        centered={true}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-serif text-primary-800 mb-3">YouTube Channel</h3>
            <p className="text-gray-600 mb-4">
              Subscribe to our YouTube channel for video recordings of our sermons and special programs.
            </p>
            <a 
              href="https://youtube.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-primary w-full"
            >
              Subscribe on YouTube
            </a>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-serif text-primary-800 mb-3">Podcast</h3>
            <p className="text-gray-600 mb-4">
              Listen to our sermons on the go by subscribing to our podcast on your favorite platform.
            </p>
            <a 
              href="https://podcasts.apple.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-primary w-full"
            >
              Subscribe to Podcast
            </a>
          </div>
        </div>
      </Section>
    </main>
  );
};

export default Sermons;