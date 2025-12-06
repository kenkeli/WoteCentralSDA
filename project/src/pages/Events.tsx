import React, { useState, useEffect } from 'react';
import { Calendar, Search, Filter, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';

// Components
import Hero from '../components/Hero';
import Section from '../components/Section';
import EventCard from '../components/EventCard';

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image_url: string;
  category: string;
  is_featured: boolean;
  is_published: boolean;
}

const Events: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load events from database
  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('is_published', true)
        .order('date', { ascending: true });

      if (error) throw error;
      setEvents(data || []);
      setFilteredEvents(data || []);
    } catch (error) {
      console.error('Error loading events:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Get unique categories for filter
  const categories = [...new Set(events.map(event => event.category).filter(Boolean))];

  // Filter events based on search term and category
  useEffect(() => {
    const filtered = events.filter(event => {
      const matchesSearch = searchTerm === '' || 
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase());
        
      const matchesCategory = filterCategory === '' || 
        event.category === filterCategory;
        
      return matchesSearch && matchesCategory;
    });
    
    // Sort by date (closest first)
    const sorted = [...filtered].sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
    
    setFilteredEvents(sorted);
  }, [searchTerm, filterCategory, events]);
  
  const clearFilters = () => {
    setSearchTerm('');
    setFilterCategory('');
  };

  // Group events by month
  const eventsByMonth: { [key: string]: typeof upcomingEvents } = {};
  
  filteredEvents.forEach(event => {
    const date = new Date(event.date);
    const monthYear = date.toLocaleString('en-US', { month: 'long', year: 'numeric' });
    
    if (!eventsByMonth[monthYear]) {
      eventsByMonth[monthYear] = [];
    }
    
    eventsByMonth[monthYear].push(event);
  });

  return (
    <main>
      <Hero
        title="Events Calendar"
        subtitle="Join us for worship, fellowship, and special events throughout the year"
        backgroundImage="https://images.pexels.com/photos/159195/pexels-photo-159195.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        height="medium"
      />
      
      <Section
        bgColor="white"
      >
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">Loading events...</p>
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
                placeholder="Search events by title, location, or description..."
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                    Event Type
                  </label>
                  <select
                    id="category"
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">All Events</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                
                <div className="md:col-span-2 flex items-end">
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
          
          {filteredEvents.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600 mb-4">No events match your search criteria.</p>
              <button
                onClick={clearFilters}
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                Clear filters and try again
              </button>
            </div>
          )}
        </div>
        
        {Object.entries(eventsByMonth).map(([monthYear, events]) => (
          <div key={monthYear} className="mb-12">
            <div className="flex items-center mb-6">
              <Calendar size={24} className="text-secondary-500 mr-2" />
              <h2 className="text-2xl font-serif text-primary-800">{monthYear}</h2>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              {events.map(event => (
                <EventCard 
                  key={event.id} 
                  event={event} 
                  variant="compact" 
                />
              ))}
            </div>
          </div>
        ))}
        </>
        )}
      </Section>
      
      <Section
        title="Need More Information?"
        subtitle="Contact us with any questions about our events or to discuss hosting your own event at our facility"
        bgColor="secondary"
        centered={true}
      >
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-serif text-primary-800 mb-3">Calendar Subscription</h3>
              <p className="text-gray-600 mb-4">
                Stay updated with all our events by subscribing to our digital calendar.
              </p>
              <div className="space-y-2">
                <a 
                  href="webcal://calendar.google.com/calendar/ical/wotecentralsda%40gmail.com/public/basic.ics"
                  className="btn btn-primary w-full block text-center"
                >
                  Add to Calendar App
                </a>
                <a 
                  href="https://calendar.google.com/calendar/u/0?cid=d290ZWNlbnRyYWxzZGFAZ21haWwuY29t"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline w-full block text-center"
                >
                  View Google Calendar
                </a>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-serif text-primary-800 mb-3">Event Questions</h3>
              <p className="text-gray-600 mb-4">
                Have questions about an upcoming event or want to reserve space for a gathering?
              </p>
              <a 
                href="/contact" 
                className="btn btn-primary w-full"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </Section>
    </main>
  );
};

export default Events;