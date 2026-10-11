import { motion } from 'framer-motion'
import { COUPLE } from '../../lib/data'

function Portrait({ person, side, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col gap-5 w-full"
    >
      {/* Photo */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '3/4', borderRadius: '2px' }}>
        {person.image ? (
          <img src={person.image} alt={person.name} className="w-full h-full object-cover object-top" />
        ) : (
          <div
            className="w-full h-full flex items-end p-6"
            style={{
              background: side === 'groom'
                ? 'radial-gradient(ellipse at 50% 30%, rgba(123,47,190,0.22) 0%, rgba(10,10,15,0.97) 70%)'
                : 'radial-gradient(ellipse at 50% 30%, rgba(242,196,206,0.18) 0%, rgba(10,10,15,0.97) 70%)',
            }}
          >
            <p className="font-body font-light text-cream/20 text-xs tracking-widest uppercase">
              Photo coming soon
            </p>
          </div>
        )}

        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-8 h-8 pointer-events-none"
          style={{ borderTop: '1px solid rgba(201,169,110,0.35)', borderLeft: '1px solid rgba(201,169,110,0.35)' }} />
        <div className="absolute bottom-0 right-0 w-8 h-8 pointer-events-none"
          style={{ borderBottom: '1px solid rgba(201,169,110,0.35)', borderRight: '1px solid rgba(201,169,110,0.35)' }} />

        {/* Name overlay at bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 px-5 py-4"
          style={{ background: 'linear-gradient(to top, rgba(10,10,15,0.9) 0%, transparent 100%)' }}
        >
          <p className="font-display italic text-gold font-light" style={{ fontSize: 'clamp(1.4rem, 3vw, 1.9rem)' }}>
            {person.name}
          </p>
          <p className="font-body font-light text-cream/35 text-xs tracking-widest uppercase mt-0.5">
            {side === 'groom' ? 'The Groom' : 'The Bride'}
          </p>
        </div>
      </div>

      {/* Bio */}
      <p className="font-body font-light text-cream/50 leading-relaxed text-sm" style={{ maxWidth: '48ch' }}>
        {person.bio}
      </p>
    </motion.div>
  )
}

export function MeetTheCouple() {
  return (
    <section id="couple" className="section-pad">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-14 flex flex-col items-end gap-3 text-right"
        >
          <h2 className="section-title">The Couple</h2>
          <div className="gold-rule w-20" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          <Portrait person={COUPLE.groom} side="groom" delay={0} />
          <Portrait person={COUPLE.bride} side="bride" delay={0.15} />
        </div>
      </div>
    </section>
  )
}
