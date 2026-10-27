import { useEffect, useRef } from 'react'
const COUNT = 45
function rand(a, b) { return a + Math.random() * (b - a) }
function mkParticle(canvas) {
  const colors = ['rgba(201,169,110,', 'rgba(123,47,190,', 'rgba(242,196,206,']
  return { x: rand(0, canvas.width), y: rand(0, canvas.height), size: rand(0.5, 1.8), opacity: rand(0.06, 0.28), speedX: rand(-0.1, 0.1), speedY: rand(-0.16, -0.05), color: colors[Math.floor(Math.random() * colors.length)], phase: rand(0, Math.PI * 2), phaseSpeed: rand(0.003, 0.01) }
}
export function Particles() {
  const canvasRef = useRef(null), rafRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return
    const ctx = canvas.getContext('2d')
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    resize(); window.addEventListener('resize', resize)
    const particles = Array.from({ length: COUNT }, () => mkParticle(canvas))
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => {
        p.phase += p.phaseSpeed
        const op = p.opacity * (0.7 + 0.3 * Math.sin(p.phase))
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `${p.color}${op.toFixed(2)})`; ctx.fill()
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
  return <canvas ref={canvasRef} className="particle-canvas" aria-hidden="true" />
}
