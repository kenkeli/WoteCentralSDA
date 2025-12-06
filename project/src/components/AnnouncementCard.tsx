import React from 'react';
import { Calendar, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';

export interface AnnouncementProps {
  id: string;
  title: string;
  date: string;
  content: string;
  imageUrl?: string;
  link?: string;
  important?: boolean;
}

interface AnnouncementCardProps {
  announcement: AnnouncementProps;
  className?: string;
}

const AnnouncementCard: React.FC<AnnouncementCardProps> = ({ 
  announcement, 
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
  
  // Format the date
  const announcementDate = new Date(announcement.date);
  const formattedDate = announcementDate.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <motion.div 
      className={cn(
        'card hover:shadow-lg transition-all duration-300',
        announcement.important && 'border-l-4 border-secondary-500',
        className
      )}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="card-body">
        {announcement.important && (
          <span className="inline-block bg-secondary-100 text-secondary-800 text-xs px-2 py-1 rounded mb-3">
            Important
          </span>
        )}
        
        <h3 className="text-xl font-serif text-primary-800 mb-2">
          {announcement.title}
        </h3>
        
        <div className="flex items-center text-sm text-gray-600 mb-3">
          <Calendar size={14} className="mr-2" />
          <span>{formattedDate}</span>
        </div>
        
        <p className="text-gray-700 mb-4">
          {announcement.content}
        </p>
        
        {announcement.link && (
          <a 
            href={announcement.link} 
            className="flex items-center text-primary-600 hover:text-primary-700 font-medium text-sm"
          >
            Read More
            <ChevronRight size={16} className="ml-1" />
          </a>
        )}
      </div>
    </motion.div>
  );
};

export default AnnouncementCard;