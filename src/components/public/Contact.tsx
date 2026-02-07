"use client";

import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { LuMail, LuPhone, LuMapPin, LuSend, LuFacebook, LuInstagram } from 'react-icons/lu';
import { SiTiktok } from 'react-icons/si';
import toast from 'react-hot-toast';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSending(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      toast.success('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Email error:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="relative min-h-screen bg-[#F8F8F8] py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 lg:mb-20 text-center"
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight text-black mb-4">
            Get in Touch
          </h2>
          <div className="h-[1px] w-24 bg-black mx-auto" />
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          
          {/* Left Column - Contact Info (2 columns) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Artist Name */}
            <div className="pb-6 border-b border-gray-300">
              <h3 className="text-3xl md:text-4xl font-medium text-black mb-2">Nasir Shehzad</h3>
              <p className="text-base text-gray-600">Visual Artist</p>
            </div>

            {/* Contact Details */}
            <div className="space-y-6">
              {/* Email */}
              <a 
                href="mailto:strokesbynasirshehzad@gmail.com"
                className="block group"
              >
                <p className="text-xs uppercase tracking-widest text-gray-500 mb-2">Email</p>
                <p className="text-base md:text-lg text-black group-hover:text-gray-600 transition-colors break-words">
                  strokesbynasirshehzad@gmail.com
                </p>
              </a>

              {/* Phone */}
              <a 
                href="tel:+923008554243"
                className="block group"
              >
                <p className="text-xs uppercase tracking-widest text-gray-500 mb-2">Phone</p>
                <p className="text-base md:text-lg text-black group-hover:text-gray-600 transition-colors">
                  +92 300 8554243
                </p>
              </a>

              {/* Location */}
              <div>
                <p className="text-xs uppercase tracking-widest text-gray-500 mb-2">Location</p>
                <p className="text-base md:text-lg text-black">
                  Governor House Road<br />
                  Abbottabad, Pakistan
                </p>
              </div>
            </div>

            {/* Social Media */}
            <div className="pt-4">
              <p className="text-xs uppercase tracking-widest text-gray-500 mb-4">Connect</p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://www.facebook.com/share/17iF6hZvnV/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-full hover:border-black hover:bg-black hover:text-white transition-all duration-300"
                >
                  <LuFacebook className="w-4 h-4" />
                  <span className="text-sm">Facebook</span>
                </a>
                <a
                  href="https://www.instagram.com/thenasirshahzad?igsh=MXI3OWJ2MzU3a3ZxbA=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-full hover:border-black hover:bg-black hover:text-white transition-all duration-300"
                >
                  <LuInstagram className="w-4 h-4" />
                  <span className="text-sm">Instagram</span>
                </a>
                <a
                  href="https://www.tiktok.com/@nasir.shehzad55?_r=1&_t=ZS-93fjAXnJqrK"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-full hover:border-black hover:bg-black hover:text-white transition-all duration-300"
                >
                  <SiTiktok className="w-4 h-4" />
                  <span className="text-sm">TikTok</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Contact Form (3 columns) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-xs uppercase tracking-widest text-gray-500 mb-3">
                  Your Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-0 py-3 bg-transparent border-b border-gray-300 focus:border-black transition-colors outline-none text-base md:text-lg text-black placeholder:text-gray-400"
                  placeholder="Enter your name"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-xs uppercase tracking-widest text-gray-500 mb-3">
                  Your Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full px-0 py-3 bg-transparent border-b border-gray-300 focus:border-black transition-colors outline-none text-base md:text-lg text-black placeholder:text-gray-400"
                  placeholder="your.email@gmail.com"
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-xs uppercase tracking-widest text-gray-500 mb-3">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={5}
                  className="w-full px-0 py-3 bg-transparent border-b border-gray-300 focus:border-black transition-colors outline-none resize-none text-base md:text-lg text-black placeholder:text-gray-400"
                  placeholder="Write your message here..."
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={sending}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto flex items-center justify-center space-x-2 px-8 py-4 bg-black text-white hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-8"
              >
                {sending ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <LuSend className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
