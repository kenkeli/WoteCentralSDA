import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';

interface ScriptureQuoteProps {
  text: string;
  reference: string;
  className?: string;
}

const ScriptureQuote: React.FC<ScriptureQuoteProps> = ({
  text,
  reference,
  className,
}) => {
  return (
    <motion.div 
      className={cn(
        'scripture-quote',
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <p className="mb-2">{text}</p>
      <p className="text-right font-medium text-sm">{reference}</p>
    </motion.div>
  );
};

export default ScriptureQuote;