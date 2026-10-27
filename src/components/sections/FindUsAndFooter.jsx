import { motion } from 'framer-motion'
import { WEDDING, VENUE_MAP, CEREMONY, RECEPTION } from '../../lib/data'

export function FindUs() {
  return (
    <section id="map" className="section-pad">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="mb-12 flex flex-col gap-3">
          <h2 className="section-title">Find Us</h2>
          <div className="gold-rule w-20" />
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {[CEREMONY, RECEPTION].map(ev => (
            <div key={ev.title} className="glass-card p-5 flex flex-col gap-1">
              <p className="font-body font-light text-lilac/70 text-xs tracking-widest uppercase">{ev.title}</p>
              <p className="font-display italic text-cream font-light text-lg">{ev.venue}</p>
              <p className="font-body font-light text-cream/40 text-sm">{ev.address}</p>
            </div>
          ))}
        </div>
        <div className="w-full overflow-hidden" style={{ borderRadius: '2px', border: '1px solid rgba(201,169,110,0.12)', height: '380px' }}>
          <iframe src={VENUE_MAP.embedUrl} width="100%" height="100%" style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(0.85)' }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Wedding venue map" />
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="relative py-16 px-6 overflow-hidden">
      <div className="gold-rule max-w-2xl mx-auto mb-14" />
      <div className="relative z-10 flex flex-col items-center gap-5 text-center">
        <p className="name-shimmer font-display italic font-light" style={{ fontSize: 'clamp(2rem, 7vw, 4rem)' }}>{WEDDING.groomFirst} & {WEDDING.brideFirst}</p>
        <p className="font-body font-light text-cream/25 text-xs tracking-widest uppercase">{WEDDING.date}</p>
        <div className="gold-rule w-16" />
        <p className="font-display italic text-cream/25 font-light">"Two are better than one."</p>
        <p className="font-body font-light text-cream/15 text-xs tracking-widest">Ecclesiastes 4:9</p>
        <p className="font-body font-light text-cream/15 text-xs mt-4">{WEDDING.hashtag}</p>
      </div>
    </footer>
  )
}
