// Receipt generation utility functions
export interface ReceiptData {
  fullName: string;
  churchName: string;
  amount: string;
  fund: string;
  mpesaNumber: string;
  transactionId: string;
  date: string;
}

export const generateReceiptHTML = (data: ReceiptData): string => {
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

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Donation Receipt - ${data.transactionId}</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          color: #333;
        }
        .header {
          text-align: center;
          border-bottom: 2px solid #2563EB;
          padding-bottom: 20px;
          margin-bottom: 30px;
        }
        .church-name {
          font-size: 24px;
          font-weight: bold;
          color: #2563EB;
          margin-bottom: 10px;
        }
        .church-info {
          color: #666;
          font-size: 14px;
        }
        .receipt-title {
          font-size: 28px;
          font-weight: bold;
          margin: 20px 0;
          color: #1E3A8A;
        }
        .receipt-details {
          background: #f8f9fa;
          padding: 20px;
          border-radius: 8px;
          margin: 20px 0;
        }
        .detail-row {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          border-bottom: 1px solid #e5e7eb;
        }
        .detail-row:last-child {
          border-bottom: none;
        }
        .detail-label {
          font-weight: 500;
          color: #666;
        }
        .detail-value {
          font-weight: 600;
          color: #333;
        }
        .amount {
          font-size: 20px;
          color: #059669;
          font-weight: bold;
        }
        .tax-info {
          background: #eff6ff;
          border: 1px solid #bfdbfe;
          border-radius: 8px;
          padding: 15px;
          margin: 20px 0;
        }
        .tax-info h4 {
          color: #1e40af;
          margin: 0 0 10px 0;
          font-size: 14px;
        }
        .tax-info p {
          color: #1e40af;
          font-size: 12px;
          margin: 0;
          line-height: 1.4;
        }
        .footer {
          text-align: center;
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #e5e7eb;
          color: #666;
          font-size: 12px;
        }
        @media print {
          body { margin: 0; }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="church-name">Wote Central SDA</div>
        <div class="church-info">
          Wote Town Center, Makueni County, Kenya<br>
          info@wotecentralsda.org | (254) 123-4567
        </div>
      </div>

      <div class="receipt-title">Donation Receipt</div>

      <div class="receipt-details">
        <div class="detail-row">
          <span class="detail-label">Donor Name:</span>
          <span class="detail-value">${data.fullName}</span>
        </div>
        ${data.churchName ? `
        <div class="detail-row">
          <span class="detail-label">Church:</span>
          <span class="detail-value">${data.churchName}</span>
        </div>
        ` : ''}
        <div class="detail-row">
          <span class="detail-label">Amount:</span>
          <span class="detail-value amount">KES ${data.amount}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Fund:</span>
          <span class="detail-value">${getFundDisplayName(data.fund)}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Payment Method:</span>
          <span class="detail-value">M-Pesa</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">M-Pesa Number:</span>
          <span class="detail-value">${data.mpesaNumber}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Transaction ID:</span>
          <span class="detail-value" style="font-family: monospace;">${data.transactionId}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Date & Time:</span>
          <span class="detail-value">${formatDate(data.date)}</span>
        </div>
      </div>

      <div class="tax-info">
        <h4>Tax Information</h4>
        <p>
          This receipt serves as proof of your donation to Wote Central SDA, a registered religious organization. 
          Please consult with your tax advisor regarding the deductibility of this contribution.
        </p>
      </div>

      <div class="footer">
        <p>Receipt generated on ${formatDate(new Date().toISOString())}</p>
        <p>For questions about this donation, please contact our office.</p>
        <p><strong>Thank you for your generous support!</strong></p>
      </div>
    </body>
    </html>
  `;
};

export const downloadReceiptAsPDF = (data: ReceiptData) => {
  // Generate HTML content
  const htmlContent = generateReceiptHTML(data);
  
  // Create a new window for printing
  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    
    // Wait for content to load, then trigger print dialog
    printWindow.onload = () => {
      setTimeout(() => {
        printWindow.print();
        // Close the window after printing (user can cancel)
        printWindow.onafterprint = () => {
          printWindow.close();
        };
      }, 250);
    };
  }
};

export const downloadReceiptAsHTML = (data: ReceiptData) => {
  const htmlContent = generateReceiptHTML(data);
  const blob = new Blob([htmlContent], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = `donation-receipt-${data.transactionId}.html`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  URL.revokeObjectURL(url);
};

export const viewReceiptInNewTab = (data: ReceiptData) => {
  const htmlContent = generateReceiptHTML(data);
  const blob = new Blob([htmlContent], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  
  window.open(url, '_blank');
  
  // Clean up the URL after a delay
  setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 1000);
};