import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';

export interface BeliefProps {
  id: string;
  title: string;
  summary: string;
  scriptureRef: string;
  description?: string;
  icon?: React.ReactNode;
}

interface BeliefsCardProps {
  belief: BeliefProps;
  className?: string;
  expanded?: boolean;
  onClick?: () => void;
}

const BeliefsCard: React.FC<BeliefsCardProps> = ({ 
  belief,
  className,
  expanded = false,
  onClick
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
        'card cursor-pointer',
        expanded && 'ring-2 ring-primary-600',
        className
      )}
      onClick={onClick}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{ y: -5 }}
    >
      <div className="card-body">
        <div className="flex items-center mb-4">
          {belief.icon && (
            <div className="mr-3 text-primary-600">
              {belief.icon}
            </div>
          )}
          <h3 className="text-xl font-serif text-primary-800">
            {belief.title}
          </h3>
        </div>
        
        <p className="text-gray-700 mb-2">
          {belief.summary}
        </p>
        
        <p className="text-sm italic text-gray-600 mb-3">
          {belief.scriptureRef}
        </p>
        
        {expanded && belief.description && (
          <motion.div 
            className="mt-4 text-gray-700 pt-4 border-t border-gray-200"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
          >
            <p>{belief.description}</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default BeliefsCard;