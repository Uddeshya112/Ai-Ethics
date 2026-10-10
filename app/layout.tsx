import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Github } from "lucide-react";
import "./globals.css";
import "./commit3.css";

export const metadata: Metadata = {
  title: { default: "Beyond Autopilot — AI Ethics & Automated Driving", template: "%s | Beyond Autopilot" },
  description: "An evidence-led research experience exploring automated driving, human trust, system limits, and responsibility.",
  openGraph: { title: "Beyond Autopilot", description: "AI ethics, human trust, and the limits of automated driving.", type: "website" },
};
const nav = [
  { href: "/research", label: "Research" },
  { href: "/cases", label: "Case studies" },
  { href: "/evidence", label: "Evidence" },
  { href: "/ethics-lab", label: "Ethics Lab" },
  { href: "/presentation", label: "Presentation" },
  { href: "/login", label: "Account" },
];
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header"><Link className="brand" href="/" aria-label="Beyond Autopilot home"><span className="brand-mark" aria-hidden="true">BA</span><span className="brand-copy"><strong>BEYOND AUTOPILOT</strong><small>AI ETHICS · HUMAN TRUST</small></span></Link>
      <nav className="main-nav" aria-label="Main navigation">{nav.map((item)=><Link key={item.href} href={item.href}>{item.label}</Link>)}</nav>
      <Link className="header-cta" href="/methodology">Our method <ArrowUpRight size={15}/></Link>
    </header>
    <main id="main">{children}</main>
    <footer className="site-footer"><div className="footer-top"><Link className="brand footer-brand" href="/"><span className="brand-mark" aria-hidden="true">BA</span><span className="brand-copy"><strong>BEYOND AUTOPILOT</strong><small>RESEARCH WITH RECEIPTS</small></span></Link><p>Technology can assist the driver.<br/>It cannot make responsibility disappear.</p><Link className="footer-link" href="https://github.com/Uddeshya112/Ai-Ethics" target="_blank" rel="noreferrer">View project <Github size={15}/></Link></div>
      <div className="footer-bottom"><span>Independent research project · Evidence-first by design</span><span>Not affiliated with Tesla or the NTSB.</span><Link href="/corrections">Corrections & updates</Link></div>
    </footer>
  </body></html>;
}
