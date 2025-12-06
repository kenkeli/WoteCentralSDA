import React from 'react';
import { Mail, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';

export interface TeamMemberProps {
  id: string;
  name: string;
  role: string;
  imageUrl: string;
  bio?: string;
  email?: string;
  phone?: string;
  socialLinks?: {
    type: string;
    url: string;
  }[];
}

interface TeamMemberCardProps {
  member: TeamMemberProps;
  className?: string;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ 
  member, 
  className 
}) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <motion.div 
      className={cn(
        'card overflow-hidden',
        className
      )}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="aspect-square overflow-hidden">
        <img 
          src={member.imageUrl} 
          alt={member.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
        />
      </div>
      
      <div className="card-body">
        <h3 className="text-xl font-serif text-primary-800 mb-1">
          {member.name}
        </h3>
        
        <p className="text-secondary-600 font-medium mb-3">
          {member.role}
        </p>
        
        {member.bio && (
          <p className="text-gray-700 mb-4 text-sm">
            {member.bio}
          </p>
        )}
        
        <div className="space-y-2 mt-auto">
          {member.email && (
            <a 
              href={`mailto:${member.email}`}
              className="flex items-center text-sm text-gray-700 hover:text-primary-600"
            >
              <Mail size={14} className="mr-2" />
              {member.email}
            </a>
          )}
          
          {member.phone && (
            <a 
              href={`tel:${member.phone.replace(/\D/g,'')}`}
              className="flex items-center text-sm text-gray-700 hover:text-primary-600"
            >
              <Phone size={14} className="mr-2" />
              {member.phone}
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default TeamMemberCard;