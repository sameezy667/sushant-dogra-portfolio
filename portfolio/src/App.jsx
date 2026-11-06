/**
 * @file App.jsx
 * @description Root application component — wires layout, ambient ASCII background, smooth scroll and reveals
 * @module app
 */
import Nav from './components/Nav';
import AsciiBackground from './components/AsciiBackground';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import About from './components/About';
import Experience from './components/Experience';
import Work from './components/Work';
import Craft from './components/Craft';
import Footer from './components/Footer';
import { useLenis } from './hooks/useLenis';
import { useScrollReveal } from './hooks/useScrollReveal';

export default function App() {
  useLenis();
  useScrollReveal();

  return (
    <div className="bg-paper text-ink antialiased min-h-screen relative">
      {/* Paper grain */}
      <div id="grain" aria-hidden="true" />

      {/* Persistent ASCII Silicon Field background (shifts and transforms on scroll) */}
      <AsciiBackground />

      <Nav />
      <Hero />
      <main id="app" className="relative z-10">
        <Marquee />
        <About />
        <Experience />
        <Work />
        <Craft />
      </main>
      <Footer />
    </div>
  );
}
