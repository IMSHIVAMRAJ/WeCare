// AboutUs.jsx
import React from 'react';
import { motion } from 'framer-motion';

const AboutUs = () => {
  return (
    <div className="bg-purple-50 min-h-screen text-gray-800">
      <div className="max-w-5xl mx-auto px-6 py-16">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-purple-700 mb-4">
            About Us
          </h1>
          <p className="text-lg text-gray-600 italic">
            "Because dignity, comfort, and care should never be a luxury — they are a right."
          </p>
        </motion.div>

        {/* Who We Are */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-purple-600 mb-4">
           💌 Who We Are
          </h2>
          <p className="text-gray-700 leading-relaxed">
            At <span className="font-semibold text-purple-700">We Care</span>, we’re a team of compassionate caregivers, healthcare professionals, and wellness experts dedicated to providing in-home grooming and care services to seniors and differently-abled individuals. Our mission is to bring comfort and dignity right to your doorstep.
          </p>
        </motion.div>

        {/* Why Choose Us */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-purple-600 mb-4">
            🧑‍🤝‍🧑Why Choose Us?
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>💜 Specialized care tailored to individual needs</li>
            <li>🧑‍⚕️ Trained and verified professionals</li>
            <li>🏡 Comfort of services in your own home</li>
            <li>🕊️ Respect for privacy, dignity, and personal space</li>
          </ul>
        </motion.div>

        {/* Our Values */}
        <div className="grid sm:grid-cols-2 gap-6">
          {[
            { title: "Compassion", desc: "We treat every client like family." },
            { title: "Respect", desc: "Your dignity and comfort come first." },
            { title: "Reliability", desc: "On-time, dependable care." },
            { title: "Empowerment", desc: "Helping you live life fully, your way." },
          ].map((val, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * idx, duration: 0.4 }}
              className="bg-white p-6 rounded-2xl shadow-md border-l-4 border-purple-400"
            >
              <h3 className="text-xl font-bold text-purple-700 mb-2">{val.title}</h3>
              <p className="text-gray-600">{val.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
