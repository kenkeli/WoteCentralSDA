import React, { useState } from 'react';
import { CreditCard, Smartphone } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const DonationForm: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [churchName, setChurchName] = useState('');
  const [amount, setAmount] = useState('');
  const [fund, setFund] = useState('tithe');
  const [mpesaNumber, setMpesaNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      console.log('Donation form submitted:', {
        fullName,
        churchName,
        amount,
        fund,
        mpesaNumber
      });
      setIsSubmitting(false);
      // Redirect to M-Pesa payment page
      navigate('/donate/mpesa', { state: { fullName, churchName, amount, fund, mpesaNumber } });
    }, 1500);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-serif text-primary-800 mb-2">Support Our Ministry</h3>
        <p className="text-gray-600">
          Your generous contributions help us spread God's word and serve our community.
        </p>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              required
            />
          </div>
          
          <div>
            <label htmlFor="churchName" className="block text-sm font-medium text-gray-700 mb-2">
              Church Name
            </label>
            <input
              type="text"
              id="churchName"
              value={churchName}
              onChange={(e) => setChurchName(e.target.value)}
              placeholder="Enter your church name (optional)"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>
        
        <div className="mb-6">
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
            Donation Amount *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 font-medium">KES</span>
            </div>
            <input
              type="number"
              id="amount"
              min="1"
              step="any"
              value={amount}
              onChange={handleAmountChange}
              placeholder="Enter amount in KES"
              className="pl-12 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              required
            />
          </div>
        </div>
        
        <div className="mb-6">
          <label htmlFor="mpesaNumber" className="block text-sm font-medium text-gray-700 mb-2">
            M-Pesa Number *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Smartphone size={16} className="text-gray-500" />
            </div>
            <input
              type="tel"
              id="mpesaNumber"
              value={mpesaNumber}
              onChange={(e) => setMpesaNumber(e.target.value)}
              placeholder="254712345678"
              className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              required
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Enter your M-Pesa registered phone number (e.g., 254712345678)
          </p>
        </div>
        
        <div className="mb-6">
          <label htmlFor="fund" className="block text-sm font-medium text-gray-700 mb-2">
            Select Fund
          </label>
          <select
            id="fund"
            value={fund}
            onChange={(e) => setFund(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="tithe">Tithe</option>
            <option value="offerings">Church Offerings</option>
            <option value="building">Building Fund</option>
            <option value="missions">Missions</option>
            <option value="community">Community Outreach</option>
            <option value="education">Adventist Education</option>
          </select>
        </div>
        
        <motion.button
          type="submit"
          className="btn btn-primary flex items-center justify-center w-full"
          disabled={isSubmitting || !amount || !fullName || !mpesaNumber}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isSubmitting ? (
            <>
              <span className="animate-spin mr-2">⚙️</span>
              Processing...
            </>
          ) : (
            <>
              <Smartphone size={18} className="mr-2" />
              Pay with M-Pesa
            </>
          )}
        </motion.button>
        
        <p className="text-xs text-gray-500 text-center mt-4">
          All M-Pesa transactions are secure and encrypted. You will receive an M-Pesa prompt on your phone.
        </p>
      </form>
    </div>
  );
};

export default DonationForm;