import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Download, Loader } from 'lucide-react'
import { supabase } from '../lib/supabase'

// ─── Rose SVG motif — top-left corner ───────────────────────────────────────
function RoseMotif({ position = 'top-left', opacity = 0.18 }) {
  const transforms = {
    'top-left':     'translate(0,0) rotate(0)',
    'top-right':    'translate(320,0) rotate(90) scale(-1,1)',
    'bottom-right': 'translate(320,220) rotate(180)',
    'bottom-left':  'translate(0,220) rotate(270) scale(-1,1)',
  }
  return (
    <svg
      width="140" height="110"
      viewBox="0 0 140 110"
      style={{
        position: 'absolute',
        ...(position === 'top-left'     && { top: 0, left: 0 }),
        ...(position === 'top-right'    && { top: 0, right: 0, transform: 'scaleX(-1)' }),
        ...(position === 'bottom-left'  && { bottom: 0, left: 0, transform: 'scaleY(-1)' }),
        ...(position === 'bottom-right' && { bottom: 0, right: 0, transform: 'scale(-1,-1)' }),
        opacity,
        pointerEvents: 'none',
      }}
    >
      {/* Large rose bloom */}
      <ellipse cx="55" cy="55" rx="28" ry="26" fill="#C8A2C8" />
      <ellipse cx="55" cy="55" rx="20" ry="18" fill="#E8C8E8" />
      <ellipse cx="55" cy="55" rx="13" ry="12" fill="#C8A2C8" />
      <ellipse cx="55" cy="48" rx="18" ry="10" fill="#E8C8E8" opacity="0.7" />
      <ellipse cx="62" cy="60" rx="15" ry="9" fill="#D4A8D4" opacity="0.6" />
      <ellipse cx="48" cy="62" rx="14" ry="8" fill="#E0B8E0" opacity="0.6" />

      {/* Small rose */}
      <ellipse cx="20" cy="30" rx="14" ry="13" fill="#F2C4CE" />
      <ellipse cx="20" cy="30" rx="9" ry="9" fill="#FAD8E0" />
      <ellipse cx="20" cy="30" rx="6" ry="5" fill="#F2C4CE" />

      {/* Tiny bud */}
      <ellipse cx="90" cy="25" rx="9" ry="8" fill="#C8A2C8" opacity="0.7" />
      <ellipse cx="90" cy="25" rx="5" ry="5" fill="#E0C8E0" opacity="0.8" />

      {/* Gold leaves */}
      <ellipse cx="35" cy="75" rx="22" ry="8" fill="#C9A96E" opacity="0.5" transform="rotate(-30 35 75)" />
      <ellipse cx="80" cy="80" rx="18" ry="6" fill="#C9A96E" opacity="0.4" transform="rotate(20 80 80)" />
      <ellipse cx="10" cy="60" rx="14" ry="5" fill="#C9A96E" opacity="0.35" transform="rotate(-50 10 60)" />

      {/* Stem lines */}
      <path d="M55 83 Q50 100 40 108" stroke="#C9A96E" strokeWidth="1.5" fill="none" opacity="0.4" />
      <path d="M20 43 Q15 60 10 75" stroke="#C9A96E" strokeWidth="1" fill="none" opacity="0.3" />
    </svg>
  )
}

// ─── Animated gold border shimmer ────────────────────────────────────────────
function GoldBorder() {
  return (
    <div style={{
      position: 'absolute', inset: 0, borderRadius: '4px', pointerEvents: 'none', zIndex: 2,
    }}>
      {/* Outer border */}
      <div style={{
        position: 'absolute', inset: '10px', border: '1.5px solid rgba(201,169,110,0.7)',
        borderRadius: '3px',
      }} />
      {/* Inner border */}
      <div style={{
        position: 'absolute', inset: '14px', border: '0.5px solid rgba(201,169,110,0.35)',
        borderRadius: '2px',
      }} />
      {/* Corner ornaments */}
      {[
        { top: '7px', left: '7px' },
        { top: '7px', right: '7px' },
        { bottom: '7px', left: '7px' },
        { bottom: '7px', right: '7px' },
      ].map((style, i) => (
        <div key={i} style={{
          position: 'absolute', width: '16px', height: '16px',
          borderTop: i < 2 ? '2px solid #C9A96E' : 'none',
          borderBottom: i >= 2 ? '2px solid #C9A96E' : 'none',
          borderLeft: i % 2 === 0 ? '2px solid #C9A96E' : 'none',
          borderRight: i % 2 === 1 ? '2px solid #C9A96E' : 'none',
          ...style,
        }} />
      ))}
    </div>
  )
}

// ─── The actual invite card ───────────────────────────────────────────────────
function InviteCard({ guestName, cardRef }) {
  return (
    <div
      ref={cardRef}
      style={{
        width: '380px',
        minHeight: '580px',
        position: 'relative',
        background: 'linear-gradient(160deg, #FDF6EE 0%, #FAF0F4 40%, #F8EEF8 70%, #FDF6EE 100%)',
        borderRadius: '4px',
        overflow: 'hidden',
        boxShadow: '0 32px 80px rgba(10,10,15,0.6), 0 0 0 1px rgba(201,169,110,0.2)',
        padding: '28px 32px 36px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0',
        fontFamily: '"Cormorant Garamond", serif',
      }}
    >
      {/* Rose motifs in all four corners */}
      <RoseMotif position="top-left" opacity={0.22} />
      <RoseMotif position="top-right" opacity={0.18} />
      <RoseMotif position="bottom-left" opacity={0.18} />
      <RoseMotif position="bottom-right" opacity={0.22} />

      {/* Gold border system */}
      <GoldBorder />

      {/* Card content — above motifs */}
      <div style={{ position: 'relative', zIndex: 3, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0' }}>

        {/* IOS monogram */}
        <div style={{ marginTop: '8px', marginBottom: '6px' }}>
          <p style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: '2rem',
            letterSpacing: '0.18em',
            color: '#C9A96E',
            lineHeight: 1,
            margin: 0,
          }}>IOS</p>
        </div>

        {/* Thin gold rule */}
        <div style={{ width: '60px', height: '1px', background: 'linear-gradient(90deg, transparent, #C9A96E, transparent)', marginBottom: '10px' }} />

        {/* The families of */}
        <p style={{ fontSize: '0.65rem', letterSpacing: '0.12em', color: '#9B7B9B', margin: '0 0 6px', fontStyle: 'italic', fontWeight: 400 }}>
          The Families of
        </p>

        <p style={{ fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.04em', color: '#4A3040', textAlign: 'center', lineHeight: 1.5, margin: '0 0 2px', fontStyle: 'normal', fontFamily: '"DM Sans", sans-serif' }}>
          Elder Michael Olatunde &<br />
          Deaconess Funmilayo Lydia Obadare
        </p>

        <p style={{ fontSize: '0.6rem', color: '#9B7B9B', margin: '4px 0', fontStyle: 'italic' }}>&</p>

        <p style={{ fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.04em', color: '#4A3040', textAlign: 'center', lineHeight: 1.5, margin: '0 0 8px', fontStyle: 'normal', fontFamily: '"DM Sans", sans-serif' }}>
          Mr Simeon Adewole &<br />
          Mrs Grace Omolola Adedokun
        </p>

        {/* Gold rule */}
        <div style={{ width: '40px', height: '1px', background: 'linear-gradient(90deg, transparent, #C9A96E, transparent)', marginBottom: '10px' }} />

        {/* Cordially invite */}
        <p style={{ fontSize: '0.65rem', fontStyle: 'italic', color: '#7A5A7A', textAlign: 'center', lineHeight: 1.6, margin: '0 0 2px' }}>
          respectfully request the pleasure of your<br />presence at the
        </p>

        {/* Guest name — personalised */}
        {guestName && (
          <p style={{
            fontSize: '0.8rem',
            fontStyle: 'italic',
            fontWeight: 500,
            color: '#7B2FBE',
            textAlign: 'center',
            margin: '4px 0 8px',
            letterSpacing: '0.02em',
          }}>
            — {guestName} —
          </p>
        )}

        {/* Wedding Ceremony — hero text */}
        <div style={{ margin: '4px 0 6px', textAlign: 'center' }}>
          <p style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontStyle: 'italic',
            fontWeight: 600,
            fontSize: '1.9rem',
            lineHeight: 1.05,
            color: '#C9A96E',
            letterSpacing: '-0.01em',
            margin: 0,
            textShadow: '0 1px 8px rgba(201,169,110,0.2)',
          }}>
            Wedding<br />Ceremony
          </p>
        </div>

        <p style={{ fontSize: '0.55rem', letterSpacing: '0.2em', color: '#9B7B9B', margin: '0 0 10px', fontStyle: 'normal', fontFamily: '"DM Sans", sans-serif', textTransform: 'uppercase' }}>
          of their children
        </p>

        {/* Couple names */}
        <p style={{
          fontFamily: '"Cormorant Garamond", serif',
          fontStyle: 'italic',
          fontWeight: 500,
          fontSize: '1.35rem',
          color: '#2A1A3A',
          letterSpacing: '0.01em',
          margin: '0 0 2px',
          textAlign: 'center',
          lineHeight: 1.2,
        }}>
          Paulinah Adetoyinbo
        </p>

        {/* Rings ornament */}
        <p style={{ fontSize: '1rem', margin: '2px 0', color: '#C9A96E', lineHeight: 1 }}>⚭</p>

        <p style={{
          fontFamily: '"Cormorant Garamond", serif',
          fontStyle: 'italic',
          fontWeight: 500,
          fontSize: '1.35rem',
          color: '#2A1A3A',
          letterSpacing: '0.01em',
          margin: '2px 0 12px',
          textAlign: 'center',
          lineHeight: 1.2,
        }}>
          Peter Iyanuoluwa
        </p>

        {/* Gold rule */}
        <div style={{ width: '80px', height: '1px', background: 'linear-gradient(90deg, transparent, #C9A96E, transparent)', marginBottom: '12px' }} />

        {/* Church details */}
        <div style={{ textAlign: 'center', marginBottom: '8px' }}>
          <p style={{ fontSize: '0.55rem', letterSpacing: '0.18em', color: '#C9A96E', margin: '0 0 2px', fontFamily: '"DM Sans", sans-serif', textTransform: 'uppercase' }}>
            Church Wedding · 9AM
          </p>
          <p style={{ fontSize: '0.68rem', fontWeight: 600, color: '#2A1A3A', margin: '0 0 1px', fontStyle: 'normal', fontFamily: '"DM Sans", sans-serif' }}>
            Zion Baptist Church
          </p>
          <p style={{ fontSize: '0.6rem', fontStyle: 'italic', color: '#7A5A7A', margin: 0, lineHeight: 1.4 }}>
            2nd Power Line Oju Ore, Ota, Ogun State
          </p>
        </div>

        <p style={{ fontSize: '0.58rem', fontStyle: 'italic', color: '#9B7B9B', margin: '0 0 6px', textAlign: 'center' }}>
          Engagement & Reception to follow immediately
        </p>

        {/* Reception */}
        <div style={{ textAlign: 'center', marginBottom: '12px' }}>
          <p style={{ fontSize: '0.55rem', letterSpacing: '0.18em', color: '#C9A96E', margin: '0 0 2px', fontFamily: '"DM Sans", sans-serif', textTransform: 'uppercase' }}>
            Reception
          </p>
          <p style={{ fontSize: '0.68rem', fontWeight: 600, color: '#2A1A3A', margin: '0 0 1px', fontStyle: 'normal', fontFamily: '"DM Sans", sans-serif' }}>
            Manvic Event Center
          </p>
          <p style={{ fontSize: '0.6rem', fontStyle: 'italic', color: '#7A5A7A', margin: 0, lineHeight: 1.4 }}>
            Ajisafe Power Line, Sango Ota, Ogun State
          </p>
        </div>

        {/* Gold rule */}
        <div style={{ width: '80px', height: '1px', background: 'linear-gradient(90deg, transparent, #C9A96E, transparent)', marginBottom: '10px' }} />

        {/* Date — hero */}
        <p style={{
          fontFamily: '"Cormorant Garamond", serif',
          fontStyle: 'italic',
          fontWeight: 600,
          fontSize: '1.5rem',
          color: '#C9A96E',
          letterSpacing: '0.03em',
          margin: '0 0 10px',
          textAlign: 'center',
        }}>
          29th October, 2026
        </p>

        {/* Dress code */}
        <div style={{ textAlign: 'center', marginBottom: '8px' }}>
          <p style={{ fontSize: '0.55rem', letterSpacing: '0.18em', color: '#9B7B9B', margin: '0 0 3px', fontFamily: '"DM Sans", sans-serif', textTransform: 'uppercase' }}>
            Dress Code
          </p>
          <p style={{ fontSize: '0.68rem', fontStyle: 'italic', color: '#7A5A7A', margin: 0 }}>
            Lilac · Blush Pink
          </p>
        </div>

        {/* Bottom gold rule */}
        <div style={{ width: '60px', height: '1px', background: 'linear-gradient(90deg, transparent, #C9A96E, transparent)', marginTop: '8px', marginBottom: '6px' }} />

        {/* Site URL */}
        <p style={{ fontSize: '0.5rem', color: '#C9A96E', letterSpacing: '0.12em', opacity: 0.6, fontFamily: '"DM Sans", sans-serif' }}>
          ios2026
        </p>
      </div>
    </div>
  )
}

// ─── Main Invite Page ─────────────────────────────────────────────────────────
export function InvitePage() {
  const [guest, setGuest] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [downloading, setDownloading] = useState(false)
  const cardRef = useRef(null)

  // Get token from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const token = params.get('token')

    if (!token) {
      // No token — show generic invite (for sharing the page link)
      setGuest({ full_name: null })
      setLoading(false)
      return
    }

    supabase
      .rpc('get_invite_name', { invite_token: token })
      .then(({ data, error }) => {
        setGuest({ full_name: !error && data ? data : null })
        setLoading(false)
      })
  }, [])

  async function handleDownload() {
    if (!cardRef.current) return
    setDownloading(true)

    try {
      // Dynamically import html2canvas so it doesn't bloat initial load
      const html2canvas = (await import('html2canvas')).default
      const canvas = await html2canvas(cardRef.current, {
        scale: 3, // 3x for high resolution
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        logging: false,
      })

      // Trigger download
      const link = document.createElement('a')
      link.download = `Peter-Paulinah-Wedding-Invite${guest?.full_name ? `-${guest.full_name.split(' ')[0]}` : ''}.png`
      link.href = canvas.toDataURL('image/png', 1.0)
      link.click()
    } catch (err) {
      console.error('Download failed:', err)
    } finally {
      setDownloading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#0A0A0F' }}>
        <Loader size={20} className="text-gold animate-spin" />
      </div>
    )
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-12"
      style={{
        background: `
          radial-gradient(ellipse at 30% 20%, rgba(200,162,200,0.12) 0%, transparent 55%),
          radial-gradient(ellipse at 70% 80%, rgba(242,196,206,0.1) 0%, transparent 55%),
          radial-gradient(ellipse at 50% 50%, rgba(26,10,46,0.8) 0%, #0A0A0F 70%)
        `,
      }}
    >
      {/* Floating particles behind card */}
      <FloatingPetals />

      <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>

        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          style={{
            fontFamily: '"DM Sans", sans-serif',
            fontWeight: 300,
            fontSize: '0.65rem',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            color: 'rgba(245,240,234,0.3)',
          }}
        >
          Your Personal Invitation
        </motion.p>

        {/* Card — the main event */}
        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: 'relative' }}
        >
          {/* Ambient glow behind card */}
          <div style={{
            position: 'absolute',
            inset: '-40px',
            background: 'radial-gradient(ellipse at center, rgba(200,162,200,0.15) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          <InviteCard
            guestName={guest?.full_name || null}
            cardRef={cardRef}
          />
        </motion.div>

        {/* Download button */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}
        >
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="gold-btn flex items-center gap-2"
            style={{ minWidth: '220px', justifyContent: 'center' }}
          >
            {downloading
              ? <><Loader size={13} className="animate-spin" /> Preparing…</>
              : <><Download size={13} /> Save My Invitation</>
            }
          </button>
          <p style={{
            fontFamily: '"DM Sans", sans-serif',
            fontWeight: 300,
            fontSize: '0.65rem',
            color: 'rgba(245,240,234,0.2)',
            letterSpacing: '0.08em',
          }}>
            Saves as a high-quality image to your device
          </p>
        </motion.div>

        {/* View full site link */}
        <motion.a
          href="/"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          style={{
            fontFamily: '"DM Sans", sans-serif',
            fontWeight: 300,
            fontSize: '0.65rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(201,169,110,0.5)',
            textDecoration: 'none',
            transition: 'color 0.3s',
          }}
          onMouseEnter={e => e.target.style.color = '#C9A96E'}
          onMouseLeave={e => e.target.style.color = 'rgba(201,169,110,0.5)'}
        >
          View Full Wedding Details →
        </motion.a>
      </div>
    </div>
  )
}

// ─── Floating petals canvas ───────────────────────────────────────────────────
function FloatingPetals() {
  const canvasRef = useRef(null)
  const rafRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    resize()
    window.addEventListener('resize', resize)

    const colors = ['rgba(200,162,200,', 'rgba(242,196,206,', 'rgba(201,169,110,']
    const petals = Array.from({ length: 28 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: 1 + Math.random() * 2,
      opacity: 0.05 + Math.random() * 0.2,
      speedX: -0.08 + Math.random() * 0.16,
      speedY: -0.12 + Math.random() * -0.06,
      color: colors[Math.floor(Math.random() * colors.length)],
      phase: Math.random() * Math.PI * 2,
      phaseSpeed: 0.003 + Math.random() * 0.008,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      petals.forEach(p => {
        p.phase += p.phaseSpeed
        const op = p.opacity * (0.7 + 0.3 * Math.sin(p.phase))
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `${p.color}${op.toFixed(2)})`
        ctx.fill()
        p.x += p.speedX; p.y += p.speedY
        if (p.y < -4) p.y = canvas.height + 4
        if (p.x < -4) p.x = canvas.width + 4
        if (p.x > canvas.width + 4) p.x = -4
      })
      rafRef.current = requestAnimationFrame(draw)
    }
    draw()

    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(rafRef.current) }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 1 }}
      aria-hidden="true"
    />
  )
}
