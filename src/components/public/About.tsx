"use client";

import { motion } from 'framer-motion';

export default function About() {
  return (
    <section id="about" className="relative min-h-screen bg-white py-16 md:py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12 md:mb-16 lg:mb-24"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight text-black mb-4">
            About
          </h2>
          <div className="h-[1px] w-20 md:w-24 bg-black" />
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-10 md:gap-12 lg:gap-24">
          
          {/* Left Column - Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6 md:space-y-8"
          >
            {/* Origin */}
            <div>
              <h3 className="text-xs sm:text-sm uppercase tracking-wider text-gray-500 mb-2 md:mb-3">Origin</h3>
              <p className="text-base md:text-lg text-gray-800 leading-relaxed">
                Born amidst the lush hills of <span className="font-medium">Abbottabad, Pakistan</span> in 1971, my creative journey began in an environment where nature and art intertwined. 
              </p>
            </div>

            {/* Legacy */}
            <div>
              <h3 className="text-xs sm:text-sm uppercase tracking-wider text-gray-500 mb-2 md:mb-3">Legacy</h3>
              <p className="text-base md:text-lg text-gray-800 leading-relaxed">
                Following in the footsteps of my father, <span className="font-medium">Mr. Abdul Ghaffar</span>, a renowned artist in his own right, I carry forward a rich family heritage that deepens my creative passion and spiritual depth of visual expression.
              </p>
            </div>

            {/* Artistic Vision */}
            <div>
              <h3 className="text-xs sm:text-sm uppercase tracking-wider text-gray-500 mb-2 md:mb-3">Artistic Vision</h3>
              <p className="text-base md:text-lg text-gray-800 leading-relaxed">
                As a multidimensional visual artist, my work reflects the clarity of nature, the delicacy of human emotions, and the depth of spiritual experience. For me, painting is a <span className="italic">meditative process</span> — where colors breathe and feelings flow through the brushstroke.
              </p>
            </div>
          </motion.div>

          {/* Right Column - Philosophy & Practice */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6 md:space-y-8"
          >
            {/* Philosophy */}
            <div>
              <h3 className="text-xs sm:text-sm uppercase tracking-wider text-gray-500 mb-2 md:mb-3">Philosophy</h3>
              <p className="text-base md:text-lg text-gray-800 leading-relaxed">
                I believe art is not merely personal expression but a <span className="font-medium">spiritual responsibility</span>. Each brushstroke is a prayer, silently turning into expression, cultivating sensitivity and visual literacy in those who witness it.
              </p>
            </div>

            {/* Creative Practice */}
            <div>
              <h3 className="text-xs sm:text-sm uppercase tracking-wider text-gray-500 mb-2 md:mb-3">Creative Practice</h3>
              <p className="text-base md:text-lg text-gray-800 leading-relaxed">
                My artistic language blends traditional techniques with modern intellectual dimensions, creating work that touches not only the eye but also the soul. Colors become symbols, texture seizes the viewer intellectually.
              </p>
            </div>

            {/* Quote */}
            <div>
              <p className="text-lg sm:text-xl md:text-2xl text-gray-700 leading-relaxed italic font-light">
                "Art is a way to experience life's most delicate emotions — where silence can speak if molded in colors."
              </p>
            </div>
          </motion.div>
        </div>

        {/* Mediums Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 md:mt-20 lg:mt-24"
        >
          <h3 className="text-xs sm:text-sm uppercase tracking-wider text-gray-500 mb-6 md:mb-8">Mediums</h3>
          
          <p className="text-base md:text-lg lg:text-xl text-gray-800 leading-relaxed max-w-5xl">
            My artistic practice spans diverse mediums including <span className="font-medium">charcoal</span>, <span className="font-medium">watercolor</span>, <span className="font-medium">acrylic</span>, and <span className="font-medium">oil painting</span>—each chosen to express different facets of human experience and natural beauty. Through <span className="font-medium">landscape painting</span>, I translate the serene essence of nature into visual poetry, while <span className="font-medium">portraiture</span> allows me to explore the human soul beyond physical likeness. My <span className="font-medium">conceptual work</span> challenges perceptions and invites contemplation, blending visual elements with philosophical ideas to create thought-provoking narratives that speak to both the eye and the intellect.
          </p>
        </motion.div>

        {/* Mission Statement - Removed */}

      </div>
    </section>
  );
}
