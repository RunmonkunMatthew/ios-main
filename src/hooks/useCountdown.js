import { useState, useEffect, useRef } from 'react'
import { WEDDING } from '../lib/data'

function getTimeLeft() {
  const diff = WEDDING.weddingDateTime - new Date()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    done: false,
  }
}

export function useCountdown({ powerUp = false } = {}) {
  const real = getTimeLeft()
  const [display, setDisplay] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [powered, setPowered] = useState(!powerUp)
  const powerRef = useRef(null)
  const tickRef = useRef(null)

  useEffect(() => {
    if (!powerUp) {
      setDisplay({ days: real.days, hours: real.hours, minutes: real.minutes, seconds: real.seconds })
      return
    }
    const target = getTimeLeft()
    const steps = 30
    const stepMs = 1800 / steps
    let step = 0
    powerRef.current = setInterval(() => {
      step++
      const eased = 1 - Math.pow(1 - step / steps, 3)
      setDisplay({
        days: Math.round(target.days * eased),
        hours: Math.round(target.hours * eased),
        minutes: Math.round(target.minutes * eased),
        seconds: Math.round(target.seconds * eased),
      })
      if (step >= steps) { clearInterval(powerRef.current); setPowered(true) }
    }, stepMs)
    return () => clearInterval(powerRef.current)
  }, [])

  useEffect(() => {
    if (!powered) return
    tickRef.current = setInterval(() => {
      const t = getTimeLeft()
      setDisplay({ days: t.days, hours: t.hours, minutes: t.minutes, seconds: t.seconds })
    }, 1000)
    return () => clearInterval(tickRef.current)
  }, [powered])

  return { display, real, powered }
}
