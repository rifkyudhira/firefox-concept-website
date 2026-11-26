'use client';

import Image from 'next/image';
import { useEffect, useRef, useState, type FormEvent } from 'react';

const download = 'https://www.mozilla.org/firefox/new/';
const donate = 'https://foundation.mozilla.org/donate/';
const volunteer = 'https://www.mozilla.org/contribute/';
const features = [
  { title: 'Privacy-First Browsing', icon: 'icon.svg', text: "Shield your online life with Mozilla’s industry-leading protection against trackers and data harvesting.", href: 'https://www.mozilla.org/firefox/features/private-browsing/' },
  { title: 'Open-Source Innovation', icon: 'icon-1.svg', text: 'Experience a browser built by a global community, constantly evolving with users’ needs and open standards.', href: 'https://www.mozilla.org/about/' },
  { title: 'Cross-Device Sync', icon: 'icon-2.svg', text: 'Bring your bookmarks, passwords, and favorite tabs with you, wherever you browse.', href: 'https://www.mozilla.org/firefox/features/sync/' },
  { title: 'Customizable Interface', icon: 'icon-3.svg', text: 'Make your browser feel like you with themes, extensions, and a space of your own.', href: 'https://www.mozilla.org/firefox/features/customize/' },
  { title: 'Resource-Smart Performance', icon: 'icon-4.svg', text: 'Keep your browsing moving with a browser designed for everyday exploration.', href: download },
];
const milestones = [
  { year: '2002', title: 'The Birth of a Browser', text: "Mozilla developers create Phoenix, the foundation for what will become Firefox. This experimental browser aims to improve upon Mozilla Suite’s bloated features." },
  { year: '2004', title: 'Meet Mozilla Firefox', text: 'Firefox 1.0 arrives, bringing a fresh approach to the web with tabbed browsing and a focus on putting people first.' },
  { year: '2011', title: 'A Faster, More Personal Web', text: 'Firefox continues to evolve, with a refreshed interface and new ways to make browsing your own.' },
  { year: '2017', title: 'A Quantum Leap Forward', text: 'Firefox Quantum introduces a new engine and a fresh design, beginning another chapter for the independent browser.' },
];
const footer = [
  { title: 'Company', links: [['Mozilla Manifesto','https://www.mozilla.org/about/manifesto/'],['Press Center','https://www.mozilla.org/press/'],['Mozilla Blog','https://blog.mozilla.org/'],['Career','https://www.mozilla.org/careers/'],['Contact','https://www.mozilla.org/contact/']] },
  { title: 'Resources', links: [['Privacy Hub','https://www.mozilla.org/privacy/'],['Brand Standard','https://mozilla.design/']] },
  { title: 'Support', links: [['Product Help','https://support.mozilla.org/'],['File a Bug','https://bugzilla.mozilla.org/'],['Localize Mozilla','https://pontoon.mozilla.org/']] },
  { title: 'Developers', links: [['Developers Edition','https://www.mozilla.org/firefox/developer/'],['Beta','https://www.mozilla.org/firefox/channel/desktop/'],['Beta for Android','https://www.mozilla.org/firefox/channel/android/'],['Nightly','https://www.mozilla.org/firefox/channel/desktop/'],['Nightly for Android','https://www.mozilla.org/firefox/channel/android/'],['Enterprise','https://www.mozilla.org/firefox/enterprise/'],['Tools','https://developer.mozilla.org/']] },
];
function Picture({src, alt, className = '', width = 800, height = 600, priority = false}: {src: string; alt: string; className?: string; width?: number; height?: number; priority?: boolean}) { return <Image src={src} alt={alt} width={width} height={height} className={className} priority={priority} />; }
function Arrow({direction, onClick, disabled = false, asset = false}: {direction: 'left'|'right'; onClick: () => void; disabled?: boolean; asset?: boolean}) { return <button className={asset ? 'arrow arrow-svg' : 'arrow'} onClick={onClick} disabled={disabled} aria-label={direction === 'left' ? 'Previous slide' : 'Next slide'}>{asset ? <Picture src={'/icons/'+direction+'-arrow.svg'} alt="" width={40} height={40}/> : direction === 'left' ? '←' : '→'}</button>; }
export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const featureTrack = useRef<HTMLDivElement>(null);
  const [featureEdges, setFeatureEdges] = useState({previous:false, next:false});
  useEffect(() => {
    const track = featureTrack.current;
    if (!track) return;
    let mobileCentered = false;
    const mobile = window.matchMedia('(max-width: 767px)');
    const updateEdges = () => {
      // Start with an interior card on mobile so both neighbors are visible.
      if (mobile.matches && !mobileCentered) {
        const card = track.querySelectorAll<HTMLElement>('.feature-card')[1];
        if (card && track.clientWidth) {
          mobileCentered = true;
          track.scrollLeft = card.offsetLeft - (track.clientWidth - card.offsetWidth) / 2;
        }
      }
      const previous = track.scrollLeft > 2;
      const next = track.scrollLeft < track.scrollWidth - track.clientWidth - 2;
      setFeatureEdges(current => current.previous === previous && current.next === next ? current : {previous, next});
    };
    updateEdges();
    track.addEventListener('scroll', updateEdges, {passive:true});
    mobile.addEventListener('change', updateEdges);
    const resize = new ResizeObserver(updateEdges);
    resize.observe(track);
    return () => { track.removeEventListener('scroll', updateEdges); mobile.removeEventListener('change', updateEdges); resize.disconnect(); };
  }, []);
  const [milestone, setMilestone] = useState(0);
  const [newsletterMessage, setNewsletterMessage] = useState('');
  const [promptMessage, setPromptMessage] = useState('');
  const historyTrack = useRef<HTMLDivElement>(null);
  const historyIndex = useRef(0);
  useEffect(() => {
    const track = historyTrack.current;
    if (!track) return;
    let width = track.clientWidth;
    const observer = new ResizeObserver(() => {
      if (track.clientWidth === width) return;
      width = track.clientWidth;
      const card = track.children[historyIndex.current] as HTMLElement | undefined;
      if (card) track.scrollLeft = card.offsetLeft;
    });
    observer.observe(track);
    return () => observer.disconnect();
  }, []);
  function selectMilestone(index: number) {
    const track = historyTrack.current;
    const card = track?.children[index] as HTMLElement | undefined;
    if (!track || !card) return;
    historyIndex.current = index;
    setMilestone(index);
    track.scrollTo({left:card.offsetLeft, behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
  }
  function syncMilestone() {
    const track = historyTrack.current;
    if (!track) return;
    const cards = Array.from(track.children) as HTMLElement[];
    const nearest = cards.reduce((best, card, index) => Math.abs(card.offsetLeft - track.scrollLeft) < Math.abs(cards[best].offsetLeft - track.scrollLeft) ? index : best, 0);
    historyIndex.current = nearest;
    setMilestone(nearest);
  }
  const scrollFrame = useRef<number | null>(null);

  useEffect(() => {
    // Enhance only after hydration: content remains readable without JavaScript.
    const groups = [
      '.section-heading > *', '.feature-card',
      '.press > h2', '.press-logos > img', '.ai-visual', '.ai-panel > *',
      '.history-intro > *', '.history-stage', '.timeline', '.community-card',
      '.newsletter > *', '.footer-top > *', '.footer-links > div', '.copyright',
    ];
    const elements = groups.flatMap(selector => Array.from(document.querySelectorAll<HTMLElement>(selector)));
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const revealAll = () => elements.forEach(element => element.classList.add('is-visible'));
    if (motion.matches || !('IntersectionObserver' in window)) return;
    elements.forEach(element => {
      element.dataset.reveal = '';
      const siblings = Array.from(element.parentElement?.children ?? []).filter(child => elements.includes(child as HTMLElement));
      element.style.setProperty('--reveal-delay', `${Math.min(siblings.indexOf(element), 4) * 90}ms`);
    });
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });
    elements.forEach(element => observer.observe(element));
    document.documentElement.classList.add('motion-ready');
    const handleMotion = () => { if (motion.matches) { observer.disconnect(); revealAll(); } };
    motion.addEventListener('change', handleMotion);
    return () => {
      observer.disconnect();
      motion.removeEventListener('change', handleMotion);
      document.documentElement.classList.remove('motion-ready');
      elements.forEach(element => { delete element.dataset.reveal; element.classList.remove('is-visible'); });
    };
  }, []);

  useEffect(() => () => { if (scrollFrame.current !== null) cancelAnimationFrame(scrollFrame.current); }, []);

  function scrollFeatures(distance: number) {
    const track = featureTrack.current;
    if (!track) return;
    if (scrollFrame.current !== null) cancelAnimationFrame(scrollFrame.current);
    const start = track.scrollLeft;
    const card = track.querySelector<HTMLElement>('.feature-card');
    const step = (card?.offsetWidth ?? 416) + parseFloat(getComputedStyle(track).columnGap || '24');
    const target = Math.max(0, Math.min(track.scrollWidth - track.clientWidth, (Math.round(start / step) + Math.sign(distance)) * step));
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { track.scrollLeft = target; return; }
    const started = performance.now();
    track.classList.add('is-scrolling');
    const tick = (now: number) => {
      const progress = Math.min((now - started) / 780, 1);
      const eased = progress < .5 ? 4 * progress ** 3 : 1 - (-2 * progress + 2) ** 3 / 2;
      track.scrollLeft = start + (target - start) * eased;
      if (progress < 1) scrollFrame.current = requestAnimationFrame(tick);
      else { scrollFrame.current = null; track.classList.remove('is-scrolling'); }
    };
    scrollFrame.current = requestAnimationFrame(tick);
  }

  function stopFeatureScroll() {
    if (scrollFrame.current !== null) cancelAnimationFrame(scrollFrame.current);
    scrollFrame.current = null;
    featureTrack.current?.classList.remove('is-scrolling');
  }
  function newsletterSubmit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setNewsletterMessage('Thanks for your interest! This design preview isn’t connected to a mailing list yet.'); }
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header flex items-center justify-between">
      <a href="#" aria-label="Mozilla home"><Picture src="/icons/black-logo-mozilla.svg" alt="Mozilla" width={168} height={48} className="header-logo" /></a>
      <div className="flex items-center gap-6"><nav className="desktop-nav items-center gap-6" aria-label="Main navigation"><a href="#products">Products</a><a href="#community">Who We Are</a><a href="#innovation">Innovation</a></nav><a href={donate} className="button button-outline">Donate Us Now</a><button className="menu-toggle" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} aria-controls="mobile-nav" onClick={() => setMenuOpen(!menuOpen)}><span/><span/><span/></button></div>
      <nav id="mobile-nav" className="mobile-nav" data-open={menuOpen} aria-hidden={!menuOpen} inert={!menuOpen} aria-label="Mobile navigation">{[['Products','#products'],['Who We Are','#community'],['Innovation','#innovation']].map(([name,href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{name}</a>)}</nav>
    </header>
    <main id="main">
      <section className="hero text-center" aria-labelledby="hero-title">
        <div className="hero-copy mx-auto"><h1 id="hero-title">Remember When You’re<br className="desktop-break"/> Chatting Using mIRC?</h1><p>We still remember about those memories. <span>But the differences is we AI powered now.</span></p><div className="hero-actions flex items-center justify-center"><a className="button button-orange" href={download}>Download Browser Now</a><a className="text-orange" href="#products">Why Choose Mozilla?</a></div></div>
        <div className="hero-art"><div className="hero-atmosphere" aria-hidden="true"><Picture src="/images/Gradient-hero.svg" alt="" className="hero-gradient" priority/></div><Picture src="/images/computer.png" alt="A vintage computer displaying the original Firefox Start page" className="computer" width={1000} height={900} priority/></div>
      </section>
      <section className="features" id="products" aria-labelledby="features-title"><div className="section-heading flex items-center justify-between"><h2 id="features-title">Why Still Choose Mozilla?</h2><div className="flex gap-4 feature-arrows"><Arrow asset direction="left" disabled={!featureEdges.previous} onClick={() => scrollFeatures(-440)}/><Arrow asset direction="right" disabled={!featureEdges.next} onClick={() => scrollFeatures(440)}/></div></div><div className="feature-track" ref={featureTrack} onPointerDown={stopFeatureScroll} onWheel={stopFeatureScroll}>{features.map(feature => <article className="feature-card" key={feature.title} tabIndex={0}><Picture src={'/icons/'+feature.icon} alt="" width={245} height={237} className="feature-icon"/><div className="feature-content"><h3>{feature.title}</h3><div className="feature-details"><div><p>{feature.text}</p><a href={feature.href} className="learn-more">Learn More<span className="sr-only"> about {feature.title}</span></a></div></div></div></article>)}</div></section>
      <section className="press text-center" aria-label="Press coverage"><h2>Our Products Have Been Covered By</h2><div className="press-logos flex items-center justify-center"><Picture src="/icons/wired.svg" alt="Wired" width={241} height={48}/><Picture src="/icons/the independence.svg" alt="The Independent" width={397} height={28}/><Picture src="/icons/y combinator.svg" alt="Y Combinator" width={197} height={40}/><Picture src="/icons/bloomberg.svg" alt="Bloomberg" width={200} height={40}/></div></section>
      <section className="ai-section grid items-center" id="innovation" aria-labelledby="ai-title"><div className="ai-visual"><Picture src="/images/ai-illustration.jpg" alt="Purple and orange sculptural head above three example AI prompts" width={850} height={730} className="ai-art"/></div><div className="ai-panel"><div className="ai-logo flex items-center gap-1"><Picture src="/icons/black-logo-mozilla.svg" alt="Mozilla" width={82} height={24}/><span>ai</span></div><h2 id="ai-title">Years of Trustworthy Browser With AI Powered</h2><p>Discover a new era of web exploration with Mozilla. We’re pioneering AI-enhanced browsing that respects your privacy and aligns with your values. Experience the power of artificial intelligence while maintaining control over your online journey.</p><form className="input-group" onSubmit={event => {event.preventDefault();setPromptMessage('This is a frontend design preview. AI search is not connected yet.');}}><label className="sr-only" htmlFor="prompt">Your AI prompt</label><input id="prompt" placeholder="Add Prompt at here..." required/><button className="button button-purple" type="submit">Search</button></form><p role="status" className="form-status">{promptMessage}</p></div></section>
      <section className="history" aria-labelledby="history-title">
        <div className="history-intro text-center mx-auto"><h2 id="history-title">Crafting Trustworthy<br className="desktop-break"/> Browser Since Long Ago</h2><p>We still remember about those memories. <span>But the differences is we AI powered now.</span></p><a className="button button-orange" href={download}>Download Now</a></div>
        <div className="history-content mx-auto">
          <div className="timeline" aria-label="Choose a year">{milestones.map((item,index) => <button key={item.year} aria-label={'Show '+item.year} aria-controls={'history-'+item.year} aria-pressed={index === milestone} onClick={() => selectMilestone(index)} className={index === milestone ? 'active' : ''}><span className="sr-only">{item.year}</span></button>)}</div>
          <div className="history-stage" role="region" aria-roledescription="carousel" aria-label="Browser history">
            <div className="history-track" ref={historyTrack} onScroll={syncMilestone} tabIndex={0} aria-label="History cards, use arrow keys to browse" onKeyDown={event => { if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); selectMilestone(Math.max(0,Math.min(milestones.length-1,milestone+(event.key === 'ArrowRight' ? 1 : -1)))); } }}>
              {milestones.map((item,index) => <article className="history-card" id={'history-'+item.year} key={item.year} role="group" aria-roledescription="slide" aria-label={`${item.year}, ${index+1} of ${milestones.length}`}><Picture src={'/images/'+item.year+'.png'} alt={'Firefox browser in '+item.year} className="history-image"/><div className="history-copy"><span className="year">{item.year}</span><h3>{item.title}</h3><p>{item.text}</p></div></article>)}
            </div>
            <div className="history-arrows flex gap-4"><Arrow direction="left" onClick={() => selectMilestone(milestone-1)} disabled={milestone === 0}/><Arrow direction="right" onClick={() => selectMilestone(milestone+1)} disabled={milestone === milestones.length-1}/></div>
          </div>
          <p className="sr-only" role="status">{milestones[milestone].year}: {milestones[milestone].title}</p>
        </div>
      </section>
      <section className="community" id="community" aria-label="Get involved"><div className="community-cards grid mx-auto">{[{tag:'Volunteer',image:'Volunteer.png',title:'Join Us To Create Better Internet Experiences',text:'Become volunteering at Mozilla organization, a non profit for better internet experiences.',button:'Join Us Now',href:volunteer},{tag:'Donation',image:'Donation.png',title:'Help Us To Grow The Products That You Liked',text:'Help our journey and mission to giving better internet experiences for everyone by donating without minimal amount.',button:'Donate Us Now',href:donate}].map(card => <article className="community-card" key={card.tag}><Picture src={'/images/'+card.image} alt={card.tag === 'Volunteer' ? 'A dog wearing glasses looking at a tablet' : 'A hand placing a coin in a piggy bank'} className="community-image"/><div className="community-copy"><div className="eyebrow flex items-center gap-2">{card.tag}<span/></div><h2>{card.title}</h2><p>{card.text}</p><a href={card.href} className="button button-outline">{card.button}</a></div></article>)}</div></section>
      <section className="newsletter text-center" aria-labelledby="newsletter-title"><h2 id="newsletter-title">Stay Safe &amp; Informed as Internet<br className="desktop-break"/> Citizen With Mozilla</h2><p>Get our newsletter and always informed with updates and tips &amp; tricks from Mozilla that help you to having better internet experiences.</p><form className="input-group mx-auto" onSubmit={newsletterSubmit}><label htmlFor="email" className="sr-only">Email address</label><input id="email" type="email" placeholder="Yourmail@mail.com" autoComplete="email" required/><button className="button button-purple" type="submit">Send Newsletter</button></form><p role="status" className="form-status">{newsletterMessage}</p></section>
    </main>
    <footer className="footer"><div className="footer-top flex items-center justify-between"><a href="#" aria-label="Back to top"><Picture src="/icons/white-logo-mozilla.svg" alt="Mozilla" width={168} height={48}/></a><div className="footer-actions flex gap-4"><a className="button" href={donate}>Donate Us Now</a><a className="button" href={volunteer}>Join As Volunteer</a></div></div><div className="footer-links grid">{footer.map(group => <div key={group.title}><h2>{group.title}</h2><ul>{group.links.map(([label,href]) => <li key={label}><a href={href}>{label}</a></li>)}</ul></div>)}</div><div className="copyright text-center">Portions of this content are ©1998–2024 by individual mozilla.org</div></footer>
  </>;
}
