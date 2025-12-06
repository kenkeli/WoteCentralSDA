import React from 'react';
import { Heart, CreditCard, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

// Components
import Hero from '../components/Hero';
import Section from '../components/Section';
import DonationForm from '../components/DonationForm';
import ScriptureQuote from '../components/ScriptureQuote';

const Donate: React.FC = () => {
  return (
    <main>
      <Hero
        title="Support Our Ministry"
        subtitle="Partner with us in spreading the gospel and serving our community"
        backgroundImage="https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        height="medium"
      />
      
      <Section 
        bgColor="white"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-serif text-primary-800 mb-6">Give to Wote Central SDA Church</h2>
            
            <div className="space-y-6 text-gray-700 mb-8">
              <p>
                Your faithful and generous giving enables our church to continue its mission and ministry 
                in our community and around the world. As stewards of God's resources, we commit to using 
                your contributions with wisdom and integrity.
              </p>
              
              <ScriptureQuote
                text="Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver."
                reference="2 Corinthians 9:7"
              />
              
              <p>
                As Seventh-day Adventists, we believe in the biblical principle of tithing (returning 10% of 
                our increase to God) and giving offerings according to how the Lord has blessed us. Your 
                contributions support our local church operations, ministry programs, and the worldwide mission 
                of the Seventh-day Adventist Church.
              </p>
            </div>
            
            <h3 className="text-2xl font-serif text-primary-800 mb-4">Ways to Give</h3>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <div className="bg-primary-100 p-2 rounded-full text-primary-600 mr-3">
                  <Heart size={20} />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">M-Pesa Giving</h4>
                  <p className="text-gray-600">
                    Give securely using M-Pesa mobile money. Quick, convenient, and secure donations 
                    directly from your phone.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary-100 p-2 rounded-full text-primary-600 mr-3">
                  <CreditCard size={20} />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">During Worship Service</h4>
                  <p className="text-gray-600">
                    Tithes and offerings are collected during our Sabbath worship service. 
                    You can use the provided envelopes for cash or checks.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary-100 p-2 rounded-full text-primary-600 mr-3">
                  <Shield size={20} />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Mail</h4>
                  <p className="text-gray-600">
                    You can mail your tithes and offerings to the church office at:<br />
                    Wote Town Center, Makueni County, Kenya
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-primary-50 border-l-4 border-primary-600 p-4 rounded-r-md mb-6">
              <h4 className="font-medium text-primary-800 mb-1">Thank You for Your Support</h4>
              <p className="text-primary-700">
                Your faithful giving helps us continue our mission of sharing Christ's love, hope, 
                and message of salvation with our community and the world.
              </p>
            </div>
            
            <h3 className="text-2xl font-serif text-primary-800 mb-4">Financial Transparency</h3>
            <p className="text-gray-700 mb-4">
              We are committed to financial transparency and accountability. The church board reviews 
              financial statements monthly, and quarterly reports are available to church members. 
              Annual financial audits ensure proper management of all church funds.
            </p>
            <p className="text-gray-700">
              If you have questions about church finances or giving, please contact our church treasurer.
            </p>
          </div>
          
          <div>
            <DonationForm />
          </div>
        </div>
      </Section>
      
      <Section
        title="Other Ways to Support Our Ministry"
        subtitle="Beyond financial giving, there are many ways to support the mission of our church"
        bgColor="light"
        centered={true}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div 
            className="bg-white rounded-lg shadow-md p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <h3 className="text-xl font-serif text-primary-800 mb-3">Volunteer Your Time</h3>
            <p className="text-gray-600 mb-4">
              Share your talents and skills by volunteering in one of our many ministries, from children's 
              programs to community outreach.
            </p>
            <a href="/ministries" className="text-primary-600 hover:text-primary-700 font-medium">
              Explore Ministries →
            </a>
          </motion.div>
          
          <motion.div 
            className="bg-white rounded-lg shadow-md p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <h3 className="text-xl font-serif text-primary-800 mb-3">Planned Giving</h3>
            <p className="text-gray-600 mb-4">
              Consider including Wote Central SDA Church in your estate planning to leave a legacy that 
              will continue to support God's work.
            </p>
            <a href="/contact" className="text-primary-600 hover:text-primary-700 font-medium">
              Learn More →
            </a>
          </motion.div>
          
          <motion.div 
            className="bg-white rounded-lg shadow-md p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <h3 className="text-xl font-serif text-primary-800 mb-3">Specific Projects</h3>
            <p className="text-gray-600 mb-4">
              Support specific ministry initiatives, building projects, or mission trips with 
              designated donations.
            </p>
            <a href="/contact" className="text-primary-600 hover:text-primary-700 font-medium">
              Current Needs →
            </a>
          </motion.div>
        </div>
      </Section>
    </main>
  );
};

export default Donate;