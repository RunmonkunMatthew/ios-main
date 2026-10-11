import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '../../lib/supabase'

const MEALS = ['Jollof Rice & Chicken', 'Fried Rice & Fish', 'Vegetarian Option', 'No preference']
const COUNTS = [1, 2, 3, 4, 5]

function validate(f) {
  const e = {}
  if (!f.fullName.trim()) e.fullName = 'Your name is required'
  if (!f.email.trim()) e.email = 'Email is required'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = 'Please enter a valid email'
  if (!f.attendance) e.attendance = 'Please confirm attendance'
  if (f.attendance === 'yes' && !f.guestCount) e.guestCount = 'How many guests?'
  if (f.attendance === 'yes' && !f.meal) e.meal = 'Please choose a meal'
  return e
}

function Field({ label, error, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-body font-light text-cream/40 text-xs tracking-widest uppercase">
        {label}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="font-body font-light text-blush/80 text-xs px-0.5"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

export function RSVP() {
  const [fields, setFields] = useState({
    fullName: '', email: '', attendance: '', guestCount: '', meal: '', message: ''
  })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')

  function set(name, value) {
    setFields(p => ({ ...p, [name]: value }))
    if (errors[name]) setErrors(p => ({ ...p, [name]: undefined }))
  }

  async function submit() {
    const errs = validate(fields)
    if (Object.keys(errs).length) { setErrors(errs); return }
    setStatus('loading')
    try {
      const { error } = await supabase.from('rsvp_main').insert([{
        full_name: fields.fullName.trim(),
        email: fields.email.trim().toLowerCase(),
        attendance: fields.attendance,
        guest_count: fields.attendance === 'yes' ? parseInt(fields.guestCount) : 0,
        meal_preference: fields.meal || null,
        message: fields.message.trim() || null,
      }])
      if (error) { if (error.code === '23505') { setStatus('duplicate'); return } throw error }
      setStatus('success')
    } catch (err) {
      console.error(err); setStatus('error')
    }
  }

  if (status === 'success') return (
    <div className="text-center py-16 flex flex-col items-center gap-4">
      <div className="gold-rule w-20" />
      <p className="font-display italic text-gold font-light" style={{ fontSize: 'clamp(1.6rem, 4vw, 2.4rem)' }}>
        We'll see you there.
      </p>
      <p className="font-body font-light text-cream/40 text-sm" style={{ maxWidth: '38ch' }}>
        Thank you for responding. Your seat is reserved and we can't wait to celebrate with you.
      </p>
      <div className="gold-rule w-20" />
    </div>
  )

  if (status === 'duplicate') return (
    <div className="text-center py-16 flex flex-col items-center gap-4">
      <div className="gold-rule w-20" />
      <p className="font-display italic text-purple font-light" style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)' }}>
        You're already registered.
      </p>
      <p className="font-body font-light text-cream/40 text-sm">We have your response — we'll see you soon.</p>
      <div className="gold-rule w-20" />
    </div>
  )

  const attending = fields.attendance === 'yes'

  return (
    <section id="rsvp" className="section-pad">
      <div className="max-w-2xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12 flex flex-col gap-3 items-end text-right"
        >
          <h2 className="section-title">Will You Join Us?</h2>
          <div className="gold-rule w-20" />
          <p className="font-body font-light text-cream/35 text-sm" style={{ maxWidth: '40ch' }}>
            Kindly let us know by September 30, 2026.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="glass-card p-8 md:p-10 flex flex-col gap-6 relative overflow-hidden"
        >
          {/* Purple glow top right */}
          <div aria-hidden="true" className="absolute top-0 right-0 w-48 h-48 pointer-events-none"
            style={{ background: 'radial-gradient(circle at top right, rgba(123,47,190,0.12) 0%, transparent 70%)' }} />

          <Field label="Full Name" error={errors.fullName}>
            <input type="text" value={fields.fullName} onChange={e => set('fullName', e.target.value)}
              placeholder="Your full name" disabled={status === 'loading'}
              className={`field-input ${errors.fullName ? 'error' : ''}`} />
          </Field>

          <Field label="Email Address" error={errors.email}>
            <input type="email" value={fields.email} onChange={e => set('email', e.target.value)}
              placeholder="your@email.com" disabled={status === 'loading'}
              className={`field-input ${errors.email ? 'error' : ''}`} />
          </Field>

          <Field label="Will you be joining us?" error={errors.attendance}>
            <div className="flex gap-3">
              {[{ v: 'yes', l: 'Joyfully accepts' }, { v: 'no', l: 'Regretfully declines' }].map(opt => (
                <button
                  key={opt.v}
                  onClick={() => set('attendance', opt.v)}
                  disabled={status === 'loading'}
                  className="flex-1 py-3 px-4 text-xs font-body font-light tracking-widest uppercase transition-all rounded-sm"
                  style={{
                    border: fields.attendance === opt.v ? '1px solid rgba(201,169,110,0.6)' : '1px solid rgba(201,169,110,0.15)',
                    background: fields.attendance === opt.v ? 'rgba(201,169,110,0.08)' : 'transparent',
                    color: fields.attendance === opt.v ? '#C9A96E' : 'rgba(245,240,234,0.4)',
                  }}
                >
                  {opt.l}
                </button>
              ))}
            </div>
            <AnimatePresence>
              {errors.attendance && (
                <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="font-body font-light text-blush/80 text-xs">
                  {errors.attendance}
                </motion.p>
              )}
            </AnimatePresence>
          </Field>

          <AnimatePresence>
            {attending && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="flex flex-col gap-6 overflow-hidden"
              >
                <Field label="Number of Guests" error={errors.guestCount}>
                  <select value={fields.guestCount} onChange={e => set('guestCount', e.target.value)}
                    disabled={status === 'loading'}
                    className={`field-input ${errors.guestCount ? 'error' : ''}`}
                    style={{ backgroundImage: 'none', appearance: 'none' }}>
                    <option value="" disabled style={{ background: '#0A0A0F' }}>Select</option>
                    {COUNTS.map(n => (
                      <option key={n} value={n} style={{ background: '#0A0A0F' }}>
                        {n === 1 ? '1 (just me)' : `${n} guests`}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="Meal Preference" error={errors.meal}>
                  <select value={fields.meal} onChange={e => set('meal', e.target.value)}
                    disabled={status === 'loading'}
                    className={`field-input ${errors.meal ? 'error' : ''}`}
                    style={{ backgroundImage: 'none', appearance: 'none' }}>
                    <option value="" disabled style={{ background: '#0A0A0F' }}>Choose a meal</option>
                    {MEALS.map(m => (
                      <option key={m} value={m} style={{ background: '#0A0A0F' }}>{m}</option>
                    ))}
                  </select>
                </Field>
              </motion.div>
            )}
          </AnimatePresence>

          <Field label="Leave a Message (optional)" error={null}>
            <textarea
              value={fields.message}
              onChange={e => set('message', e.target.value)}
              placeholder="Share a wish or note for the couple…"
              disabled={status === 'loading'}
              rows={3}
              className="field-input resize-none"
              style={{ resize: 'none' }}
            />
          </Field>

          <AnimatePresence>
            {status === 'error' && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="text-blush/80 text-xs font-body text-center">
                Something went wrong. Please try again.
              </motion.p>
            )}
          </AnimatePresence>

          <button onClick={submit} disabled={status === 'loading'} className="gold-btn w-full">
            {status === 'loading' ? 'Sending…' : 'Send Response'}
          </button>
        </motion.div>
      </div>
    </section>
  )
}
