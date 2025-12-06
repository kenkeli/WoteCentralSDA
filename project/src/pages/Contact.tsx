import React from 'react';
import { MapPin, Mail, Phone, Clock, AlertCircle } from 'lucide-react';

// Components
import Hero from '../components/Hero';
import Section from '../components/Section';
import ContactForm from '../components/ContactForm';
import ServiceTimes from '../components/ServiceTimes';

const Contact: React.FC = () => {
  // Service times
  const services = [
    {
      name: 'Sabbath School',
      day: 'Saturday',
      time: '9:30 AM',
    },
    {
      name: 'Divine Worship',
      day: 'Saturday',
      time: '11:00 AM',
    },
    {
      name: 'Prayer Meeting',
      day: 'Wednesday',
      time: '7:00 PM',
    }
  ];

  return (
    <main>
      <Hero
        title="Contact Us"
        subtitle="We'd love to hear from you and welcome you to our church family"
        backgroundImage="https://images.pexels.com/photos/3616764/pexels-photo-3616764.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        height="medium"
      />
      
      <Section 
        bgColor="white"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-serif text-primary-800 mb-6">Get In Touch</h2>
            
            <div className="mb-8">
              <div className="space-y-4 mb-6">
                <div className="flex items-start">
                  <MapPin size={24} className="text-secondary-500 mr-3 mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900">Church Address</h3>
                    <p className="text-gray-600">Wote Town Center<br />Makueni County, Kenya</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone size={24} className="text-secondary-500 mr-3 mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900">Phone</h3>
                    <p className="text-gray-600">(254) 123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail size={24} className="text-secondary-500 mr-3 mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900">Email</h3>
                    <p className="text-gray-600">info@wotecentralsda.org</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock size={24} className="text-secondary-500 mr-3 mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900">Office Hours</h3>
                    <p className="text-gray-600">Monday - Thursday: 9:00 AM - 4:00 PM<br />Friday: 9:00 AM - 12:00 PM</p>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg overflow-hidden shadow-md h-64 mb-6">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15951.4984826428!2d37.61307198144847!3d-1.7885178737225547!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1825474608005009%3A0x6d02f4996e4a5335!2sSDA%20Church%20-%20Wote%20Central!5e0!3m2!1sen!2ske!4v1760505108053!5m2!1sen!2ske"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Church location map"
                ></iframe>
              </div>
              
              <div className="bg-primary-50 border-l-4 border-primary-600 p-4 rounded-r-md">
                <div className="flex">
                  <AlertCircle size={24} className="text-primary-600 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-primary-800">Need Prayer?</h3>
                    <p className="text-primary-700">
                      Our prayer team is available to pray with you. Submit a prayer request through our contact form or call the church office.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <h3 className="text-2xl font-serif text-primary-800 mb-4">Service Times</h3>
            <ServiceTimes 
              services={services} 
              title="" 
              compact={true}
            />
          </div>
          
          <div id="contact-form">
            <ContactForm />
          </div>
        </div>
      </Section>
      
      <Section
        title="Visit Us This Sabbath"
        subtitle="We look forward to meeting you and welcoming you to our church family"
        bgColor="light"
        centered={true}
      >
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-gray-700 mb-8">
            Whether you're a lifelong Seventh-day Adventist or exploring faith for the first time, 
            we invite you to visit us for Sabbath worship. Dress is casual, children are welcome, 
            and we have Bible study classes for all ages.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <a
              href="https://www.google.com/maps/place/SDA+Church+-+Wote+Central/@-1.7885179,37.6130720,15z/data=!4m6!3m5!1s0x1825474608005009:0x6d02f4996e4a5335!8m2!3d-1.7885179!4d37.6130720!16s%2Fg%2F11g0w1l2yj"
              className="btn btn-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Get Directions
            </a>
            <a href="#contact-form" className="btn btn-outline">
              Contact Us
            </a>
          </div>
        </div>
      </Section>
    </main>
  );
};

export default Contact;