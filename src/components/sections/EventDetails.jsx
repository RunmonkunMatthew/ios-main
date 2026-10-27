import { motion } from 'framer-motion'
import { MapPin, Clock, Calendar } from 'lucide-react'
import { CEREMONY, RECEPTION, SCHEDULE, WEDDING } from '../../lib/data'

function EventCard({ event, delay }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay }}
      className="glass-card p-8 flex flex-col gap-5 relative overflow-hidden">
      <div aria-hidden="true" className="absolute top-0 right-0 w-32 h-32 pointer-events-none" style={{ background: 'radial-gradient(circle at top right, rgba(123,47,190,0.12) 0%, transparent 70%)' }} />
      <div className="flex flex-col gap-1">
        <p className="font-body font-light text-lilac/80 text-xs tracking-widest uppercase">{event.title}</p>
        <h3 className="font-display italic font-light text-cream" style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}>{event.venue}</h3>
      </div>
      <div className="gold-rule-solid" />
      <div className="flex flex-col gap-3">
        <div className="flex items-start gap-3"><Clock size={13} className="text-gold/60 mt-0.5 flex-shrink-0" /><p className="font-body font-light text-cream/60 text-sm">{event.time}</p></div>
        <div className="flex items-start gap-3"><MapPin size={13} className="text-gold/60 mt-0.5 flex-shrink-0" /><p className="font-body font-light text-cream/60 text-sm">{event.address}</p></div>
        <div className="flex items-start gap-3"><Calendar size={13} className="text-gold/60 mt-0.5 flex-shrink-0" /><p className="font-body font-light text-cream/60 text-sm">{WEDDING.date}</p></div>
      </div>
      {event.note && <p className="font-body font-light text-cream/30 text-xs leading-relaxed italic border-t border-gold/10 pt-4">{event.note}</p>}
    </motion.div>
  )
}

export function EventDetails() {
  return (
    <section id="details" className="section-pad">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="mb-14 flex flex-col gap-3">
          <h2 className="section-title">The Day</h2>
          <div className="gold-rule w-20" />
          <p className="font-body font-light text-cream/35 text-sm">Dress code: {WEDDING.dressCode}</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <EventCard event={CEREMONY} delay={0} />
          <EventCard event={RECEPTION} delay={0.12} />
        </div>
      </div>
    </section>
  )
}

export function Schedule() {
  return (
    <section id="schedule" className="section-pad">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="mb-14 flex flex-col items-end gap-3 text-right">
          <h2 className="section-title">Order of Day</h2>
          <div className="gold-rule w-20" />
        </motion.div>
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-px" style={{ background: 'linear-gradient(to bottom, transparent, rgba(123,47,190,0.4) 10%, rgba(123,47,190,0.4) 90%, transparent)' }} />
          <div className="flex flex-col">
            {SCHEDULE.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.6, delay: i * 0.04 }}
                className="flex gap-8 pl-8 py-5 relative" style={{ borderBottom: i < SCHEDULE.length - 1 ? '1px solid rgba(245,240,234,0.04)' : 'none' }}>
                <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full" style={{ background: '#7B2FBE', boxShadow: '0 0 6px rgba(123,47,190,0.6)' }} />
                <span className="font-body font-light text-gold/60 flex-shrink-0 text-sm" style={{ minWidth: '80px' }}>{item.time}</span>
                <span className="font-body font-light text-cream/65 text-sm">{item.event}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
