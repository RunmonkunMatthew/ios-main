import { useState } from 'react'
import { motion } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { GALLERY } from '../../lib/data'

// Placeholder colours for when images haven't arrived yet
const PLACEHOLDER_GRADIENTS = [
  'radial-gradient(ellipse at 40% 60%, rgba(123,47,190,0.25) 0%, rgba(10,10,15,0.95) 70%)',
  'radial-gradient(ellipse at 60% 40%, rgba(201,169,110,0.18) 0%, rgba(10,10,15,0.95) 70%)',
  'radial-gradient(ellipse at 30% 70%, rgba(242,196,206,0.18) 0%, rgba(10,10,15,0.95) 70%)',
  'radial-gradient(ellipse at 70% 30%, rgba(123,47,190,0.2) 0%, rgba(10,10,15,0.95) 70%)',
  'radial-gradient(ellipse at 50% 50%, rgba(201,169,110,0.12) 0%, rgba(10,10,15,0.95) 70%)',
  'radial-gradient(ellipse at 20% 80%, rgba(242,196,206,0.15) 0%, rgba(10,10,15,0.95) 70%)',
]

function Lightbox({ images, index, onClose, onPrev, onNext }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: 'rgba(10,10,15,0.96)', backdropFilter: 'blur(12px)' }}
      onClick={onClose}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 text-cream/50 hover:text-cream transition-colors z-10"
        aria-label="Close"
      >
        <X size={22} />
      </button>

      {/* Prev */}
      <button
        onClick={e => { e.stopPropagation(); onPrev() }}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-cream/40 hover:text-gold transition-colors z-10 p-2"
        aria-label="Previous"
      >
        <ChevronLeft size={28} />
      </button>

      {/* Image */}
      <motion.div
        key={index}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="relative max-w-4xl max-h-[85vh] w-full mx-16"
        onClick={e => e.stopPropagation()}
      >
        {images[index].src ? (
          <img
            src={images[index].src}
            alt={images[index].alt}
            className="w-full h-full object-contain"
            style={{ maxHeight: '85vh', borderRadius: '2px' }}
          />
        ) : (
          <div
            className="w-full flex items-center justify-center"
            style={{
              height: '60vh',
              background: PLACEHOLDER_GRADIENTS[index % PLACEHOLDER_GRADIENTS.length],
              borderRadius: '2px',
            }}
          >
            <p className="font-body font-light text-cream/20 text-xs tracking-widest uppercase">
              Photo {index + 1} coming soon
            </p>
          </div>
        )}
        {/* Counter */}
        <p className="text-center font-body font-light text-cream/25 text-xs tracking-widest mt-4">
          {index + 1} / {images.length}
        </p>
      </motion.div>

      {/* Next */}
      <button
        onClick={e => { e.stopPropagation(); onNext() }}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-cream/40 hover:text-gold transition-colors z-10 p-2"
        aria-label="Next"
      >
        <ChevronRight size={28} />
      </button>
    </motion.div>
  )
}

export function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState(null)

  const open = i => setLightboxIndex(i)
  const close = () => setLightboxIndex(null)
  const prev = () => setLightboxIndex(i => (i - 1 + GALLERY.length) % GALLERY.length)
  const next = () => setLightboxIndex(i => (i + 1) % GALLERY.length)

  // Split into 3 columns for masonry
  const cols = [[], [], []]
  GALLERY.forEach((img, i) => cols[i % 3].push({ ...img, originalIndex: i }))

  return (
    <section id="gallery" className="section-pad">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-14 flex flex-col gap-3 items-end text-right"
        >
          <h2 className="section-title">Before the Day</h2>
          <div className="gold-rule w-20" />
          <p className="font-body font-light text-cream/35 text-sm" style={{ maxWidth: '42ch' }}>
            A glimpse of the couple, before the celebration begins.
          </p>
        </motion.div>

        {/* Masonry — 3 col desktop, 2 col tablet, 1 col mobile */}
        <div className="hidden md:grid grid-cols-3 gap-3">
          {cols.map((col, ci) => (
            <div key={ci} className="flex flex-col gap-3">
              {col.map((img, ri) => (
                <motion.div
                  key={img.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: ri * 0.06 }}
                  className="gallery-item"
                  style={{
                    aspectRatio: img.orientation === 'portrait' ? '4/5' : '4/3',
                    borderRadius: '2px',
                  }}
                  // onClick={() => }
                  role="button"
                  tabIndex={0}
                  // onKeyDown={e => e.key === 'Enter' && open(img.originalIndex)}
                  aria-label={`Open photo ${img.originalIndex + 1}`}
                >
                  {img.src ? (
                    <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
                  ) : (
                    <div
                      className="w-full h-full"
                      style={{ background: PLACEHOLDER_GRADIENTS[img.originalIndex % PLACEHOLDER_GRADIENTS.length] }}
                    />
                  )}
                </motion.div>
              ))}
            </div>
          ))}
        </div>

        {/* 2-col tablet */}
        <div className="hidden sm:grid md:hidden grid-cols-2 gap-3">
          {GALLERY.map((img, i) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: (i % 2) * 0.08 }}
              className="gallery-item"
              style={{ aspectRatio: img.orientation === 'portrait' ? '4/5' : '4/3', borderRadius: '2px' }}
              onClick={() => open(i)}
              role="button" tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && open(i)}
            >
              {img.src ? (
                <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full" style={{ background: PLACEHOLDER_GRADIENTS[i % PLACEHOLDER_GRADIENTS.length] }} />
              )}
            </motion.div>
          ))}
        </div>

        {/* 1-col mobile */}
        <div className="grid sm:hidden grid-cols-1 gap-3">
          {GALLERY.map((img, i) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="gallery-item"
              style={{ aspectRatio: img.orientation === 'portrait' ? '4/5' : '16/9', borderRadius: '2px' }}
              onClick={() => open(i)}
              role="button" tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && open(i)}
            >
              {img.src ? (
                <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full" style={{ background: PLACEHOLDER_GRADIENTS[i % PLACEHOLDER_GRADIENTS.length] }} />
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          images={GALLERY}
          index={lightboxIndex}
          onClose={close}
          onPrev={prev}
          onNext={next}
        />
      )}
    </section>
  )
}
