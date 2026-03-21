import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { NetworkGlobe } from '@/components/NetworkGlobe';
import { AnimatedCounter } from '@/components/AnimatedCounter';
import { Marquee } from '@/components/Marquee';
import { cn } from '@/lib/utils';
import { 
  ShieldCheck, 
  Network, 
  LockKeyhole, 
  Code2, 
  BrainCircuit, 
  Eye,
  CheckCircle2,
  Activity,
  Server
} from 'lucide-react';
import { Link } from 'wouter';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 pb-32 overflow-hidden bg-[radial-gradient(circle_at_70%_50%,_rgba(180,80,20,0.15),_#0f172a_60%)]">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 bg-[url('/images/grid-bg.png')] bg-repeat opacity-5 mix-blend-screen pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="max-w-2xl"
            >
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]">
                The <span className="text-primary">connectivity</span> cloud
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground mb-8 leading-relaxed">
                Cloudflare is the foundation for your infrastructure, applications, and teams. Make them secure, fast, and reliable with a single global network.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button size="lg" className="w-full sm:w-auto text-base bg-primary text-white hover:bg-primary/90">
                  Get started for free
                </Button>
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-base text-white border-white/20 hover:bg-white/10">
                  Contact sales
                </Button>
              </div>
              
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <div className="flex -space-x-2">
                  {[1,2,3,4].map(i => (
                    <div key={i} className={`w-8 h-8 rounded-full border-2 border-background bg-card flex items-center justify-center`}>
                      <span className="text-[10px] font-bold opacity-50">U</span>
                    </div>
                  ))}
                </div>
                <p>Trusted by millions of Internet properties</p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative h-[600px] lg:h-[700px] flex items-center justify-center"
            >
              <NetworkGlobe />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Logos Marquee Section */}
      <section className="py-10 border-y border-border bg-[#0a0f1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <p className="text-center text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Trusted by forward-thinking companies
          </p>
        </div>
        <Marquee>
          {['Shopify', 'Discord', 'Canva', 'Notion', 'L' + 'Oreal', 'IBM', 'Panasonic', 'Garmin'].map((logo, i) => (
            <h3 key={i} className="text-2xl font-black text-white/40 tracking-tighter hover:text-white/80 transition-colors cursor-default">
              {logo}
            </h3>
          ))}
        </Marquee>
      </section>

      {/* Products Grid Section */}
      <section className="py-24 bg-[#0a0f1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">Everything you need to secure and accelerate your business</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: ShieldCheck, title: "Application Services", desc: "Speed up and protect your websites, APIs, and Internet applications." },
              { icon: Network, title: "Network Services", desc: "Connect, secure, and accelerate your corporate network." },
              { icon: LockKeyhole, title: "Zero Trust Services", desc: "Secure access to applications and the Internet for all your users." },
              { icon: Code2, title: "Developer Platform", desc: "Deploy serverless code instantly across the globe. No infrastructure to maintain." },
              { icon: BrainCircuit, title: "AI", desc: "Run AI models on our global network with minimal latency and maximum privacy." },
              { icon: Eye, title: "Security Analytics", desc: "Gain visibility into your threat landscape with advanced analytics." }
            ].map((product, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative bg-gradient-to-b from-[#1e293b] to-[#0f172a] rounded-2xl p-8 border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(246,130,31,0.15)] overflow-hidden cursor-pointer"
              >
                <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-x-4 group-hover:translate-x-0">
                  <div className="w-12 h-12 bg-primary/10 rounded-full blur-xl" />
                </div>
                
                <div className="flex items-center gap-3 mb-6">
                  <product.icon className="w-8 h-8 text-primary" />
                  <h3 className="text-xl font-bold text-primary">{product.title}</h3>
                </div>
                <p className="text-muted-foreground mb-6">{product.desc}</p>
                <span className="text-primary font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                  Learn more <span className="text-lg">→</span>
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Network Stats */}
      <section className="py-24 border-y border-border bg-card relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 mix-blend-overlay" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-border">
            {[
              { end: 13000, suffix: '+', label: 'Networks Connected' },
              { end: 320, suffix: '+', label: 'Cities Worldwide' },
              { end: 50, suffix: 'ms', label: 'to 95% of Internet users' },
              { end: 248, suffix: 'Tbps', label: 'Network Capacity' },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center px-4"
              >
                <div className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-2">
                  <AnimatedCounter end={stat.end} suffix={stat.suffix} duration={2500} />
                </div>
                <p className="text-primary font-medium mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Cloudflare Split Section */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-6">The world's most performant, reliable, and secure network</h2>
              <p className="text-lg text-muted-foreground mb-8">
                We've built a global network that handles massive amounts of traffic seamlessly. By bringing our services close to your users, we ensure incredible performance and rock-solid reliability.
              </p>
              
              <ul className="space-y-4">
                {[
                  "Defend against the largest DDoS attacks in history",
                  "Load balance traffic across multiple origins",
                  "Route traffic around network congestion in real-time",
                  "Built-in redundancy at every layer"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-white/90">
                    <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              
              <Button className="mt-10" variant="outline">
                Explore our network
              </Button>
            </motion.div>
            
            {/* Abstract Server/Network Visualization */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative h-[400px] md:h-[500px] bg-card rounded-2xl border border-border overflow-hidden p-8 flex flex-col justify-center items-center group"
            >
              <div className="absolute inset-0 bg-[url('/images/grid-bg.png')] opacity-20" />
              
              <div className="relative z-10 w-full max-w-sm">
                {[1, 2, 3].map((layer) => (
                  <motion.div 
                    key={layer}
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, delay: layer * 0.5, ease: "easeInOut" }}
                    className={cn(
                      "w-full bg-background border border-border rounded-lg p-4 mb-4 flex items-center justify-between relative shadow-lg",
                      layer === 2 ? "border-primary/50 shadow-[0_0_15px_rgba(246,130,31,0.2)]" : ""
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <Server className={cn("w-6 h-6", layer === 2 ? "text-primary" : "text-muted-foreground")} />
                      <div className="h-2 w-24 bg-border rounded-full overflow-hidden">
                        <motion.div 
                          animate={{ x: ["-100%", "200%"] }}
                          transition={{ duration: 2, repeat: Infinity, delay: layer * 0.2 }}
                          className="h-full w-1/2 bg-primary/50"
                        />
                      </div>
                    </div>
                    <Activity className={cn("w-5 h-5", layer === 2 ? "text-primary animate-pulse" : "text-muted-foreground")} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Developer Section */}
      <section className="py-24 bg-[#0a0f1d] border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
             {/* Code Editor Mock */}
             <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1 rounded-xl overflow-hidden border border-white/10 bg-[#1e1e1e] shadow-2xl"
            >
              <div className="flex items-center px-4 py-3 bg-[#2d2d2d] border-b border-white/5">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="mx-auto text-xs text-white/40 font-mono">worker.js</div>
              </div>
              <div className="p-6 font-mono text-sm sm:text-base leading-relaxed overflow-x-auto">
                <p><span className="text-purple-400">export default</span> {'{'}</p>
                <p className="pl-4"><span className="text-blue-400">async</span> <span className="text-yellow-200">fetch</span>(request, env) {'{'}</p>
                <p className="pl-8"><span className="text-muted-foreground">// Intercept and modify response</span></p>
                <p className="pl-8"><span className="text-purple-400">const</span> response = <span className="text-purple-400">await</span> <span className="text-yellow-200">fetch</span>(request);</p>
                <p className="pl-8"><span className="text-purple-400">return new</span> <span className="text-yellow-200">HTMLRewriter</span>()</p>
                <p className="pl-12">.<span className="text-blue-300">on</span>(<span className="text-green-300">'h1'</span>, <span className="text-purple-400">new</span> <span className="text-yellow-200">TitleHandler</span>())</p>
                <p className="pl-12">.<span className="text-blue-300">transform</span>(response);</p>
                <p className="pl-4">{'}'}</p>
                <p>{'};'}</p>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="order-1 lg:order-2"
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Build the future with Cloudflare Workers</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Deploy serverless code instantly across the globe to give it exceptional performance, reliability, and scale. No servers to maintain, no cold starts.
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">0ms</h4>
                  <p className="text-sm text-muted-foreground">Cold starts</p>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">Global</h4>
                  <p className="text-sm text-muted-foreground">Deployment</p>
                </div>
              </div>
              
              <Link href="/products">
                <Button>Explore Developer Platform</Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 relative overflow-hidden bg-background">
        <div className="absolute inset-0 bg-primary/10" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-primary/20 blur-[150px] rounded-full pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-extrabold mb-6 text-white">Ready to get started?</h2>
          <p className="text-xl text-white/80 mb-10">
            Sign up in minutes. No credit card required for the Free plan.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="text-lg px-8 py-6 h-auto">Sign up for free</Button>
            <Button size="lg" variant="white" className="text-lg px-8 py-6 h-auto">Contact sales</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
