import { motion } from 'framer-motion'
import { FileText, Download } from 'lucide-react'

export function Programme() {
  return (
    <section id="programme" className="section-pad">
      <div className="max-w-2xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-card p-8 flex flex-col items-center text-center gap-4"
        >
          <FileText size={22} className="text-gold/70" />
          <h2 className="section-title">Order of Service</h2>
          <p className="font-body font-light text-cream/45 text-sm">
            Follow along with the church programme.
          </p>
          <a
            href="/church-program.pdf"
            download="ios-church-program"
            target="_blank"
            rel="noopener noreferrer"
            className="gold-btn inline-flex items-center gap-2"
            style={{ textDecoration: 'none' }}
          >
            <Download size={13} /> View / Download PDF
          </a>
        </motion.div>
      </div>
    </section>
  )
}