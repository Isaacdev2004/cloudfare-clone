import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

const PLANS = [
  {
    name: "Free",
    price: "$0",
    desc: "For personal or hobby projects that aren't business-critical.",
    features: ["Global CDN", "Unmetered DDoS Mitigation", "Free Universal SSL", "3 Page Rules"]
  },
  {
    name: "Pro",
    price: "$20",
    period: "/mo",
    desc: "For professional websites, blogs, and portfolios requiring basic security and performance.",
    features: ["Everything in Free", "Web Application Firewall (WAF)", "Image Optimization", "20 Page Rules", "Mobile Optimization"],
    popular: true
  },
  {
    name: "Business",
    price: "$200",
    period: "/mo",
    desc: "For small businesses operating online requiring advanced security, performance, and support.",
    features: ["Everything in Pro", "100% Uptime SLA", "Custom SSL Certs", "PCI DSS Compliance", "Prioritized Support"]
  }
];

export default function Pricing() {
  return (
    <div className="pt-20 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-extrabold mb-6"
        >
          Simple, transparent pricing
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-muted-foreground max-w-2xl mx-auto mb-16"
        >
          Whether you're running a personal blog or a global enterprise, we have a plan that scales with you.
        </motion.p>

        <div className="grid md:grid-cols-3 gap-8 text-left">
          {PLANS.map((plan, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 + 0.2 }}
              className={`bg-[#0f172a] rounded-2xl border p-8 flex flex-col relative ${plan.popular ? 'border-t-4 border-t-primary border-x-border border-b-border shadow-[0_0_30px_rgba(246,130,31,0.15)]' : 'border-border'}`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Popular
                </div>
              )}
              
              <h2 className="text-2xl font-bold mb-2">{plan.name}</h2>
              <p className="text-muted-foreground text-sm mb-6 h-12">{plan.desc}</p>
              
              <div className="mb-8">
                <span className="text-5xl font-black text-white">{plan.price}</span>
                {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
              </div>
              
              <Button 
                variant={plan.popular ? "default" : "outline"} 
                className={`w-full mb-8 ${plan.popular ? 'bg-primary text-white hover:bg-primary/90' : ''}`}
              >
                Get Started
              </Button>
              
              <div className="space-y-4 flex-grow">
                <p className="font-semibold text-sm uppercase tracking-wider text-white">Top Features</p>
                {plan.features.map((feature, j) => (
                  <div key={j} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
