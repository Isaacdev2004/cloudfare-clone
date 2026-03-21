import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Building2, Store, Rocket, Landmark } from 'lucide-react';

export default function Solutions() {
  return (
    <div className="pt-20 pb-32">
      <div className="bg-[url('/images/grid-bg.png')] bg-repeat bg-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-5xl font-extrabold mb-6">Solutions for every business</h1>
            <p className="text-xl text-muted-foreground mb-10">
              Cloudflare empowers organizations of all sizes to securely and reliably deliver their business online.
            </p>
            <Button size="lg">Talk to an expert</Button>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              icon: Building2,
              title: "Enterprise",
              desc: "Transform your corporate network and secure your hybrid workforce with Zero Trust."
            },
            {
              icon: Store,
              title: "Small Business",
              desc: "Protect your online presence and accelerate your website with enterprise-grade tools."
            },
            {
              icon: Rocket,
              title: "Startups",
              desc: "Build scalable applications quickly using our serverless developer platform."
            },
            {
              icon: Landmark,
              title: "Public Sector",
              desc: "Secure critical infrastructure with compliant, FedRAMP-certified solutions."
            }
          ].map((sol, i) => (
             <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-card border border-border p-10 rounded-2xl group hover:border-primary/50 transition-colors cursor-pointer"
            >
              <sol.icon className="w-12 h-12 text-primary mb-6 group-hover:scale-110 transition-transform" />
              <h2 className="text-2xl font-bold mb-4">{sol.title}</h2>
              <p className="text-muted-foreground text-lg mb-6">{sol.desc}</p>
              <span className="text-primary font-medium flex items-center gap-2">
                Explore {sol.title.toLowerCase()} solutions →
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
