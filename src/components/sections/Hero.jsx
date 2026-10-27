import { motion } from 'framer-motion'
import { MiniCountdown } from '../ui/MiniCountdown'
import { WEDDING } from '../../lib/data'

export function Hero() {
  return (
    <section id="hero" className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background — replace div with <img src="/images/hero.jpg"> when photo arrives */}
      <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at 30% 60%, rgba(123,47,190,0.25) 0%, transparent 60%), radial-gradient(ellipse at 70% 40%, rgba(201,169,110,0.12) 0%, transparent 55%), linear-gradient(180deg, #0f0a1a 0%, #0A0A0F 100%)` }} aria-hidden="true" />
      <div className="absolute inset-0" aria-hidden="true" style={{ background: 'linear-gradient(to bottom, rgba(10,10,15,0.55) 0%, rgba(10,10,15,0.3) 40%, rgba(10,10,15,0.75) 80%, rgba(10,10,15,0.95) 100%)' }} />
      <div aria-hidden="true" className="absolute top-0 left-0 w-96 h-96 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(123,47,190,0.18) 0%, transparent 70%)', transform: 'translate(-30%, -30%)' }} />

      <div className="relative z-10 flex flex-col items-center text-center px-6" style={{ gap: '2rem' }}>
        <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3 }}
          className="font-body font-light text-cream/35 text-xs" style={{ letterSpacing: '0.38em', textTransform: 'uppercase' }}>
          The wedding of
        </motion.p>

        <div className="flex flex-col items-center" style={{ gap: '0.3rem' }}>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="name-shimmer font-display italic font-light" style={{ fontSize: 'clamp(3rem, 11vw, 7.5rem)', lineHeight: 1, letterSpacing: '-0.01em' }}>
            {WEDDING.groomFirst}
          </motion.h1>

          <motion.div initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }} transition={{ duration: 0.9, delay: 0.9 }}
            className="flex items-center gap-4 w-full max-w-xs">
            <div className="gold-rule flex-1" />
            <span className="font-display text-gold/60 font-light" style={{ fontSize: 'clamp(1.2rem, 3vw, 1.8rem)' }}>&</span>
            <div className="gold-rule flex-1" />
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: -24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="name-shimmer font-display italic font-light" style={{ fontSize: 'clamp(3rem, 11vw, 7.5rem)', lineHeight: 1, letterSpacing: '-0.01em' }}>
            {WEDDING.brideFirst}
          </motion.h1>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 1 }} className="flex flex-col items-center gap-1">
          <p className="font-body font-light text-cream/40" style={{ fontSize: '0.65rem', letterSpacing: '0.35em', textTransform: 'uppercase' }}>
            {WEDDING.initials} · {WEDDING.date}
          </p>
        </motion.div>

        <MiniCountdown />

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 2.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
            <div style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, transparent, rgba(201,169,110,0.5), transparent)', margin: '0 auto' }} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
