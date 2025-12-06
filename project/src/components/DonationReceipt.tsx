import React from 'react';
import { Download, CheckCircle, Calendar, User, CreditCard, Building } from 'lucide-react';
import { motion } from 'framer-motion';

interface DonationReceiptProps {
  donationData: {
    fullName: string;
    churchName: string;
    amount: string;
    fund: string;
    mpesaNumber: string;
    transactionId: string;
    date: string;
  };
  onDownload: () => void;
}

const DonationReceipt: React.FC<DonationReceiptProps> = ({ donationData, onDownload }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getFundDisplayName = (fund: string) => {
    const fundNames: { [key: string]: string } = {
      'tithe': 'Tithe',
      'offerings': 'Church Offerings',
      'building': 'Building Fund',
      'missions': 'Missions',
      'community': 'Community Outreach',
      'education': 'Adventist Education'
    };
    return fundNames[fund] || fund;
  };

  return (
    <motion.div
      className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Header */}
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-serif font-bold text-gray-900 mb-2">
          Donation Receipt
        </h2>
        <p className="text-gray-600">
          Thank you for your generous contribution
        </p>
      </div>

      {/* Church Info */}
      <div className="text-center mb-6 pb-4 border-b border-gray-200">
        <h3 className="text-lg font-serif font-bold text-primary-800">
          Wote Central SDA
        </h3>
        <p className="text-sm text-gray-600">
          Wote Town Center, Makueni County, Kenya
        </p>
        <p className="text-sm text-gray-600">
          info@wotecentralsda.org | (254) 123-4567
        </p>
      </div>

      {/* Receipt Details */}
      <div className="space-y-4 mb-6">
        <div className="flex items-center justify-between py-2 border-b border-gray-100">
          <div className="flex items-center">
            <User size={16} className="text-gray-500 mr-2" />
            <span className="text-sm text-gray-600">Donor Name:</span>
          </div>
          <span className="font-medium text-gray-900">{donationData.fullName}</span>
        </div>

        {donationData.churchName && (
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <div className="flex items-center">
              <Building size={16} className="text-gray-500 mr-2" />
              <span className="text-sm text-gray-600">Church:</span>
            </div>
            <span className="font-medium text-gray-900">{donationData.churchName}</span>
          </div>
        )}

        <div className="flex items-center justify-between py-2 border-b border-gray-100">
          <div className="flex items-center">
            <CreditCard size={16} className="text-gray-500 mr-2" />
            <span className="text-sm text-gray-600">Amount:</span>
          </div>
          <span className="font-bold text-lg text-green-600">KES {donationData.amount}</span>
        </div>

        <div className="flex items-center justify-between py-2 border-b border-gray-100">
          <span className="text-sm text-gray-600">Fund:</span>
          <span className="font-medium text-gray-900">{getFundDisplayName(donationData.fund)}</span>
        </div>

        <div className="flex items-center justify-between py-2 border-b border-gray-100">
          <span className="text-sm text-gray-600">Payment Method:</span>
          <span className="font-medium text-gray-900">M-Pesa</span>
        </div>

        <div className="flex items-center justify-between py-2 border-b border-gray-100">
          <span className="text-sm text-gray-600">M-Pesa Number:</span>
          <span className="font-medium text-gray-900">{donationData.mpesaNumber}</span>
        </div>

        <div className="flex items-center justify-between py-2 border-b border-gray-100">
          <span className="text-sm text-gray-600">Transaction ID:</span>
          <span className="font-mono text-sm font-medium text-gray-900">{donationData.transactionId}</span>
        </div>

        <div className="flex items-center justify-between py-2">
          <div className="flex items-center">
            <Calendar size={16} className="text-gray-500 mr-2" />
            <span className="text-sm text-gray-600">Date & Time:</span>
          </div>
          <span className="font-medium text-gray-900 text-sm">{formatDate(donationData.date)}</span>
        </div>
      </div>

      {/* Tax Information */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <h4 className="font-semibold text-blue-900 mb-2 text-sm">
          Tax Information
        </h4>
        <p className="text-xs text-blue-800">
          This receipt serves as proof of your donation to Wote Central SDA, a registered religious organization. 
          Please consult with your tax advisor regarding the deductibility of this contribution.
        </p>
      </div>

      {/* Download Button */}
      <motion.button
        onClick={onDownload}
        className="btn btn-primary w-full flex items-center justify-center"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Download size={18} className="mr-2" />
        Download Receipt (PDF)
      </motion.button>

      {/* Footer */}
      <div className="text-center mt-6 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500">
          Receipt generated on {formatDate(new Date().toISOString())}
        </p>
        <p className="text-xs text-gray-500 mt-1">
          For questions about this donation, please contact our office.
        </p>
      </div>
    </motion.div>
  );
};

export default DonationReceipt;