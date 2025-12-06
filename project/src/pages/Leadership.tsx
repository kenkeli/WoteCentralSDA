import React, { useState, useEffect } from 'react';
import { Mail, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';

// Components
import Hero from '../components/Hero';
import Section from '../components/Section';
import TeamMemberCard from '../components/TeamMemberCard';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  image_url: string;
  bio: string;
  email: string;
  phone: string;
  display_order: number;
  is_leadership: boolean;
  is_published: boolean;
}

const Leadership: React.FC = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadTeamMembers();
  }, []);

  const loadTeamMembers = async () => {
    try {
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .eq('is_published', true)
        .eq('is_leadership', true)
        .order('display_order', { ascending: true });

      if (error) throw error;
      setTeamMembers(data || []);
    } catch (error) {
      console.error('Error loading team members:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main>
      <Hero
        title="Church Leadership"
        subtitle="Meet our dedicated team serving our church and community with passion and commitment"
        backgroundImage="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        height="medium"
      />
      
      <Section
        title="Our Leadership Team"
        subtitle="God has blessed our church with faithful leaders who are committed to serving Him and our congregation"
        bgColor="white"
        centered={true}
      >
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">Loading team members...</p>
          </div>
        ) : teamMembers.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">No team members to display at this time.</p>
          </div>
        ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <TeamMemberCard member={member} />
            </motion.div>
          ))}
        </div>
        )}
      </Section>
      
      <Section
        title="Serving Together"
        subtitle="Our leadership team works together to fulfill our mission of sharing Christ's love"
        bgColor="light"
        centered={true}
      >
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-gray-700 mb-8">
            Each member of our leadership team brings unique gifts and experiences to serve our 
            congregation. Together, we are committed to biblical teaching, pastoral care, and 
            creating an environment where everyone can grow in their relationship with Jesus Christ.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-serif text-primary-800 mb-3">Join Our Team</h3>
              <p className="text-gray-600 mb-4">
                Interested in serving in leadership or ministry? We're always looking for 
                dedicated individuals to join our team.
              </p>
              <a href="/contact" className="btn btn-primary w-full">
                Contact Us
              </a>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-serif text-primary-800 mb-3">Prayer Support</h3>
              <p className="text-gray-600 mb-4">
                Please keep our leadership team in your prayers as they seek God's guidance 
                in leading our congregation.
              </p>
              <a href="/contact" className="btn btn-outline w-full">
                Submit Prayer Request
              </a>
            </div>
          </div>
        </div>
      </Section>
    </main>
  );
};

export default Leadership;