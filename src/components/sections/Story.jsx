import { motion } from 'framer-motion'
import { STORY } from '../../lib/data'

const PLACEHOLDER_COLORS = [
  'radial-gradient(ellipse at 40% 60%, rgba(123,47,190,0.22) 0%, rgba(10,10,15,0.95) 70%)',
  'radial-gradient(ellipse at 60% 40%, rgba(201,169,110,0.16) 0%, rgba(10,10,15,0.95) 70%)',
  'radial-gradient(ellipse at 50% 50%, rgba(242,196,206,0.16) 0%, rgba(10,10,15,0.95) 70%)',
]

function StoryCard({ chapter, index }) {
  const isEven = index % 2 === 0
  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -32 : 32 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className={`flex flex-col md:flex-row items-center gap-8 ${isEven ? '' : 'md:flex-row-reverse'}`}
    >
      <div className="w-full md:w-5/12 flex-shrink-0">
        <div className="relative overflow-hidden" style={{ aspectRatio: '4/5', borderRadius: '2px' }}>
          {chapter.image
            ? <img src={chapter.image} alt={chapter.chapter} className="w-full h-full object-cover" />
            : <div className="w-full h-full flex items-end p-6" style={{ background: PLACEHOLDER_COLORS[index] }}>
                <p className="font-body font-light text-cream/20 text-xs tracking-widest uppercase">Photo coming soon</p>
              </div>
          }
          <div className="absolute top-0 left-0 w-8 h-8 pointer-events-none" style={{ borderTop: '1px solid rgba(201,169,110,0.4)', borderLeft: '1px solid rgba(201,169,110,0.4)' }} />
          <div className="absolute bottom-0 right-0 w-8 h-8 pointer-events-none" style={{ borderBottom: '1px solid rgba(201,169,110,0.4)', borderRight: '1px solid rgba(201,169,110,0.4)' }} />
        </div>
      </div>

      <div className={`w-full md:w-7/12 flex flex-col gap-4 ${isEven ? 'md:pl-6' : 'md:pr-6'}`}>
        <div className="flex items-center gap-4">
          <span className="font-display italic font-light" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', color: 'rgba(123,47,190,0.45)', lineHeight: 1 }}>
            {chapter.year}
          </span>
          <div className="gold-rule flex-1" />
        </div>
        <h3 className="font-display italic font-light text-cream" style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', lineHeight: 1.15 }}>
          {chapter.chapter}
        </h3>
        <p className="font-body font-light text-cream/55 leading-relaxed" style={{ maxWidth: '52ch', fontSize: '0.9rem' }}>
          {chapter.text}
        </p>
      </div>
    </motion.div>
  )
}

export function Story() {
  return (
    <section id="story" className="section-pad relative">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="mb-16 flex flex-col items-start gap-3">
          <h2 className="section-title">Our Story</h2>
          <div className="gold-rule w-20" />
        </motion.div>
        <div className="flex flex-col gap-20">
          {STORY.map((chapter, i) => <StoryCard key={chapter.id} chapter={chapter} index={i} />)}
        </div>
      </div>
    </section>
  )
}
