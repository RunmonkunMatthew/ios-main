import { motion } from 'framer-motion'
import { useCountdown } from '../../hooks/useCountdown'

function Unit({ value, label }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="countdown-digit-sm" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)' }}>
        {String(value).padStart(2, '0')}
      </span>
      <span className="countdown-label-sm">{label}</span>
    </div>
  )
}

export function MiniCountdown() {
  const { display, real } = useCountdown({ powerUp: false })

  if (real.done) return (
    <p className="font-display italic text-gold text-xl font-light">Today is the Day.</p>
  )

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 1.2 }}
      className="flex items-end gap-5"
    >
      <Unit value={display.days} label="Days" />
      <span className="text-gold/30 font-display italic text-xl pb-4">·</span>
      <Unit value={display.hours} label="Hrs" />
      <span className="text-gold/30 font-display italic text-xl pb-4">·</span>
      <Unit value={display.minutes} label="Min" />
      <span className="text-gold/30 font-display italic text-xl pb-4">·</span>
      <Unit value={display.seconds} label="Sec" />
    </motion.div>
  )
}
