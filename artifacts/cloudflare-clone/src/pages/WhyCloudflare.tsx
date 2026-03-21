import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

export default function WhyCloudflare() {
  return (
    <div className="pt-20 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:w-2/3"
        >
          <h1 className="text-5xl lg:text-7xl font-extrabold mb-8 text-gradient">
            A Better Internet is Possible.
          </h1>
          <p className="text-2xl text-muted-foreground mb-12 leading-relaxed">
            Cloudflare was built to make the Internet work the way it should: fast, secure, and reliable for everyone. We operate one of the world's largest networks, powering millions of businesses globally.
          </p>
          <Button size="lg" className="text-lg px-8">Our Mission</Button>
        </motion.div>
      </div>

      <div className="bg-card border-y border-border py-24 mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { num: "01", title: "Massive Scale", desc: "Our network spans 320+ cities in over 120 countries, putting us within 50ms of 95% of the Internet-connected population." },
              { num: "02", title: "Integrated Platform", desc: "Security, performance, and reliability services run on every server in every data center, reducing latency and complexity." },
              { num: "03", title: "Intelligent Routing", desc: "We analyze traffic patterns across our vast network to route around congestion and stop threats before they reach you." }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
              >
                <div className="text-6xl font-black text-border mb-6">{item.num}</div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-muted-foreground text-lg">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
