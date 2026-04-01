import React, { FormEvent, useState } from 'react';
import { motion } from 'framer-motion';
import { PageHero } from '@/components/layout/PageHero';
import { fadeInUp } from '@/lib/motion';
import { InnerHeroBackdrop, SectionGridWash } from '@/components/layout/InnerPageChrome';
import { Mail } from 'lucide-react';

const inputClass =
  'w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-[15px] text-slate-900 font-sans placeholder:text-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/25 focus:border-[#1E3A8A]';
const labelClass = 'mb-1.5 block text-sm font-medium text-slate-700 font-sans';

export default function ContactApexlynPage() {
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen apex-page-bg">
      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        <InnerHeroBackdrop />
        <div className="relative z-[1] mx-auto flex max-w-[1280px] flex-col gap-6 px-6 py-16 sm:flex-row sm:items-start sm:py-20 lg:py-24">
          <div className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm sm:flex">
            <Mail className="h-7 w-7 text-[#1E3A8A]" strokeWidth={1.5} />
          </div>
          <PageHero
            variant="light"
            eyebrow="Contact"
            title="Start a Strategic Conversation"
            description="Tell us what you need to prove, what you need to protect, and what your constraints are. We’ll respond with a clear path forward."
            className="min-w-0 flex-1 bg-transparent"
            contentClassName="py-0 sm:py-0 max-w-3xl"
          />
        </div>
      </section>

      <div className="relative overflow-hidden py-12 md:py-16">
        <SectionGridWash />
        <div className="relative z-[1] mx-auto max-w-[560px] px-6">
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mb-8 text-center text-sm font-medium tracking-wide text-slate-500"
          >
            Clear answers • No pressure • Built for serious operators
          </motion.p>

          {submitted ? (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-[15px] text-slate-600 shadow-lg"
            >
              Thank you. Your inquiry has been recorded for this demo. Connect a backend to deliver messages securely.
            </motion.p>
          ) : (
            <motion.form
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              onSubmit={onSubmit}
              className="space-y-5 rounded-2xl border border-slate-200/90 bg-white p-8 shadow-[0_24px_56px_-32px_rgba(11,19,32,0.18)]"
            >
              <div>
                <label className={labelClass} htmlFor="contact-name">
                  Name
                </label>
                <input id="contact-name" name="name" className={inputClass} required autoComplete="name" />
              </div>
              <div>
                <label className={labelClass} htmlFor="contact-email">
                  Work email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  className={inputClass}
                  required
                  autoComplete="email"
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="contact-message">
                  Message
                </label>
                <textarea id="contact-message" name="message" className={`${inputClass} min-h-[120px] resize-y`} required />
              </div>
              <button
                type="submit"
                className="w-full rounded-lg px-6 py-3.5 text-[15px] font-semibold text-white transition-colors bg-[#1E3A8A] hover:bg-[#172554] sm:w-auto"
              >
                Send a Secure Inquiry
              </button>
            </motion.form>
          )}
        </div>
      </div>
    </div>
  );
}
