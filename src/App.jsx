import { Particles } from './components/ui/Particles'
import { Nav } from './components/ui/Nav'
import { Hero } from './components/sections/Hero'
import { Story } from './components/sections/Story'
import { MeetTheCouple } from './components/sections/MeetTheCouple'
import { EventDetails, Schedule } from './components/sections/EventDetails'
import { WeddingParty } from './components/sections/WeddingParty'
import { Gallery } from './components/sections/Gallery'
import { GiftsAndAccount } from './components/sections/GiftsAndAccount'
import { RSVP } from './components/sections/RSVP'
import { FindUs, Footer } from './components/sections/FindUsAndFooter'

// Section divider — subtle gold rule with purple centre dot
function Divider() {
  return (
    <div className="flex items-center justify-center px-6 py-2">
      <div className="gold-rule flex-1 max-w-xs" />
      <div
        className="mx-4 w-1 h-1 rounded-full flex-shrink-0"
        style={{ background: '#7B2FBE', boxShadow: '0 0 6px rgba(123,47,190,0.6)' }}
      />
      <div className="gold-rule flex-1 max-w-xs" />
    </div>
  )
}

export default function App() {
  return (
    <div
      className="relative min-h-screen w-full overflow-x-hidden"
      style={{ background: 'radial-gradient(ellipse at 50% 0%, #13091e 0%, #0A0A0F 50%)' }}
    >
      <Particles />

      {/* Vignette overlay */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none',
          background: 'radial-gradient(ellipse at 50% 50%, transparent 50%, rgba(10,10,15,0.6) 100%)',
        }}
      />

      <Nav />

      <main className="relative z-10">
        <Hero />
        <Divider />
        <Story />
        <Divider />
        <MeetTheCouple />
        <Divider />
        <EventDetails />
        {/* <Schedule /> */}
        <Divider />
        <Divider />
        <WeddingParty />
        <Gallery />
        <Divider />
        <GiftsAndAccount />
        <Divider />
        <RSVP />
        <Divider />
        <FindUs />
      </main>

      <Footer />
    </div>
  )
}
