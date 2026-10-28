import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Particles } from './components/ui/Particles'
import { Nav } from './components/ui/Nav'
import { Hero } from './components/sections/Hero'
import { Story } from './components/sections/Story'
import { MeetTheCouple } from './components/sections/MeetTheCouple'
import { EventDetails } from './components/sections/EventDetails'
import { WeddingParty } from './components/sections/WeddingParty'
import { Gallery } from './components/sections/Gallery'
import { GiftsAndAccount } from './components/sections/GiftsAndAccount'
import { RSVP } from './components/sections/RSVP'
import { FindUs, Footer } from './components/sections/FindUsAndFooter'
import { InvitePage } from './pages/Invite'
import { WishesPage } from './pages/Wishes'
import { Programme } from './components/sections/programme'

function Divider() {
  return (
    <div className="flex items-center justify-center px-6 py-2">
      <div className="gold-rule flex-1 max-w-xs" />
      <div className="mx-4 w-1 h-1 rounded-full flex-shrink-0"
        style={{ background: '#7B2FBE', boxShadow: '0 0 6px rgba(123,47,190,0.6)' }} />
      <div className="gold-rule flex-1 max-w-xs" />
    </div>
  )
}

function MainSite() {
  return (
    <div
      className="relative min-h-screen w-full overflow-x-hidden"
      style={{ background: 'radial-gradient(ellipse at 50% 0%, #13091e 0%, #0A0A0F 50%)' }}
    >
      <Particles />
      <div aria-hidden="true" style={{
        position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at 50% 50%, transparent 50%, rgba(10,10,15,0.6) 100%)',
      }} />
      <Nav />
      <main className="relative z-10">
        <Hero />
        <Programme />
        <Divider />
        <Story />
        <Divider />
        <MeetTheCouple />
        <Divider />
        <EventDetails />
        <Divider />
        <WeddingParty />
        <Divider />
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

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainSite />} />
        <Route path="/invite" element={<InvitePage />} />
        <Route path="/wishes" element={<WishesPage />} />
      </Routes>
    </BrowserRouter>
  )
}
