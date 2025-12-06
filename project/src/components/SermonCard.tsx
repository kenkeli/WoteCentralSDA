import React from 'react';
import { Play, Headphones, FileText, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';

export interface SermonProps {
  id: string;
  title: string;
  speaker: string;
  date: string;
  duration: string;
  imageUrl: string;
  videoUrl?: string;
  audioUrl?: string;
  notesUrl?: string;
  scripture: string;
  description: string;
}

interface SermonCardProps {
  sermon: SermonProps;
  className?: string;
  compact?: boolean;
}

const SermonCard: React.FC<SermonCardProps> = ({ 
  sermon, 
  className,
  compact = false
}) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4 }
    },
    hover: { 
      y: -5, 
      transition: { duration: 0.2 }
    }
  };
  
  // Format the date
  const sermonDate = new Date(sermon.date);
  const formattedDate = sermonDate.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <motion.div 
      className={cn(
        'card group',
        className
      )}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="relative">
        <div className="w-full h-48 bg-cover bg-center" style={{ backgroundImage: `url(${sermon.imageUrl})` }}>
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            {sermon.videoUrl && (
              <motion.button
                className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center text-white"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Play sermon video"
              >
                <Play size={20} />
              </motion.button>
            )}
          </div>
        </div>
      </div>
      
      <div className="card-body">
        <div className="flex items-center text-gray-600 text-sm mb-2">
          <Calendar size={14} className="mr-1" />
          <span>{formattedDate}</span>
          <span className="mx-2">•</span>
          <span>{sermon.duration}</span>
        </div>
        
        <h3 className="text-xl font-serif text-primary-800 group-hover:text-primary-600 transition-colors mb-1">
          {sermon.title}
        </h3>
        
        <p className="text-gray-700 mb-1">{sermon.speaker}</p>
        
        <p className="text-sm italic text-gray-600 mb-3">
          {sermon.scripture}
        </p>
        
        {!compact && (
          <p className="text-gray-600 mb-4 line-clamp-2">
            {sermon.description}
          </p>
        )}
        
        <div className="flex space-x-3 mt-auto">
          {sermon.videoUrl && (
            <a href={sermon.videoUrl} className="flex items-center text-sm text-primary-600 hover:text-primary-700">
              <Play size={16} className="mr-1" />
              <span>Video</span>
            </a>
          )}
          
          {sermon.audioUrl && (
            <a href={sermon.audioUrl} className="flex items-center text-sm text-primary-600 hover:text-primary-700">
              <Headphones size={16} className="mr-1" />
              <span>Audio</span>
            </a>
          )}
          
          {sermon.notesUrl && (
            <a href={sermon.notesUrl} className="flex items-center text-sm text-primary-600 hover:text-primary-700">
              <FileText size={16} className="mr-1" />
              <span>Notes</span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default SermonCard;