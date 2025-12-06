import React, { useState } from 'react';
import { Book, Heart, Users, ChevronRight, Mail, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Components
import Hero from '../components/Hero';
import Section from '../components/Section';
import ScriptureQuote from '../components/ScriptureQuote';
import BeliefsCard from '../components/BeliefsCard';
import TeamMemberCard from '../components/TeamMemberCard';

// Data
import { coreBeliefs } from '../data/beliefs';
import { teamMembers } from '../data/team';

const About: React.FC = () => {
  const [expandedBelief, setExpandedBelief] = useState<string | null>(null);
  
  // Filter just the pastor for display
  const pastor = teamMembers.find(member => member.role === 'Senior Pastor');
  
  // Featured team members (leadership)
  const leadershipTeam = teamMembers
    .filter(member => member.role !== 'Senior Pastor')
    .slice(0, 3);
  
  const toggleBelief = (id: string) => {
    if (expandedBelief === id) {
      setExpandedBelief(null);
    } else {
      setExpandedBelief(id);
    }
  };

  return (
    <main>
      <Hero
        title="About Our Church"
        subtitle="Committed to sharing the everlasting gospel of Jesus Christ"
        backgroundImage="https://images.pexels.com/photos/158027/pexels-photo-158027.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        height="medium"
      />
      
      <Section
        bgColor="white"
        centered={true}
      >
        <div className="max-w-4xl mx-auto mb-12">
          <motion.h2 
            className="text-3xl md:text-4xl font-serif text-primary-800 mb-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Our Story
          </motion.h2>
          
          <div className="space-y-6 text-gray-700">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Wote Central Seventh-day Adventist Church was established in 2008 by a small group of believers committed to sharing the love of Jesus Christ in our community. From our humble beginnings in a rented school building, we've grown into a thriving congregation with a beautiful sanctuary dedicated to worshiping God.
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              As Seventh-day Adventists, we believe in the Bible as God's inspired Word, the soon return of Jesus Christ, and the importance of keeping the Sabbath holy as a day of rest and worship. We're committed to wholistic ministry that nurtures the mind, body, and spirit.
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Our church is part of a worldwide movement of more than 21 million Adventist believers, united in our mission to share God's message of hope, health, and healing to a world in need.
            </motion.p>
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
            <h3 className="text-xl font-serif text-primary-800 mb-2">Our Mission</h3>
            <p className="text-gray-600">
              To make disciples of Jesus Christ who live by His grace, share His love, and proclaim His soon return.
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
            <h3 className="text-xl font-serif text-primary-800 mb-2">Our Vision</h3>
            <p className="text-gray-600">
              To be a vibrant community of believers, growing in Christ, serving others, and preparing for His return.
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
              <Users size={28} />
            </div>
            <h3 className="text-xl font-serif text-primary-800 mb-2">Our Values</h3>
            <p className="text-gray-600">
              Biblical faithfulness, authentic relationships, compassionate service, and stewardship of God's gifts.
            </p>
          </motion.div>
        </div>
        
        <ScriptureQuote
          text={`"For I know the plans I have for you," declares the LORD, "plans to prosper you and not to harm you, plans to give you hope and a future."`}
          reference="Jeremiah 29:11"
          className="max-w-3xl mx-auto"
        />
      </Section>
      
      <Section
        title="Our Core Beliefs"
        subtitle="As Seventh-day Adventists, we believe in the Bible as God's inspired Word and follow its teachings"
        bgColor="light"
        centered={true}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coreBeliefs.map(belief => (
            <BeliefsCard
              key={belief.id}
              belief={belief}
              expanded={expandedBelief === belief.id}
              onClick={() => toggleBelief(belief.id)}
            />
          ))}
        </div>
      </Section>
      
      {pastor && (
        <Section
          title="Our Pastor"
          subtitle="Spiritual leadership and guidance for our congregation"
          bgColor="white"
          centered={true}
        >
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <div className="md:col-span-1">
                <div className="rounded-lg overflow-hidden shadow-md">
                  <img 
                    src={pastor.imageUrl} 
                    alt={pastor.name} 
                    className="w-full h-auto aspect-[3/4] object-cover" 
                  />
                </div>
              </div>
              
              <div className="md:col-span-2">
                <h3 className="text-2xl font-serif text-primary-800 mb-2">
                  {pastor.name}
                </h3>
                
                <p className="text-secondary-600 font-medium mb-4">
                  {pastor.role}
                </p>
                
                <div className="prose text-gray-700 mb-6">
                  <p>
                    Pastor {pastor.name.split(' ')[0]} has served at Wote Central SDA Church since 2018. With over 15 years in ministry, 
                    he is passionate about helping people grow in their relationship with Jesus Christ 
                    and understand the relevance of God's Word for today's world.
                  </p>
                  <p>
                    He received his Master of Divinity degree from Andrews University and has a heart 
                    for evangelism, youth ministry, and community outreach.
                  </p>
                  <p>
                    Pastor {pastor.name.split(' ')[0]} and his wife have two children and enjoy community service, 
                    music, and serving the community together as a family.
                  </p>
                </div>
                
                <div className="space-y-2">
                  {pastor.email && (
                    <a 
                      href={`mailto:${pastor.email}`}
                      className="flex items-center text-sm text-gray-700 hover:text-primary-600"
                    >
                      <Mail size={14} className="mr-2" />
                      {pastor.email}
                    </a>
                  )}
                  
                  {pastor.phone && (
                    <a 
                      href={`tel:${pastor.phone.replace(/\D/g,'')}`}
                      className="flex items-center text-sm text-gray-700 hover:text-primary-600"
                    >
                      <Phone size={14} className="mr-2" />
                      {pastor.phone}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Section>
      )}
      
      <Section
        title="Church Leadership"
        subtitle="Meet our dedicated team serving our church and community"
        bgColor="light"
        centered={true}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {leadershipTeam.map(member => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Link to="/about/leadership" className="btn btn-outline inline-flex items-center">
            Meet Our Full Team
            <ChevronRight size={18} className="ml-2" />
          </Link>
        </div>
      </Section>
      
      <section className="relative">
        <div className="absolute inset-0 bg-black bg-opacity-60 z-10"></div>
        <div 
          className="bg-cover bg-center min-h-[40vh] flex items-center justify-center relative"
          style={{ backgroundImage: 'url(https://images.pexels.com/photos/2118045/pexels-photo-2118045.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)' }}
        >
          <div className="container-custom relative z-20 text-center py-16">
            <motion.h2 
              className="text-white text-3xl md:text-4xl font-serif font-bold mb-6 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Join Our Church Family
            </motion.h2>
            <motion.p 
              className="text-gray-200 text-xl mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              We'd love to welcome you this Sabbath and get to know you better
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link to="/contact" className="btn btn-secondary">
                Visit Us
              </Link>
              <Link to="/contact#contact-form" className="btn bg-white hover:bg-gray-100 text-primary-800">
                Contact Us
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;