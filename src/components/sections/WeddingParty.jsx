import { motion } from 'framer-motion'
import { WEDDING_PARTY } from '../../lib/data'

function MemberCard({ member, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay }}
      className="flex flex-col items-center gap-3 text-center"
    >
      {/* Square photo */}
      <div className="relative overflow-hidden w-full" style={{ aspectRatio: '1/1', borderRadius: '2px', maxWidth: '160px' }}>
        {member.image ? (
          <img src={member.image} alt={member.name} className="w-full h-full object-cover object-top" />
        ) : (
          <div
            className="w-full h-full"
            style={{ background: 'radial-gradient(circle at 50% 40%, rgba(123,47,190,0.15) 0%, rgba(10,10,15,0.9) 70%)' }}
          />
        )}
        <div className="absolute inset-0 border border-gold/10" style={{ borderRadius: '2px' }} />
      </div>

      <div>
        <p className="font-display italic text-cream font-light" style={{ fontSize: '1.05rem' }}>
          {member.name}
        </p>
        <p className="font-body font-light text-purple/70 text-xs tracking-widest uppercase mt-0.5">
          {member.role}
        </p>
      </div>
    </motion.div>
  )
}

function Group({ title, members, align }) {
  return (
    <div className={`flex flex-col gap-8 ${align === 'right' ? 'items-end text-right' : 'items-start'}`}>
      <div className={`flex flex-col gap-2 ${align === 'right' ? 'items-end' : ''}`}>
        <p className="font-body font-light text-purple/70 text-xs tracking-widest uppercase">{title}</p>
        <div className="gold-rule w-16" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
        {members.map((m, i) => (
          <MemberCard key={i} member={m} delay={i * 0.07} />
        ))}
      </div>
    </div>
  )
}

export function WeddingParty() {
  return (
    <section id="party" className="section-pad">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-14 flex flex-col gap-3"
        >
          <h2 className="section-title">Wedding Party</h2>
          <div className="gold-rule w-20" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <Group title="Bridesmaids" members={WEDDING_PARTY.bridesmaids} align="left" />
          <Group title="Groomsmen" members={WEDDING_PARTY.groomsmen} align="right" />
        </div>
      </div>
    </section>
  )
}
