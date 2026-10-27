import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { GALLERY } from '../../lib/data'

const GRADS = [
  'radial-gradient(ellipse at 40% 60%, rgba(123,47,190,0.25) 0%, rgba(10,10,15,0.95) 70%)',
  'radial-gradient(ellipse at 60% 40%, rgba(201,169,110,0.18) 0%, rgba(10,10,15,0.95) 70%)',
  'radial-gradient(ellipse at 30% 70%, rgba(242,196,206,0.18) 0%, rgba(10,10,15,0.95) 70%)',
  'radial-gradient(ellipse at 70% 30%, rgba(200,162,200,0.2) 0%, rgba(10,10,15,0.95) 70%)',
]

function Tile({ img, index, onOpen }) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
      className="gallery-item" style={{ aspectRatio: img.orientation === 'portrait' ? '4/5' : '4/3', borderRadius: '2px' }}
      onClick={() => onOpen(index)} role="button" tabIndex={0} onKeyDown={e => e.key === 'Enter' && onOpen(index)} aria-label={`Open photo ${index + 1}`}>
      {img.src
        ? <img src={img.src} alt={img.alt} loading="lazy" />
        : <div className="w-full h-full" style={{ background: GRADS[index % GRADS.length] }} />}
    </motion.div>
  )
}

function Lightbox({ index, onClose, onPrev, onNext }) {
  const img = GALLERY[index]
  useEffect(() => {
    const fn = e => { if (e.key === 'Escape') onClose(); if (e.key === 'ArrowLeft') onPrev(); if (e.key === 'ArrowRight') onNext() }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [onClose, onPrev, onNext])
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] flex items-center justify-center"
      style={{ background: 'rgba(10,10,15,0.96)', backdropFilter: 'blur(12px)' }} onClick={onClose}>
      <button onClick={onClose} className="absolute top-5 right-5 text-cream/50 hover:text-cream z-10" aria-label="Close"><X size={22} /></button>
      <button onClick={e => { e.stopPropagation(); onPrev() }} className="absolute left-3 top-1/2 -translate-y-1/2 text-cream/40 hover:text-gold p-2 z-10" aria-label="Previous"><ChevronLeft size={28} /></button>
      <motion.div key={index} initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }} className="w-full max-w-4xl mx-14" onClick={e => e.stopPropagation()}>
        {img.src
          ? <img src={img.src} alt={img.alt} className="w-full object-contain" style={{ maxHeight: '82vh', borderRadius: '2px' }} />
          : <div className="w-full flex items-center justify-center" style={{ height: '60vh', background: GRADS[index % GRADS.length], borderRadius: '2px' }}>
              <p className="font-body font-light text-cream/20 text-xs tracking-widest uppercase">Photo {index + 1} coming soon</p>
            </div>}
        <p className="text-center font-body font-light text-cream/25 text-xs tracking-widest mt-4">{index + 1} / {GALLERY.length}</p>
      </motion.div>
      <button onClick={e => { e.stopPropagation(); onNext() }} className="absolute right-3 top-1/2 -translate-y-1/2 text-cream/40 hover:text-gold p-2 z-10" aria-label="Next"><ChevronRight size={28} /></button>
    </motion.div>
  )
}

export function Gallery() {
  const [open, setOpen] = useState(null)
  const close = () => setOpen(null)
  const prev = () => setOpen(i => (i - 1 + GALLERY.length) % GALLERY.length)
  const next = () => setOpen(i => (i + 1) % GALLERY.length)

  // One layout with CSS columns: 1 col mobile, 2 tablet, 3 desktop. Natural masonry, no duplicated markup.
  return (
    <section id="gallery" className="section-pad">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="mb-14 flex flex-col gap-3 items-end text-right">
          <h2 className="section-title">Before the Day</h2>
          <div className="gold-rule w-20" />
          <p className="font-body font-light text-cream/35 text-sm" style={{ maxWidth: '42ch' }}>A glimpse of Peter and Paulinah, before the celebration begins.</p>
        </motion.div>
        <div className="columns-1 sm:columns-2 md:columns-3 gap-3">
          {GALLERY.map((img, i) => (
            <div key={img.id} className="mb-3 break-inside-avoid"><Tile img={img} index={i} onOpen={setOpen} /></div>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {open !== null && <Lightbox index={open} onClose={close} onPrev={prev} onNext={next} />}
      </AnimatePresence>
    </section>
  )
}
