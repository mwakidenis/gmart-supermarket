import React from 'react';
import './styles.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const socialLinks = [
    { icon: "/SocialMedia/Facebook.svg", alt: "Facebook" },
    { icon: "/SocialMedia/Instagram.svg", alt: "Instagram" },
    { icon: "/SocialMedia/LinkedIn.svg", alt: "LinkedIn" },
    { icon: "/SocialMedia/Twitter.svg", alt: "Twitter" },
    { icon: "/SocialMedia/YouTube.svg", alt: "YouTube" }
  ];

  const contactInfo = [
    { icon: "/Contacts/Email.svg", text: "support@gmart.co.ke", alt: "Email" },
    { icon: "/Contacts/Phone.svg", text: "+254 798 750 585", alt: "Phone" }
  ];

  return (
    <footer className="bg-gray-50 mt-20">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Logo and Social Section */}
          <div className="flex flex-col items-center md:items-start space-y-6">
            <img 
              src="/logo.svg" 
              className="h-16 md:h-20 w-auto"
              alt="Company Logo"
            />
            
            <p className="text-gray-600 font-medium text-center md:text-left">
              Simply Better
            </p>
            
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <button
                  key={social.alt}
                  className="p-2 rounded-full hover:bg-gray-200 transition-all duration-300 group"
                >
                  <img 
                    src={social.icon}
                    className="h-5 w-5 group-hover:scale-110 transition-transform"
                    alt={social.alt}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Contact Section */}
          <div className="flex flex-col space-y-6">
            <h3 className="text-green-600 font-bold text-lg">Contact Us</h3>
            
            <div className="space-y-4">
              {contactInfo.map((contact) => (
                <div key={contact.alt} className="flex items-center space-x-3">
                  <div className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                    <img 
                      src={contact.icon}
                      className="h-5 w-5"
                      alt={contact.alt}
                    />
                  </div>
                  <span className="text-gray-600 hover:text-gray-900 transition-colors">
                    {contact.text}
                  </span>
                </div>
              ))}
              
              {/* Location Map */}
              <div className="flex flex-col space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                    <img 
                      src="/Contacts/Mark.svg"
                      className="h-5 w-5"
                      alt="Location"
                    />
                  </div>
                  <span className="text-gray-600">Our Location (Nairobi, Kenya)</span>
                </div>
                <div className="rounded-lg overflow-hidden shadow-lg w-full">
                  <iframe
                    title="Embedded Google Map"
                    src="https://www.google.com/maps?q=Nairobi,Kenya&output=embed"
                    className="w-full h-40 sm:h-44 md:h-48"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-gray-200">
        <div className="w-full mx-auto px-2 py-6" style={{maxWidth: 'none', overflow: 'visible'}}>
          <div className="footer-bottom" style={{overflow: 'visible', width: '100%'}}>
            <div className="copyright">© {new Date().getFullYear()} mwakidev. All rights reserved</div>
            <div className="payment" style={{overflow: 'visible', flexShrink: 0}}>
              <img 
                src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/payment-method-c454fb.svg" 
                alt="Payment methods" 
                style={{
                  width: '450px',
                  height: '90px',
                  minWidth: '450px',
                  minHeight: '90px',
                  maxWidth: 'none',
                  maxHeight: 'none',
                  objectFit: 'contain',
                  display: 'block',
                  flexShrink: 0
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;