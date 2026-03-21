import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Shield, Globe, Cpu, Database, Eye, Zap, Lock, Code } from 'lucide-react';

const CATEGORIES = [
  {
    title: "Application Performance",
    icon: Zap,
    items: ["CDN", "DNS", "Load Balancing", "Argo Smart Routing", "Early Hints"]
  },
  {
    title: "Application Security",
    icon: Shield,
    items: ["WAF", "Bot Management", "API Shield", "Page Shield", "SSL/TLS"]
  },
  {
    title: "Zero Trust & SASE",
    icon: Lock,
    items: ["Access", "Gateway", "Browser Isolation", "CASB", "Data Loss Prevention"]
  },
  {
    title: "Network Services",
    icon: Globe,
    items: ["Magic Transit", "Magic Firewall", "Network Interconnect", "DDoS Protection"]
  },
  {
    title: "Developer Platform",
    icon: Code,
    items: ["Workers", "Pages", "R2 Storage", "D1 Database", "Queues"]
  },
  {
    title: "AI Services",
    icon: Cpu,
    items: ["Workers AI", "Vectorize", "AI Gateway"]
  }
];

export default function Products() {
  return (
    <div className="pt-20 pb-32">
      <div className="bg-card border-b border-border py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <h1 className="text-5xl font-extrabold mb-6">Cloudflare Products</h1>
            <p className="text-xl text-muted-foreground">
              A comprehensive suite of products designed to make everything you connect to the Internet secure, private, fast, and reliable.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CATEGORIES.map((cat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-card border border-border rounded-xl p-8 hover:border-primary/50 transition-colors"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <cat.icon className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-xl font-bold">{cat.title}</h2>
              </div>
              <ul className="space-y-3">
                {cat.items.map((item, j) => (
                  <li key={j}>
                    <a href="#" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group">
                      <span className="w-1.5 h-1.5 rounded-full bg-border group-hover:bg-primary transition-colors" />
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
              <Button variant="link" className="mt-6 px-0 group text-primary">
                View all <span className="group-hover:translate-x-1 transition-transform inline-block ml-1">→</span>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
