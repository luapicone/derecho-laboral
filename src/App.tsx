import { useEffect, useMemo, useState } from 'react'
import type { MouseEvent } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight, BadgeDollarSign, Circle, Mail, MapPin, MessageCircleMore } from 'lucide-react'
import { useInViewAnimation } from './hooks/useInViewAnimation'

type ButtonProps = {
  children: string
  href?: string
  variant?: 'primary' | 'secondary' | 'tertiary'
}

type TrailCard = {
  id: number
  x: number
  y: number
  image: string
}

const marqueeImages = [
  'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1502005097973-6a7082348e28?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80',
]

const testimonials = [
  { quote: 'Sarah turned our launch into a cinematic system. Every screen felt inevitable and every motion earned.', name: 'Mina Cho', role: 'Founder, Aster Labs', image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300' },
  { quote: 'We stopped explaining the product after V Vortex rebuilt the story. The site started doing the selling.', name: 'Noah Wright', role: 'CEO, Driftline', image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300' },
  { quote: 'Former Apple precision, startup speed, luxury restraint. The rare designer who understands all three.', name: 'Leila Mensah', role: 'CMO, South Atlas', image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=300' },
  { quote: 'Every review ended with let’s ship it. Sarah removed the noise from the room.', name: 'Julian Park', role: 'Product Lead, Merrow', image: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=300' },
  { quote: 'She designs for conviction. The site gave our team language, rhythm, and a reason to raise the bar.', name: 'Ava Solano', role: 'Brand Director, North Signal', image: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=300' },
]

const projectCards = [
  { title: 'Northline OS', label: 'Launch System', image: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80', copy: 'A founder-facing launch experience for an AI platform rolling into Series B.' },
  { title: 'Luma Home', label: 'Interior Commerce', image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80', copy: 'A tactile commerce story designed to feel warm, architectural, and impossible to confuse with SaaS.' },
  { title: 'Sora Health', label: 'Narrative Refresh', image: 'https://images.unsplash.com/photo-1502005097973-6a7082348e28?auto=format&fit=crop&w=1200&q=80', copy: 'Editorial product storytelling for a company moving from tool to category signal.' },
]

const partnerTrailImages = [
  'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=500&q=80',
  'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=500&q=80',
  'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=500&q=80',
  'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=500&q=80',
]

function ActionButton({ children, href, variant = 'primary' }: ButtonProps) {
  const base = 'inline-flex items-center justify-center whitespace-nowrap rounded-full px-7 py-3 text-sm font-medium transition-colors'
  const styles = {
    primary: 'bg-[#051A24] text-white shadow-[0_8px_20px_rgba(5,26,36,0.12),0_16px_46px_rgba(5,26,36,0.18),inset_0_1px_0_rgba(255,255,255,0.18)] hover:bg-[#0D212C]',
    secondary: 'bg-white text-[#051A24] shadow-[0_10px_30px_rgba(5,26,36,0.08),inset_0_1px_0_rgba(255,255,255,0.7)] hover:bg-[#F6FCFF]',
    tertiary: 'bg-white text-[#051A24] shadow-[0_10px_30px_rgba(5,26,36,0.08),inset_0_0_0_1px_rgba(5,26,36,0.12),inset_0_10px_18px_rgba(224,235,240,0.45)] hover:bg-[#F6FCFF]',
  }
  const className = `${base} ${styles[variant]}`
  return href ? <a className={className} href={href}>{children}</a> : <button className={className}>{children}</button>
}

function InViewBlock({ children, delay = '0s', innerClassName = '' }: { children: React.ReactNode; delay?: string; innerClassName?: string }) {
  const { ref, isInView } = useInViewAnimation<HTMLDivElement>()
  return <div ref={ref} className={`animate-fade-in-up ${isInView ? 'is-visible' : ''} ${innerClassName}`.trim()} style={{ animationDelay: delay }}>{children}</div>
}

export default function App() {
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [trailCards, setTrailCards] = useState<TrailCard[]>([])

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveTestimonial((current) => (current + 1) % testimonials.length)
    }, 3000)
    return () => window.clearInterval(timer)
  }, [])

  const marquee = useMemo(() => [...marqueeImages, ...marqueeImages], [])

  const spawnTrailCard = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const image = partnerTrailImages[Math.floor(Math.random() * partnerTrailImages.length)]
    const id = window.performance.now()
    setTrailCards((current) => [...current, { id, x: event.clientX - rect.left - 72, y: event.clientY - rect.top - 56, image }])
    window.setTimeout(() => setTrailCards((current) => current.filter((card) => card.id !== id)), 900)
  }

  return (
    <div className="text-[#051A24]">
      <main className="overflow-hidden pb-28">
        <section className="mx-auto flex max-w-[440px] flex-col items-center px-6 pt-12 text-center md:pt-16">
          <InViewBlock>
            <p className="text-[32px] font-semibold tracking-[-0.04em] text-[#051A24] md:text-[40px] lg:text-[44px]" style={{ fontFamily: "'PP Mondwest', serif" }}>V Vortex</p>
            <p className="mt-4 font-mono text-xs uppercase tracking-[0.28em] text-[#051A24] md:text-sm">The creative studio of Sarah Vortex</p>
          </InViewBlock>
          <InViewBlock delay="0.1s">
            <h1 className="mt-8 text-[3.25rem] font-medium leading-[0.94] tracking-[-0.06em] text-[#051A24] md:text-[4.7rem]">Build the <span style={{ fontFamily: "'PP Mondwest', serif" }}>next wave</span>, the <span style={{ fontFamily: "'PP Mondwest', serif" }}>bold way.</span></h1>
          </InViewBlock>
          <InViewBlock delay="0.2s" innerClassName="space-y-4">
            <p className="mt-8 text-base leading-7 text-[#273C46]">Sarah Vortex spent years designing inside Apple before building a creative studio for founders who want more than another polished template.</p>
            <p className="text-base leading-7 text-[#273C46]">V Vortex shapes product stories, launch systems, and portfolio experiences with editorial restraint, motion confidence, and ruthless clarity.</p>
            <p className="text-base leading-7 text-[#273C46]">Engagements begin at <span className="font-medium text-[#051A24]">$25,000/month</span> for teams who move fast, expect taste, and want every touchpoint to feel deliberate.</p>
          </InViewBlock>
          <InViewBlock delay="0.3s" innerClassName="mt-8 flex flex-wrap items-center justify-center gap-3">
            <ActionButton href="#partner">Start a chat</ActionButton>
            <ActionButton href="#projects" variant="secondary">View projects</ActionButton>
          </InViewBlock>
        </section>

        <section className="mb-16 mt-16 md:mb-20 md:mt-20">
          <div className="w-full overflow-hidden">
            <div className="marquee-track flex w-max">
              {marquee.map((image, index) => (
                <img key={`${index}-${image}`} src={image} alt="Motion preview" className="mx-3 h-[280px] w-[220px] rounded-2xl object-cover shadow-lg md:h-[500px] md:w-[360px]" />
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-2xl px-6 text-center">
          <InViewBlock>
            <p className="text-4xl leading-tight tracking-[-0.05em] text-[#051A24] md:text-6xl">“I learned at <span style={{ fontFamily: "'PP Mondwest', serif" }}>Apple</span> that taste means deciding what stays silent, not just what gets louder.”</p>
            <p className="mt-6 text-lg italic text-[#273C46]">Sarah Vortex</p>
            <div className="mt-6 flex items-center justify-center gap-5 text-sm uppercase tracking-[0.26em] text-[#273C46]">
              <span>Apple</span><span>Figma</span><span>Stripe</span>
            </div>
          </InViewBlock>
          <InViewBlock delay="0.2s" innerClassName="relative mt-12 overflow-hidden rounded-[28px]">
            <img src="https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1200&q=80" alt="Studio mood" className="h-[420px] w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#051A24]/65 via-transparent to-transparent" />
          </InViewBlock>
        </section>

        <section className="mx-auto mt-24 max-w-7xl px-6">
          <div className="grid gap-6 md:justify-items-end lg:grid-cols-2">
            {[
              { title: 'Monthly Partnership', price: '$25,000', theme: 'dark', copy: 'For founders who need a creative partner embedded into weekly momentum, launches, and decision-making.', bullets: ['Weekly strategy sprints', 'Creative direction + execution', 'Async founder support'] },
              { title: 'Custom Project', price: '$25,000', theme: 'light', copy: 'For a focused build: launch site, portfolio experience, narrative refresh, or flagship campaign.', bullets: ['Defined scope and milestones', 'Prototype to polished delivery', 'Developer handoff included'] },
            ].map((card, index) => {
              const isDark = card.theme === 'dark'
              return (
                <InViewBlock key={card.title} delay={`${0.1 + index * 0.1}s`} innerClassName={`w-full max-w-xl rounded-[32px] p-8 shadow-[0_28px_80px_rgba(5,26,36,0.09)] ${isDark ? 'bg-[#051A24] text-[#F6FCFF]' : 'bg-white text-[#051A24]'}`}>
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <p className={`text-sm uppercase tracking-[0.22em] ${isDark ? 'text-[#E0EBF0]' : 'text-[#273C46]'}`}>{card.title}</p>
                      <p className="mt-4 text-5xl tracking-[-0.06em]">{card.price}</p>
                    </div>
                    <BadgeDollarSign className={isDark ? 'text-[#F6FCFF]' : 'text-[#051A24]'} />
                  </div>
                  <p className={`mt-6 max-w-lg text-base leading-7 ${isDark ? 'text-[#E0EBF0]' : 'text-[#273C46]'}`}>{card.copy}</p>
                  <div className="mt-8 space-y-3">
                    {card.bullets.map((bullet) => (
                      <div className="flex items-center gap-3" key={bullet}><Circle className="h-2.5 w-2.5 fill-current stroke-none" /><span>{bullet}</span></div>
                    ))}
                  </div>
                </InViewBlock>
              )
            })}
          </div>
        </section>

        <section className="mx-auto mt-24 max-w-7xl px-6">
          <InViewBlock>
            <div className="overflow-hidden rounded-[32px] bg-[#0D212C] p-5 text-[#F6FCFF] shadow-[0_28px_80px_rgba(5,26,36,0.12)]">
              <div className="flex transition-transform duration-700 ease-out" style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}>
                {testimonials.map((testimonial) => (
                  <article className="min-w-full p-6 md:p-10" key={testimonial.name}>
                    <div className="flex h-full flex-col justify-between gap-8 md:flex-row md:items-end">
                      <div className="max-w-3xl">
                        <p className="text-2xl leading-tight tracking-[-0.04em] md:text-4xl">{testimonial.quote}</p>
                        <div className="mt-8">
                          <p className="text-lg">{testimonial.name}</p>
                          <p className="mt-1 text-sm uppercase tracking-[0.22em] text-[#E0EBF0]">{testimonial.role}</p>
                        </div>
                      </div>
                      <img alt={testimonial.name} className="h-20 w-20 rounded-full object-cover shadow-lg" src={testimonial.image} />
                    </div>
                  </article>
                ))}
              </div>
            </div>
            <div className="mt-6 flex items-center justify-center gap-3">
              <button aria-label="Previous testimonial" className="rounded-full bg-white p-3 text-[#051A24] shadow-[0_12px_32px_rgba(5,26,36,0.08)] transition-colors hover:bg-[#F6FCFF]" onClick={() => setActiveTestimonial((activeTestimonial + testimonials.length - 1) % testimonials.length)}><ArrowLeft className="h-5 w-5" /></button>
              <button aria-label="Next testimonial" className="rounded-full bg-[#051A24] p-3 text-white shadow-[0_12px_32px_rgba(5,26,36,0.15)] transition-colors hover:bg-[#0D212C]" onClick={() => setActiveTestimonial((activeTestimonial + 1) % testimonials.length)}><ArrowRight className="h-5 w-5" /></button>
            </div>
          </InViewBlock>
        </section>

        <section className="mx-auto mt-24 max-w-[1200px] px-6" id="projects">
          <InViewBlock>
            <div className="max-w-2xl">
              <p className="text-sm uppercase tracking-[0.24em] text-[#273C46]">Selected projects</p>
              <h2 className="mt-4 text-5xl leading-none tracking-[-0.05em] text-[#051A24] md:text-7xl">Built for <span style={{ fontFamily: "'PP Mondwest', serif" }}>builders</span> who need the room to feel inevitable.</h2>
            </div>
          </InViewBlock>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {projectCards.map((project, index) => (
              <InViewBlock key={project.title} delay={`${0.1 + index * 0.1}s`} innerClassName="overflow-hidden rounded-[28px] bg-white shadow-[0_20px_60px_rgba(5,26,36,0.08)]">
                <img alt={project.title} className="h-72 w-full object-cover" src={project.image} />
                <div className="p-7">
                  <p className="text-sm uppercase tracking-[0.22em] text-[#273C46]">{project.label}</p>
                  <h3 className="mt-4 text-3xl tracking-[-0.04em] text-[#051A24]">{project.title}</h3>
                  <p className="mt-3 text-base leading-7 text-[#273C46]">{project.copy}</p>
                  <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#051A24]">See case story <ArrowUpRight className="h-4 w-4" /></div>
                </div>
              </InViewBlock>
            ))}
          </div>
        </section>

        <section className="mx-auto mt-24 max-w-7xl px-6" id="partner" onMouseMove={spawnTrailCard}>
          <div className="relative overflow-hidden rounded-[36px] bg-[#051A24] px-8 py-16 text-[#F6FCFF] shadow-[0_30px_90px_rgba(5,26,36,0.18)] md:px-14">
            <InViewBlock innerClassName="relative z-10 max-w-3xl">
              <p className="text-sm uppercase tracking-[0.26em] text-[#E0EBF0]">Partner with V Vortex</p>
              <h2 className="mt-4 text-5xl leading-none tracking-[-0.05em] md:text-7xl">Build the room where your next move lands.</h2>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#E0EBF0]">Every engagement becomes a launch system: narrative, interface, motion, and the confidence to show up like the category already belongs to you.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <ActionButton href="mailto:hello@vvortex.studio">Start a chat</ActionButton>
                <ActionButton href="#projects" variant="tertiary">Explore the work</ActionButton>
              </div>
            </InViewBlock>
            <div className="pointer-events-none absolute inset-0">
              {trailCards.map((card) => (
                <img key={card.id} alt="" className="partner-trail absolute h-28 w-36 rounded-2xl object-cover opacity-0 shadow-[0_18px_42px_rgba(0,0,0,0.28)]" src={card.image} style={{ left: card.x, top: card.y }} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="mx-auto max-w-7xl px-6 pb-28">
        <InViewBlock>
          <div className="grid gap-10 border-t border-[#E0EBF0] pt-10 md:grid-cols-[1.4fr_1fr_1fr]">
            <div>
              <p className="text-3xl tracking-[-0.04em]" style={{ fontFamily: "'PP Mondwest', serif" }}>V Vortex</p>
              <p className="mt-4 max-w-md text-base leading-7 text-[#273C46]">A creative studio for founders, teams, and ambitious builders who want refined launch systems instead of louder noise.</p>
            </div>
            <div className="space-y-3 text-sm uppercase tracking-[0.2em] text-[#273C46]">
              <a href="#projects">Projects</a>
              <a href="#partner">Partnership</a>
              <a href="mailto:hello@vvortex.studio">Email</a>
            </div>
            <div className="space-y-3 text-sm uppercase tracking-[0.2em] text-[#273C46]">
              <p className="flex items-center gap-2"><Mail className="h-4 w-4" /> hello@vvortex.studio</p>
              <p className="flex items-center gap-2"><MessageCircleMore className="h-4 w-4" /> Start a chat</p>
              <p className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Brooklyn / Remote</p>
            </div>
          </div>
          <div className="mt-8 flex flex-col gap-3 border-t border-[#E0EBF0] pt-6 text-sm text-[#273C46] md:flex-row md:items-center md:justify-between">
            <p>© 2026 V Vortex. All rights reserved.</p>
            <p>Built for the next wave of bold builders.</p>
          </div>
        </InViewBlock>
      </footer>

      <div className="fixed bottom-5 left-1/2 z-50 w-[calc(100%-24px)] max-w-3xl -translate-x-1/2 rounded-full border border-white/70 bg-[#051A24]/94 px-4 py-3 text-[#F6FCFF] shadow-[0_18px_54px_rgba(5,26,36,0.24)] backdrop-blur md:px-5">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#051A24]" style={{ fontFamily: "'PP Mondwest', serif" }}>V</div>
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-[#E0EBF0]">V Vortex</p>
              <p className="text-sm text-white/90">Creative studio portfolio</p>
            </div>
          </div>
          <ActionButton href="#partner">Start a chat</ActionButton>
        </div>
      </div>
    </div>
  )
}
