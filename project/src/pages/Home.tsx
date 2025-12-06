import React, { useState, useEffect } from 'react';
import { ArrowRight, Calendar, Heart, Book, Map } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

// Components
import Hero from '../components/Hero';
import Section from '../components/Section';
import EventCard from '../components/EventCard';
import SermonCard from '../components/SermonCard';
import ScriptureQuote from '../components/ScriptureQuote';
import ServiceTimes from '../components/ServiceTimes';

const Home: React.FC = () => {
  const [featuredEvents, setFeaturedEvents] = useState<any[]>([]);
  const [featuredSermons, setFeaturedSermons] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadFeaturedContent();
  }, []);

  const loadFeaturedContent = async () => {
    try {
      // Load featured or recent published events
      const { data: eventsData } = await supabase
        .from('events')
        .select('*')
        .eq('is_published', true)
        .order('date', { ascending: true })
        .limit(3);

      // Load featured or recent published sermons
      const { data: sermonsData } = await supabase
        .from('sermons')
        .select('*')
        .eq('is_published', true)
        .order('date', { ascending: false })
        .limit(3);

      setFeaturedEvents(eventsData || []);
      setFeaturedSermons(sermonsData || []);
    } catch (error) {
      console.error('Error loading featured content:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Service times
  const services = [
    {
      name: 'Sabbath School',
      day: 'Saturday',
      time: '9:30 AM',
      description: 'Bible study groups for all ages'
    },
    {
      name: 'Divine Worship',
      day: 'Saturday',
      time: '11:00 AM',
      description: 'Main worship service with praise and sermon'
    },
    {
      name: 'Prayer Meeting',
      day: 'Wednesday',
      time: '7:00 PM',
      description: 'Midweek prayer and Bible study'
    }
  ];
  
  return (
    <main>
      <Hero
        title="Welcome to Wote Central Seventh-day Adventist Church"
        subtitle="A community of faith, hope, and love in Christ Jesus"
        backgroundImage="https://images.pexels.com/photos/2132108/pexels-photo-2132108.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        buttonText="Join Us This Sabbath"
        buttonLink="#service-times"
        height="full"
      />
      
      <Section 
        bgColor="white"
        centered={true}
        className="relative -mt-24"
      >
        <div className="bg-white shadow-lg rounded-lg p-6 md:p-8 mb-12">
          <h2 className="text-3xl font-serif text-primary-800 mb-6 text-center">Join Us This Sabbath</h2>
          
          <ServiceTimes 
            services={services} 
            title="" 
            className="mb-8"
          />
          
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <a href="/contact" className="btn btn-primary w-full sm:w-auto text-center flex items-center justify-center">
              <Map size={18} className="mr-2" />
              Get Directions
            </a>
            <a href="/about" className="btn btn-outline w-full sm:w-auto text-center whitespace-nowrap">
              Learn More About Us
            </a>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 mb-12">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-primary-100 text-primary-600 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Book size={28} />
            </div>
            <h3 className="text-xl font-serif text-primary-800 mb-2">Bible-Centered</h3>
            <p className="text-gray-600">
              We're committed to biblical teaching and understanding God's Word in its fullness.
            </p>
          </motion.div>
          
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="bg-primary-100 text-primary-600 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart size={28} />
            </div>
            <h3 className="text-xl font-serif text-primary-800 mb-2">Community-Focused</h3>
            <p className="text-gray-600">
              We believe in fostering genuine relationships and supporting one another in Christian love.
            </p>
          </motion.div>
          
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-primary-100 text-primary-600 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar size={28} />
            </div>
            <h3 className="text-xl font-serif text-primary-800 mb-2">Service-Oriented</h3>
            <p className="text-gray-600">
              We're dedicated to serving our community and sharing Christ's love through action.
            </p>
          </motion.div>
        </div>
        
        <ScriptureQuote
          text={`"For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life."`}
          reference="John 3:16"
          className="max-w-3xl mx-auto"
        />
      </Section>
      
      <Section
        title="Upcoming Events"
        subtitle="Join us for these special gatherings and opportunities to grow in faith and fellowship"
        bgColor="light"
        centered={true}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredEvents.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Link to="/events" className="btn btn-outline inline-flex items-center">
            View All Events
            <ArrowRight size={18} className="ml-2" />
          </Link>
        </div>
      </Section>
      
      <Section
        title="Recent Sermons"
        subtitle="Listen to our latest messages and grow in your faith journey"
        bgColor="white"
        centered={true}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredSermons.map(sermon => (
            <SermonCard key={sermon.id} sermon={sermon} />
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Link to="/sermons" className="btn btn-outline inline-flex items-center">
            Browse All Sermons
            <ArrowRight size={18} className="ml-2" />
          </Link>
        </div>
      </Section>
      
      <section className="relative">
        <div className="absolute inset-0 bg-black bg-opacity-70 z-10"></div>
        <div 
          className="bg-cover bg-center min-h-[60vh] flex items-center justify-center relative"
          style={{ backgroundImage: 'url(https://images.pexels.com/photos/2258536/pexels-photo-2258536.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)' }}
        >
          <div className="container-custom relative z-20 text-center py-16">
            <motion.h2 
              className="text-white text-4xl md:text-5xl font-serif font-bold mb-6 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              "Let us not love with words or speech but with actions and in truth."
            </motion.h2>
            <motion.p 
              className="text-gray-200 text-xl mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              1 John 3:18
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link to="/about/beliefs" className="btn btn-secondary">
                Learn About Our Beliefs
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
      
      <Section
        bgColor="white"
        className="text-center"
      >
        <div className="max-w-3xl mx-auto">
          <motion.h2 
            className="text-3xl md:text-4xl font-serif text-primary-800 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Visit Us This Sabbath
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-600 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            We'd love to welcome you to our church family. Come worship with us and experience the joy of Sabbath rest.
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link to="/about" className="btn btn-primary w-full sm:w-auto text-center">
              Learn More About Us
            </Link>
            <Link to="/contact" className="btn btn-outline w-full sm:w-auto text-center">
              Get Directions
            </Link>
          </motion.div>
        </div>
      </Section>
    </main>
  );
};

export default Home;