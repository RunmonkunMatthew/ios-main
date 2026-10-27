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
      <label className="font-body font-light text-cream/40 text-xs tracking-widest uppercase">{label}</label>
      {children}
      <AnimatePresence>{error && <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="font-body font-light text-blush/80 text-xs">{error}</motion.p>}</AnimatePresence>
    </div>
  )
}

function Done({ title, text }) {
  return (
    <section id="rsvp" className="section-pad">
      <div className="text-center flex flex-col items-center gap-4 px-6">
        <div className="gold-rule w-20" />
        <p className="font-display italic text-gold font-light" style={{ fontSize: 'clamp(1.6rem, 4vw, 2.4rem)' }}>{title}</p>
        <p className="font-body font-light text-cream/40 text-sm" style={{ maxWidth: '38ch' }}>{text}</p>
        <div className="gold-rule w-20" />
      </div>
    </section>
  )
}

export function RSVP() {
  const [f, setF] = useState({ fullName: '', email: '', attendance: '', guestCount: '', meal: '', message: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')

  const set = (k, v) => { setF(p => ({ ...p, [k]: v })); if (errors[k]) setErrors(p => ({ ...p, [k]: undefined })) }

  async function submit() {
    const errs = validate(f)
    if (Object.keys(errs).length) { setErrors(errs); return }
    setStatus('loading')
    const yes = f.attendance === 'yes'
    const { error } = await supabase.from('rsvp_main').insert([{
      full_name: f.fullName.trim(), email: f.email.trim().toLowerCase(), attendance: f.attendance,
      guest_count: yes ? parseInt(f.guestCount) : 0, meal_preference: yes ? f.meal : null, message: f.message.trim() || null,
    }])
    if (error) { setStatus(error.code === '23505' ? 'duplicate' : 'error'); return }
    setStatus('success')
  }

  if (status === 'success') return <Done title="We'll see you there." text="Thank you for responding. We can't wait to celebrate with you." />
  if (status === 'duplicate') return <Done title="You've already responded." text="We have your RSVP on record. See you soon." />

  const yes = f.attendance === 'yes'
  const busy = status === 'loading'
  return (
    <section id="rsvp" className="section-pad">
      <div className="max-w-2xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="mb-12 flex flex-col gap-3 items-end text-right">
          <h2 className="section-title">Will You Join Us?</h2>
          <div className="gold-rule w-20" />
          <p className="font-body font-light text-cream/35 text-sm">Kindly respond before the day.</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.1 }}
          className="glass-card p-8 md:p-10 flex flex-col gap-6 relative overflow-hidden">
          <Field label="Full Name" error={errors.fullName}>
            <input type="text" value={f.fullName} onChange={e => set('fullName', e.target.value)} placeholder="Your full name" disabled={busy} className={`field-input ${errors.fullName ? 'error' : ''}`} />
          </Field>
          <Field label="Email Address" error={errors.email}>
            <input type="email" value={f.email} onChange={e => set('email', e.target.value)} placeholder="your@email.com" disabled={busy} className={`field-input ${errors.email ? 'error' : ''}`} />
          </Field>
          <Field label="Will you be joining us?" error={errors.attendance}>
            <div className="flex gap-3">
              {[{ v: 'yes', l: 'Joyfully accepts' }, { v: 'no', l: 'Regretfully declines' }].map(o => (
                <button key={o.v} type="button" onClick={() => set('attendance', o.v)} disabled={busy}
                  className="flex-1 py-3 px-3 text-xs font-body font-light tracking-widest uppercase rounded-sm transition-all"
                  style={{ border: f.attendance === o.v ? '1px solid rgba(201,169,110,0.6)' : '1px solid rgba(201,169,110,0.15)', background: f.attendance === o.v ? 'rgba(201,169,110,0.08)' : 'transparent', color: f.attendance === o.v ? '#C9A96E' : 'rgba(245,240,234,0.4)' }}>
                  {o.l}
                </button>
              ))}
            </div>
          </Field>
          <AnimatePresence>
            {yes && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="flex flex-col gap-6 overflow-hidden">
                <Field label="Number of Guests" error={errors.guestCount}>
                  <select value={f.guestCount} onChange={e => set('guestCount', e.target.value)} disabled={busy} className={`field-input ${errors.guestCount ? 'error' : ''}`}>
                    <option value="" disabled style={{ background: '#0A0A0F' }}>Select</option>
                    {COUNTS.map(n => <option key={n} value={n} style={{ background: '#0A0A0F' }}>{n === 1 ? '1 (just me)' : `${n} guests`}</option>)}
                  </select>
                </Field>
                <Field label="Meal Preference" error={errors.meal}>
                  <select value={f.meal} onChange={e => set('meal', e.target.value)} disabled={busy} className={`field-input ${errors.meal ? 'error' : ''}`}>
                    <option value="" disabled style={{ background: '#0A0A0F' }}>Choose a meal</option>
                    {MEALS.map(m => <option key={m} value={m} style={{ background: '#0A0A0F' }}>{m}</option>)}
                  </select>
                </Field>
              </motion.div>
            )}
          </AnimatePresence>
          <Field label="Leave a Message (optional)">
            <textarea value={f.message} onChange={e => set('message', e.target.value)} placeholder="Share a note for the couple…" disabled={busy} rows={3} className="field-input" style={{ resize: 'none' }} />
          </Field>
          {status === 'error' && <p className="text-blush/80 text-xs font-body text-center">Something went wrong. Please try again.</p>}
          <button onClick={submit} disabled={busy} className="gold-btn w-full">{busy ? 'Sending…' : 'Send Response'}</button>
        </motion.div>
      </div>
    </section>
  )
}
