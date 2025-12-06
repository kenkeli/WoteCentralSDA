import React from 'react';
import { Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';

interface ServiceTimeProps {
  name: string;
  day: string;
  time: string;
  description?: string;
}

interface ServiceTimesProps {
  services: ServiceTimeProps[];
  className?: string;
  title?: string;
  compact?: boolean;
}

const ServiceTimes: React.FC<ServiceTimesProps> = ({ 
  services,
  className,
  title = "Service Times",
  compact = false
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className={cn('py-6', className)}>
      {!compact && title && (
        <h2 className="text-2xl font-serif text-primary-800 mb-6">{title}</h2>
      )}
      
      <motion.div 
        className={cn(
          'grid gap-4',
          compact ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
        )}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {services.map((service, index) => (
          <motion.div 
            key={index}
            className={cn(
              'bg-white p-4 rounded-lg shadow-sm border border-gray-100',
              'hover:shadow-md transition-all duration-300'
            )}
            variants={itemVariants}
          >
            <div className="flex items-start">
              <Clock 
                size={compact ? 18 : 24} 
                className="text-secondary-500 mr-3 mt-1 flex-shrink-0" 
              />
              <div>
                <h3 className={cn(
                  'font-serif text-primary-800',
                  compact ? 'text-lg' : 'text-xl'
                )}>
                  {service.name}
                </h3>
                <p className="text-gray-600 font-medium">
                  {service.day}, {service.time}
                </p>
                {!compact && service.description && (
                  <p className="text-gray-500 mt-1 text-sm">
                    {service.description}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default ServiceTimes;