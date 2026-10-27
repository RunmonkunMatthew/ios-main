import { useState } from 'react'
import { motion } from 'framer-motion'
import { Copy, Check, ExternalLink } from 'lucide-react'
import { GIFTS, ACCOUNT } from '../../lib/data'

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false)
  async function copy() {
    try { await navigator.clipboard.writeText(text) } catch { return }
    setCopied(true); setTimeout(() => setCopied(false), 2000)
  }
  return <button onClick={copy} className="copy-btn">{copied ? <Check size={11} /> : <Copy size={11} />}{copied ? 'Copied' : 'Copy'}</button>
}

export function GiftsAndAccount() {
  return (
    <section id="gifts" className="section-pad">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="mb-14 flex flex-col gap-3">
          <h2 className="section-title">Gifts & Wishes</h2>
          <div className="gold-rule w-20" />
          <p className="font-body font-light text-cream/35 text-sm mt-1" style={{ maxWidth: '50ch' }}>Your presence is our greatest gift. If you wish to bless us further, here are a few things close to our hearts.</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          <div>
            <p className="font-body font-light text-lilac/70 text-xs tracking-widest uppercase mb-4">Gift Registry</p>
            {GIFTS.map((g, i) => (
              <motion.div key={g.id} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.05 }}
                className="flex items-start justify-between gap-4 py-4" style={{ borderBottom: '1px solid rgba(245,240,234,0.05)' }}>
                <div className="flex flex-col gap-0.5">
                  <p className="font-body font-light text-cream/75 text-sm">{g.item}</p>
                  {g.note && <p className="font-body font-light text-cream/30 text-xs italic">{g.note}</p>}
                </div>
                {g.link && <a href={g.link} target="_blank" rel="noopener noreferrer" className="text-gold/50 hover:text-gold" aria-label={`View ${g.item}`}><ExternalLink size={13} /></a>}
              </motion.div>
            ))}
          </div>
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1 }}>
            <p className="font-body font-light text-lilac/70 text-xs tracking-widest uppercase mb-4">Bank Transfer</p>
            <div className="glass-card p-7 flex flex-col gap-5 relative overflow-hidden">
              <div aria-hidden="true" className="absolute bottom-0 right-0 w-40 h-40 pointer-events-none" style={{ background: 'radial-gradient(circle at bottom right, rgba(123,47,190,0.1) 0%, transparent 70%)' }} />
              <div className="flex flex-col gap-4">
                <div><p className="font-body font-light text-cream/30 text-xs tracking-widest uppercase">Bank</p><p className="font-body font-light text-cream/75 text-sm">{ACCOUNT.bankName}</p></div>
                <div className="gold-rule-solid" />
                <div><p className="font-body font-light text-cream/30 text-xs tracking-widest uppercase">Account Name</p><p className="font-body font-light text-cream/75 text-sm">{ACCOUNT.accountName}</p></div>
                <div className="gold-rule-solid" />
                <div className="flex items-center justify-between">
                  <div><p className="font-body font-light text-cream/30 text-xs tracking-widest uppercase">Account Number</p>
                    <p className="font-display italic text-gold font-light" style={{ fontSize: '1.5rem', letterSpacing: '0.05em' }}>{ACCOUNT.accountNumber}</p></div>
                  <CopyButton text={ACCOUNT.accountNumber} />
                </div>
              </div>
              <p className="font-body font-light text-cream/25 text-xs leading-relaxed italic border-t border-gold/10 pt-4">{ACCOUNT.note}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
