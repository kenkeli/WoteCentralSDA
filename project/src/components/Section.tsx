import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';

interface SectionProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  centered?: boolean;
  bgColor?: 'white' | 'light' | 'primary' | 'secondary';
  textColor?: 'dark' | 'light';
}

const Section: React.FC<SectionProps> = ({
  title,
  subtitle,
  children,
  className,
  centered = false,
  bgColor = 'white',
  textColor = 'dark',
}) => {
  const bgClasses = {
    white: 'bg-white',
    light: 'bg-gray-50',
    primary: 'bg-primary-800 text-white',
    secondary: 'bg-secondary-50',
  };

  const textClasses = {
    dark: 'text-gray-800',
    light: 'text-white',
  };

  const titleTextColor = {
    dark: 'text-primary-800',
    light: 'text-white',
  };
  
  const subtitleTextColor = {
    dark: 'text-gray-600',
    light: 'text-gray-200',
  };

  return (
    <section 
      className={cn(
        'section',
        bgClasses[bgColor],
        textClasses[textColor],
        className
      )}
    >
      <div className="container-custom">
        {(title || subtitle) && (
          <div className={cn(
            'mb-12',
            centered && 'text-center'
          )}>
            {title && (
              <motion.h2 
                className={cn(
                  'mb-4',
                  centered && 'mx-auto',
                  titleTextColor[textColor]
                )}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                {title}
              </motion.h2>
            )}
            
            {subtitle && (
              <motion.p 
                className={cn(
                  'text-xl max-w-3xl',
                  centered && 'mx-auto',
                  subtitleTextColor[textColor]
                )}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                {subtitle}
              </motion.p>
            )}
          </div>
        )}
        
        {children}
      </div>
    </section>
  );
};

export default Section;