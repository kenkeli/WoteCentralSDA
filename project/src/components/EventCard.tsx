import React from 'react';
import { Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';

export interface EventProps {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  imageUrl: string;
  category?: string;
}

interface EventCardProps {
  event: EventProps;
  className?: string;
  variant?: 'default' | 'compact';
}

const EventCard: React.FC<EventCardProps> = ({ 
  event,
  className,
  variant = 'default'
}) => {
  const isCompact = variant === 'compact';
  
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4 } 
    },
    hover: { 
      y: -5,
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      transition: { duration: 0.2 } 
    }
  };
  
  // Parse date string to Date object for formatting
  const eventDate = new Date(event.date);
  const formattedDate = eventDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <motion.div 
      className={cn(
        'card group',
        isCompact ? 'flex' : 'flex flex-col',
        className
      )}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div 
        className={cn(
          'bg-cover bg-center',
          isCompact ? 'w-1/3 min-h-[120px]' : 'w-full h-48'
        )}
        style={{ backgroundImage: `url(${event.imageUrl})` }}
      >
        {event.category && !isCompact && (
          <span className="inline-block bg-secondary-500 text-white text-xs font-medium px-2 py-1 m-3 rounded">
            {event.category}
          </span>
        )}
      </div>
      
      <div className={cn(
        'card-body flex-1',
        isCompact ? 'w-2/3' : 'w-full'
      )}>
        {event.category && isCompact && (
          <span className="inline-block bg-secondary-500 text-white text-xs font-medium px-2 py-1 mb-2 rounded">
            {event.category}
          </span>
        )}
        
        <h3 className={cn(
          'font-serif text-primary-800 group-hover:text-primary-600 transition-colors',
          isCompact ? 'text-lg mb-1' : 'text-xl mb-2'
        )}>
          {event.title}
        </h3>
        
        <div className={cn(
          'flex items-center text-gray-600 mb-2',
          isCompact ? 'text-sm' : 'text-base'
        )}>
          <Calendar size={isCompact ? 14 : 16} className="mr-2 text-primary-600" />
          <span>{formattedDate} • {event.time}</span>
        </div>
        
        <p className={cn(
          'text-gray-500 mb-3',
          isCompact ? 'text-sm line-clamp-2' : 'line-clamp-3'
        )}>
          {event.description}
        </p>
        
        {!isCompact && (
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-auto space-y-2 sm:space-y-0">
            <span className="text-sm text-gray-600 truncate">{event.location}</span>
            <a 
              href={`/events/${event.id}`} 
              className="text-primary-600 hover:text-primary-700 font-medium text-sm whitespace-nowrap"
            >
              Learn More
            </a>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default EventCard;