import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { WEDDING } from '../lib/data'

// ─── Wish card ────────────────────────────────────────────────────────────────
function WishCard({ wish, index }) {
  const date = new Date(wish.created_at).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric'
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      style={{
        background: 'rgba(245,240,234,0.03)',
        border: '1px solid rgba(200,162,200,0.15)',
        padding: '1.5rem',
        borderRadius: '2px',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Lilac glow top right */}
      <div style={{
        position: 'absolute', top: 0, right: 0, width: '80px', height: '80px', pointerEvents: 'none',
        background: 'radial-gradient(circle at top right, rgba(200,162,200,0.1) 0%, transparent 70%)',
      }} />

      {/* Opening quote mark */}
      <span style={{
        fontFamily: '"Cormorant Garamond", serif',
        fontSize: '3rem',
        lineHeight: 1,
        color: 'rgba(201,169,110,0.2)',
        position: 'absolute',
        top: '6px',
        left: '14px',
        fontStyle: 'italic',
      }}>"</span>

      <p style={{
        fontFamily: '"Cormorant Garamond", serif',
        fontStyle: 'italic',
        fontWeight: 400,
        fontSize: '1rem',
        lineHeight: 1.65,
        color: 'rgba(245,240,234,0.7)',
        paddingTop: '1rem',
        margin: 0,
      }}>
        {wish.message}
      </p>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <p style={{
          fontFamily: '"DM Sans", sans-serif',
          fontWeight: 400,
          fontSize: '0.8rem',
          color: '#C9A96E',
          margin: 0,
          fontStyle: 'normal',
        }}>
          — {wish.name}
        </p>
        <p style={{
          fontFamily: '"DM Sans", sans-serif',
          fontWeight: 300,
          fontSize: '0.6rem',
          color: 'rgba(245,240,234,0.2)',
          letterSpacing: '0.08em',
          margin: 0,
        }}>
          {date}
        </p>
      </div>
    </motion.div>
  )
}

// ─── Submit form ──────────────────────────────────────────────────────────────
function WishForm({ onSubmitted }) {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')

  function validate() {
    const e = {}
    if (!name.trim()) e.name = 'Please tell us your name'
    if (!message.trim()) e.message = 'Please share a wish'
    else if (message.trim().length < 10) e.message = 'Share a little more — at least 10 characters'
    return e
  }

  async function submit() {
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setStatus('loading')

    try {
      const { error } = await supabase.from('wishes').insert([{
        name: name.trim(),
        message: message.trim(),
      }])
      if (error) throw error
      setStatus('success')
      onSubmitted({ name: name.trim(), message: message.trim(), created_at: new Date().toISOString() })
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{ textAlign: 'center', padding: '2rem 0' }}
      >
        <Heart size={20} style={{ color: '#C8A2C8', margin: '0 auto 0.75rem' }} />
        <p style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', color: '#C9A96E', fontSize: '1.3rem', margin: '0 0 0.5rem' }}>
          Thank you for your blessing.
        </p>
        <p style={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 300, fontSize: '0.8rem', color: 'rgba(245,240,234,0.35)' }}>
          Your wish has been added to the guestbook.
        </p>
      </motion.div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <input
          type="text"
          value={name}
          onChange={e => { setName(e.target.value); if (errors.name) setErrors(p => ({ ...p, name: undefined })) }}
          placeholder="Your name"
          disabled={status === 'loading'}
          className={`field-input ${errors.name ? 'error' : ''}`}
        />
        {errors.name && <p style={{ color: 'rgba(242,196,206,0.8)', fontSize: '0.7rem', fontFamily: '"DM Sans", sans-serif' }}>{errors.name}</p>}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <textarea
          value={message}
          onChange={e => { setMessage(e.target.value); if (errors.message) setErrors(p => ({ ...p, message: undefined })) }}
          placeholder="Leave a wish, a prayer, or a memory for Peter & Paulinah…"
          disabled={status === 'loading'}
          rows={4}
          className={`field-input ${errors.message ? 'error' : ''}`}
          style={{ resize: 'none' }}
        />
        {errors.message && <p style={{ color: 'rgba(242,196,206,0.8)', fontSize: '0.7rem', fontFamily: '"DM Sans", sans-serif' }}>{errors.message}</p>}
      </div>

      {status === 'error' && (
        <p style={{ color: 'rgba(242,196,206,0.8)', fontSize: '0.75rem', fontFamily: '"DM Sans", sans-serif', textAlign: 'center' }}>
          Something went wrong. Please try again.
        </p>
      )}

      <button onClick={submit} disabled={status === 'loading'} className="gold-btn w-full">
        {status === 'loading' ? 'Sending…' : 'Leave Your Wish'}
      </button>
    </div>
  )
}

// ─── Main Wishes Page ─────────────────────────────────────────────────────────
export function WishesPage() {
  const [wishes, setWishes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase
      .from('wishes')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setWishes(data || [])
        setLoading(false)
      })

    // Real-time subscription — new wishes appear live
    const channel = supabase
      .channel('wishes-realtime')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'wishes' },
        payload => setWishes(prev => [payload.new, ...prev])
      )
      .subscribe()

    return () => supabase.removeChannel(channel)
  }, [])

  function onSubmitted(newWish) {
    setWishes(prev => [newWish, ...prev])
  }

  return (
    <div
      className="min-h-screen"
      style={{
        background: `
          radial-gradient(ellipse at 20% 10%, rgba(200,162,200,0.1) 0%, transparent 50%),
          radial-gradient(ellipse at 80% 90%, rgba(242,196,206,0.08) 0%, transparent 50%),
          #0A0A0F
        `,
      }}
    >
      {/* Vignette */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 1,
        background: 'radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(10,10,15,0.6) 100%)',
      }} />

      <div style={{ position: 'relative', zIndex: 10, maxWidth: '720px', margin: '0 auto', padding: 'clamp(5rem, 12vh, 8rem) 1.5rem 6rem' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          style={{ marginBottom: '3.5rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}
        >
          <p style={{
            fontFamily: '"DM Sans", sans-serif', fontWeight: 300,
            fontSize: '0.65rem', letterSpacing: '0.35em', textTransform: 'uppercase',
            color: 'rgba(245,240,234,0.25)',
          }}>
            {WEDDING.initials} · {WEDDING.date}
          </p>

          <h1 style={{
            fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic',
            fontWeight: 400, fontSize: 'clamp(2.2rem, 6vw, 3.5rem)',
            color: '#F5F0EA', lineHeight: 1.1, margin: 0,
          }}>
            Wishes & Blessings
          </h1>

          <div style={{ width: '60px', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.6), transparent)' }} />

          <p style={{
            fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic',
            fontWeight: 300, fontSize: '1rem', color: 'rgba(245,240,234,0.4)',
            maxWidth: '40ch', textAlign: 'center', lineHeight: 1.6, margin: 0,
          }}>
            Leave a word of love, a prayer, or a memory for Peter & Paulinah as they begin this new chapter.
          </p>
        </motion.div>

        {/* Submit form */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          style={{
            background: 'rgba(245,240,234,0.03)',
            border: '1px solid rgba(201,169,110,0.12)',
            padding: '2rem',
            borderRadius: '2px',
            marginBottom: '3rem',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{
            position: 'absolute', top: 0, right: 0, width: '140px', height: '140px', pointerEvents: 'none',
            background: 'radial-gradient(circle at top right, rgba(200,162,200,0.08) 0%, transparent 70%)',
          }} />
          <p style={{
            fontFamily: '"DM Sans", sans-serif', fontWeight: 300,
            fontSize: '0.6rem', letterSpacing: '0.25em', textTransform: 'uppercase',
            color: 'rgba(200,162,200,0.6)', marginBottom: '1.25rem',
          }}>
            Write a Wish
          </p>
          <WishForm onSubmitted={onSubmitted} />
        </motion.div>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
          <div style={{ flex: 1, height: '1px', background: 'rgba(201,169,110,0.1)' }} />
          <Heart size={12} style={{ color: 'rgba(200,162,200,0.4)', flexShrink: 0 }} />
          <div style={{ flex: 1, height: '1px', background: 'rgba(201,169,110,0.1)' }} />
        </div>

        {/* Wishes count */}
        {!loading && wishes.length > 0 && (
          <p style={{
            fontFamily: '"DM Sans", sans-serif', fontWeight: 300,
            fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase',
            color: 'rgba(245,240,234,0.2)', marginBottom: '1.5rem', textAlign: 'center',
          }}>
            {wishes.length} {wishes.length === 1 ? 'wish' : 'wishes'} shared
          </p>
        )}

        {/* Wishes grid */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem 0' }}>
            <p style={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 300, fontSize: '0.8rem', color: 'rgba(245,240,234,0.2)' }}>
              Loading wishes…
            </p>
          </div>
        ) : wishes.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem 0' }}>
            <p style={{
              fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic',
              fontSize: '1.1rem', color: 'rgba(245,240,234,0.25)',
            }}>
              Be the first to leave a wish.
            </p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
            {wishes.map((w, i) => (
              <WishCard key={w.id || i} wish={w} index={i} />
            ))}
          </div>
        )}

        {/* Footer link back */}
        <div style={{ textAlign: 'center', marginTop: '4rem' }}>
          <a
            href="/"
            style={{
              fontFamily: '"DM Sans", sans-serif', fontWeight: 300,
              fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase',
              color: 'rgba(201,169,110,0.4)', textDecoration: 'none',
              transition: 'color 0.3s',
            }}
            onMouseEnter={e => e.target.style.color = '#C9A96E'}
            onMouseLeave={e => e.target.style.color = 'rgba(201,169,110,0.4)'}
          >
            ← Back to Wedding Site
          </a>
        </div>
      </div>
    </div>
  )
}
