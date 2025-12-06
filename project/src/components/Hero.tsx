import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';

interface HeroProps {
  title: string;
  subtitle?: string;
  backgroundImage: string;
  buttonText?: string;
  buttonLink?: string;
  centered?: boolean;
  overlay?: boolean;
  className?: string;
  height?: 'short' | 'medium' | 'full';
}

const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  backgroundImage,
  buttonText,
  buttonLink,
  centered = true,
  overlay = true,
  className,
  height = 'medium',
}) => {
  const heightClasses = {
    short: 'min-h-[40vh]',
    medium: 'min-h-[60vh]',
    full: 'min-h-screen',
  };

  return (
    <section 
      className={cn(
        'relative flex items-center justify-center bg-cover bg-center bg-no-repeat',
        heightClasses[height],
        className
      )}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {overlay && (
        <div className="absolute inset-0 bg-black bg-opacity-50" />
      )}
      
      <div className={cn(
        'container-custom relative z-10 py-8 sm:py-12',
        centered ? 'text-center' : 'text-left'
      )}>
        <motion.h1 
          className="text-white mb-4 max-w-3xl mx-auto text-3xl sm:text-4xl md:text-5xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {title}
        </motion.h1>
        
        {subtitle && (
          <motion.p 
            className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-6 sm:mb-8 max-w-2xl mx-auto px-4 sm:px-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {subtitle}
          </motion.p>
        )}
        
        {buttonText && buttonLink && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <a 
              href={buttonLink} 
              className="btn btn-secondary"
            >
              {buttonText}
            </a>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Hero;