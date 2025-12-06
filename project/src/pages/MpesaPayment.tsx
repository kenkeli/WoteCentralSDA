import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Smartphone, CheckCircle, XCircle, Clock, ArrowLeft, FileText, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import DonationReceipt from '../components/DonationReceipt';
import { downloadReceiptAsPDF, viewReceiptInNewTab, type ReceiptData } from '../utils/receiptGenerator';

interface PaymentData {
  fullName: string;
  churchName: string;
  amount: string;
  fund: string;
  mpesaNumber: string;
}

const MpesaPayment: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'processing' | 'success' | 'failed'>('pending');
  const [transactionId, setTransactionId] = useState('');
  const [countdown, setCountdown] = useState(120); // 2 minutes countdown
  const [showReceipt, setShowReceipt] = useState(false);
  
  const paymentData = location.state as PaymentData;

  useEffect(() => {
    if (!paymentData) {
      navigate('/donate');
      return;
    }
  }, [paymentData, navigate]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (paymentStatus === 'processing' && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else if (countdown === 0 && paymentStatus === 'processing') {
      setPaymentStatus('failed');
    }
    return () => clearTimeout(timer);
  }, [countdown, paymentStatus]);

  const initiatePayment = async () => {
    setPaymentStatus('processing');
    setTransactionId(`MP${Date.now()}`);
    
    // Simulate M-Pesa API call
    // In real implementation, this would call your M-Pesa integration endpoint
    setTimeout(() => {
      // Simulate random success/failure for demo
      const success = Math.random() > 0.3; // 70% success rate
      setPaymentStatus(success ? 'success' : 'failed');
    }, 5000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleDownloadReceipt = () => {
    if (!paymentData) return;
    
    const receiptData: ReceiptData = {
      fullName: paymentData.fullName,
      churchName: paymentData.churchName,
      amount: paymentData.amount,
      fund: paymentData.fund,
      mpesaNumber: paymentData.mpesaNumber,
      transactionId: transactionId,
      date: new Date().toISOString()
    };
    
    downloadReceiptAsPDF(receiptData);
  };

  const handleViewReceipt = () => {
    if (!paymentData) return;
    
    const receiptData: ReceiptData = {
      fullName: paymentData.fullName,
      churchName: paymentData.churchName,
      amount: paymentData.amount,
      fund: paymentData.fund,
      mpesaNumber: paymentData.mpesaNumber,
      transactionId: transactionId,
      date: new Date().toISOString()
    };
    
    viewReceiptInNewTab(receiptData);
  };

  if (!paymentData) {
    return null;
  }

  if (showReceipt && paymentStatus === 'success') {
    const receiptData: ReceiptData = {
      fullName: paymentData.fullName,
      churchName: paymentData.churchName,
      amount: paymentData.amount,
      fund: paymentData.fund,
      mpesaNumber: paymentData.mpesaNumber,
      transactionId: transactionId,
      date: new Date().toISOString()
    };

    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <button
              onClick={() => setShowReceipt(false)}
              className="flex items-center text-primary-600 hover:text-primary-700 mb-4"
            >
              <ArrowLeft size={16} className="mr-2" />
              Back to Payment Status
            </button>
          </div>
          <DonationReceipt 
            donationData={receiptData} 
            onDownload={handleDownloadReceipt}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-md mx-auto">
        <motion.div
          className="bg-white rounded-lg shadow-lg p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Smartphone className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-serif font-bold text-gray-900 mb-2">
              M-Pesa Payment
            </h1>
            <p className="text-gray-600">
              Complete your donation using M-Pesa
            </p>
          </div>

          {/* Payment Details */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">Payment Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Amount:</span>
                <span className="font-medium">KES {paymentData.amount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Fund:</span>
                <span className="font-medium capitalize">{paymentData.fund}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">M-Pesa Number:</span>
                <span className="font-medium">{paymentData.mpesaNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Donor:</span>
                <span className="font-medium">{paymentData.fullName}</span>
              </div>
            </div>
          </div>

          {/* Payment Status */}
          {paymentStatus === 'pending' && (
            <div className="text-center">
              <button
                onClick={initiatePayment}
                className="btn btn-primary w-full mb-4"
              >
                <Smartphone className="w-5 h-5 mr-2" />
                Send M-Pesa Prompt
              </button>
              <p className="text-sm text-gray-600">
                Click to send an M-Pesa payment request to your phone
              </p>
            </div>
          )}

          {paymentStatus === 'processing' && (
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-yellow-600 animate-pulse" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Waiting for Payment
              </h3>
              <p className="text-gray-600 mb-4">
                Check your phone for the M-Pesa prompt and enter your PIN to complete the payment.
              </p>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                <p className="text-sm text-yellow-800">
                  <strong>Time remaining:</strong> {formatTime(countdown)}
                </p>
                <p className="text-xs text-yellow-700 mt-1">
                  Transaction ID: {transactionId}
                </p>
              </div>
            </div>
          )}

          {paymentStatus === 'success' && (
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Payment Successful!
              </h3>
              <p className="text-gray-600 mb-4">
                Thank you for your generous donation to Wote Central SDA.
              </p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-green-800">
                  <strong>Transaction ID:</strong> {transactionId}
                </p>
                <p className="text-sm text-green-800">
                  <strong>Amount:</strong> KES {paymentData.amount}
                </p>
              </div>
              <div className="space-y-3">
                <button
                  onClick={() => setShowReceipt(true)}
                  className="btn btn-primary w-full flex items-center justify-center"
                >
                  <FileText size={16} className="mr-2" />
                  View Receipt
                </button>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={handleViewReceipt}
                    className="btn btn-outline flex items-center justify-center text-sm"
                  >
                    <Eye size={14} className="mr-1" />
                    Quick View
                  </button>
                  <button
                    onClick={handleDownloadReceipt}
                    className="btn btn-outline flex items-center justify-center text-sm"
                  >
                    <FileText size={14} className="mr-1" />
                    Download
                  </button>
                </div>
                <button
                  onClick={() => navigate('/')}
                  className="btn btn-outline w-full"
                >
                  Return to Home
                </button>
              </div>
            </div>
          )}

          {paymentStatus === 'failed' && (
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <XCircle className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Payment Failed
              </h3>
              <p className="text-gray-600 mb-4">
                The payment could not be completed. Please try again.
              </p>
              <div className="space-y-3">
                <button
                  onClick={() => {
                    setPaymentStatus('pending');
                    setCountdown(120);
                  }}
                  className="btn btn-primary w-full"
                >
                  Try Again
                </button>
                <button
                  onClick={() => navigate('/donate')}
                  className="btn btn-outline w-full"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Donation Form
                </button>
              </div>
            </div>
          )}

          {/* M-Pesa Integration Guide */}
          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">
              For M-Pesa Integration Setup:
            </h4>
            <div className="text-sm text-blue-800 space-y-1">
              <p>• <strong>Consumer Key:</strong> Your Safaricom app consumer key</p>
              <p>• <strong>Consumer Secret:</strong> Your Safaricom app consumer secret</p>
              <p>• <strong>Business Short Code:</strong> Your paybill/till number</p>
              <p>• <strong>Passkey:</strong> Your M-Pesa passkey</p>
              <p>• <strong>Callback URL:</strong> Your server endpoint for callbacks</p>
            </div>
            <p className="text-xs text-blue-700 mt-2">
              Contact Safaricom to get your M-Pesa API credentials for production use.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MpesaPayment;