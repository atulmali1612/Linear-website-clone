"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from "motion/react";
import { useTheme } from "next-themes";
import {
  ArrowRight, ArrowUpRight, AudioLines,
  Blocks, Check, ChevronDown, CircleHelp, Command, GitBranch,
  Inbox, Layers, Menu, Moon, MoreHorizontal, Plus, Search, Settings2,
  Sparkles, Sun, X,
} from "lucide-react";

const navGroups = {
  Product: [
    ["Intake", "Turn requests into work"], ["Plan", "Coordinate your roadmap"],
    ["AI", "Work with intelligent agents"], ["Build", "Ship higher quality software"],
  ],
  Resources: [
    ["Docs", "Learn how Linear works"], ["Customers", "Stories from product teams"],
    ["Changelog", "What’s new in Linear"], ["Developers", "Build with Linear"],
  ],
};

const issueLists = {
  "My issues": [
    { id: "ENG-2085", title: "Reduce UI flicker during autonomy startup", status: "In Progress", color: "violet", tag: "Performance" },
    { id: "ENG-2094", title: "Add buffering for autonomy event streams", status: "Todo", color: "blue", tag: "iOS" },
    { id: "ENG-2092", title: "Reduce startup delay caused by vehicle sync", status: "In Review", color: "amber", tag: "Mobile" },
    { id: "ENG-2200", title: "Fix delayed route updates during rerouting", status: "Todo", color: "green", tag: "Maps" },
  ],
  Inbox: [
    { id: "ENG-2298", title: "Add granular project permissions", status: "Todo", color: "violet", tag: "Access" },
    { id: "ENG-2647", title: "Let guests access multiple teams", status: "In Progress", color: "blue", tag: "Workspace" },
    { id: "ENG-2352", title: "Create custom roles with scoped access", status: "Todo", color: "amber", tag: "Security" },
  ],
  Reviews: [
    { id: "ENG-2498", title: "Replace isFullySynced with a sync status", status: "In Review", color: "green", tag: "#54910" },
    { id: "ENG-2380", title: "Show a stale data banner while syncing", status: "In Review", color: "blue", tag: "#55167" },
    { id: "ENG-2039", title: "Pass sync status to the dashboard", status: "In Progress", color: "amber", tag: "#55209" },
  ],
};

type IssueKey = keyof typeof issueLists;

export function HomePage() {
  const [menu, setMenu] = useState<"Product" | "Resources" | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<IssueKey>("My issues");
  const [selectedIssue, setSelectedIssue] = useState(0);
  const [activeStory, setActiveStory] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [toastText, setToastText] = useState("Agent task added to your workspace");
  const { theme, setTheme } = useTheme();
  const [themeMounted, setThemeMounted] = useState(false);
  useEffect(() => setThemeMounted(true), []);
  const currentTheme = themeMounted ? theme : "dark";
  const reduceMotion = useReducedMotion();
  const transition = reduceMotion ? { duration: 0 } : { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const };

  const toast = (message = "Agent task added to your workspace") => {
    setToastText(message);
    setShowToast(true);
    window.setTimeout(() => setShowToast(false), 2600);
  };

  return (
    <MotionConfig reducedMotion="user"><main>
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Linear home"><LinearMark /><span>Linear</span></a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {(["Product", "Resources"] as const).map((item) => (
            <div className="nav-dropdown" key={item}>
              <button className={`nav-link ${menu === item ? "is-open" : ""}`} aria-expanded={menu === item} onClick={() => setMenu(menu === item ? null : item)}>{item}<ChevronDown size={13} /></button>
              <AnimatePresence>
                {menu === item && <motion.div className="dropdown-panel" initial={{ opacity: 0, y: 7 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }} transition={{ duration: .16 }}>
                  {navGroups[item].map(([title, desc], i) => {
                    const href = item === "Product"
                      ? ["#intake", "#planning", "#ai", "#build"][i]
                      : ["https://linear.app/docs", "#customers", "#changelog", "https://linear.app/developers"][i];
                    return <a href={href} key={title} onClick={() => setMenu(null)}><span className="dropdown-icon">{i === 0 ? <Inbox size={16}/> : i === 1 ? <Layers size={16}/> : i === 2 ? <Sparkles size={16}/> : <GitBranch size={16}/>}</span><span><b>{title}</b><small>{desc}</small></span><ArrowUpRight className="dropdown-arrow" size={14}/></a>;
                  })}
                </motion.div>}
              </AnimatePresence>
            </div>
          ))}
          <a className="nav-link" href="#customers">Customers</a><a className="nav-link" href="#pricing">Pricing</a><a className="nav-link" href="#changelog">Now</a><a className="nav-link" href="#footer">Contact</a>
        </nav>
        <div className="nav-actions"><a className="login-link" href="https://linear.app/login">Log in</a><a className="button button-small" href="https://linear.app/signup">Sign up <ArrowUpRight size={13}/></a><button className="icon-button theme-button" onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")} aria-label={`Switch to ${currentTheme === "dark" ? "light" : "dark"} theme`}>{currentTheme === "dark" ? <Sun size={16}/> : <Moon size={16}/>}</button></div>
        <button className="mobile-menu-toggle" aria-label={mobileOpen ? "Close menu" : "Open menu"} aria-expanded={mobileOpen} onClick={() => setMobileOpen(!mobileOpen)}>{mobileOpen ? <X/> : <Menu/>}</button>
      </header>
      <AnimatePresence>{mobileOpen && <motion.nav className="mobile-nav" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}><a href="#intake" onClick={() => setMobileOpen(false)}>Product</a><a href="#changelog" onClick={() => setMobileOpen(false)}>Resources</a><a href="#customers" onClick={() => setMobileOpen(false)}>Customers</a><a href="#pricing" onClick={() => setMobileOpen(false)}>Pricing</a><a href="https://linear.app/login">Log in</a><button className="mobile-theme-toggle" onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}>{currentTheme === "dark" ? <Sun size={15}/> : <Moon size={15}/>} Switch to {currentTheme === "dark" ? "light" : "dark"} theme</button><a className="button" href="https://linear.app/signup">Get started <ArrowRight size={15}/></a></motion.nav>}</AnimatePresence>

      <section className="hero section-wrap" id="top">
        <div className="hero-copy">
          <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ ...transition, delay: .08 }}>The product development<br className="desktop-break"/> system for teams and agents</motion.h1>
          <div className="hero-sub-row"><motion.p className="hero-subtitle" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ ...transition, delay: .16 }}>Purpose-built for planning and building products. Designed for the AI era.</motion.p><motion.a className="announcement" href="#ai" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .45 }}><strong>New</strong> Loops <ArrowRight size={15}/></motion.a></div>
        </div>
        <motion.div className="hero-product" initial={{ opacity: 0, y: 38, scale: .985 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ ...transition, delay: .2 }}>
          <RealisticProductWindow activeTab={activeTab} setActiveTab={(v) => { setActiveTab(v); setSelectedIssue(0); }} selectedIssue={selectedIssue} setSelectedIssue={setSelectedIssue} onAction={toast} />
        </motion.div>
      </section>

      <section className="proof-section section-wrap">
        <div className="logo-row" aria-label="Customer logos"><span className="customer-logo openai"><span className="openai-mark">✳</span> OpenAI</span><span className="customer-logo vercel"><span className="vercel-mark">▲</span> Vercel</span><span className="customer-logo salesforce">☁ Salesforce</span><span className="customer-logo figma"><span>F</span> Figma</span><span className="customer-logo cursor">⬡ Cursor</span><span className="customer-logo coinbase">coinbase</span><span className="customer-logo ramp">ramp ◢</span></div>
        <div className="proof-intro"><span>POWERING THE COMPANIES BUILDING THE FUTURE</span><h2>A new species of product tool. <em>Purpose-built for modern teams with AI workflows at its core, Linear sets a new standard for planning and building products.</em></h2></div>
        <div className="proof-figures"><ProofFigure type="stack" title="Purpose-built" text="Linear is shaped by the practices and principles of world-class product teams."/><ProofFigure type="cubes" title="Powered by agents" text="Designed for workflows shared by humans and agents. From drafting PRDs to pushing PRs."/><ProofFigure type="speed" title="Designed for speed" text="Reduces noise and restores momentum to help teams ship with high velocity and focus."/></div>
      </section>

      <ProductSection id="intake" title={<>Intake<br/>and integrations</>} text="Automatically turn conversations and customer feedback into actionable issues that are instantly routed, labeled, and prioritized for the right team." link="Learn more" ><IntakePreview /></ProductSection>
      <ProductSection id="planning" title={<>Planning<br/>and monitoring</>} text="Plan and navigate from idea to launch. Align your team with product initiatives, strategic roadmaps, and clear, up-to-date PRDs." link="Learn more"><RoadmapPreview /></ProductSection>
      <ProductSection id="ai" title={<>AI and<br/>automations</>} text="Build and deploy AI agents that work alongside you as teammates. Work on complex tasks together or delegate entire issues end-to-end." link="Learn more"><AgentPreview onAction={toast} /></ProductSection>
      <ProductSection id="build" title={<>Build, review,<br/>and ship</>} text="Streamline code reviews with clear diffs, better context, and fewer back-and-forth comments. Keep PRs moving without sacrificing quality." link="Learn more"><ReviewPreview /></ProductSection>

      <section className="changelog-section section-wrap" id="changelog">
        <div className="changelog-heading"><h2>Changelog</h2></div>
        <div className="changelog-grid"><ChangelogCard category="AI" title="Bring your own key (BYOK)" text="You can now bring your own key to Linear’s cloud coding agent and use your existing provider credits." date="Nov 12, 2026" /><ChangelogCard category="MOBILE" title="Mobile Diffs" text="Diffs, Linear’s fast and focused review experience, is now available for iOS and Android." date="Nov 4, 2026" /><ChangelogCard category="LOOPS" title="Slack and GitHub loop triggers" text="Loops automate product work by responding to changes in Linear and connected tools." date="Oct 22, 2026" /><ChangelogCard category="DIFFS" title="Stacked pull requests" text="Move through a stack and see review, CI, and merge status at a glance." date="Oct 8, 2026" /></div><a className="text-link changelog-all" href="https://linear.app/changelog">View all <ArrowRight size={14}/></a>
      </section>

      <section className="stories-section section-wrap" id="customers">
        <div className="stories-top"><div className="section-kicker">CUSTOMER STORIES</div><div className="story-controls"><button className="icon-button" aria-label="Previous story" onClick={() => setActiveStory((activeStory + 1) % 2)}><ArrowRight className="flip" size={16}/></button><button className="icon-button" aria-label="Next story" onClick={() => setActiveStory((activeStory + 1) % 2)}><ArrowRight size={16}/></button></div></div>
        <div className="story-cards"><AnimatePresence mode="wait"><motion.div className={`story-card story-card-primary story-card-${activeStory}`} key={`primary-${activeStory}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: .2 }}><blockquote>{activeStory === 0 ? "You’ll probably build a better product, just because of the craft that using Linear infuses on your brain." : "Our speed is intense and Linear helps us be action biased."}</blockquote><div className="quote-author"><span className={`avatar avatar-${activeStory}`}>{activeStory === 0 ? "GP" : "NK"}</span><span><b>{activeStory === 0 ? "Gabriel Peal" : "Nik Koblov"}</b><small>{activeStory === 0 ? "Staff Software Engineer, OpenAI" : "Head of Engineering, Ramp"}</small></span><span className="quote-company">{activeStory === 0 ? "OpenAI" : "ramp"}</span></div></motion.div></AnimatePresence><div className="story-card story-card-secondary"><blockquote>{activeStory === 0 ? "Our speed is intense and Linear helps us be action biased." : "You’ll probably build a better product, just because of the craft that using Linear infuses on your brain."}</blockquote><div className="quote-author"><span className={`avatar avatar-${activeStory === 0 ? 1 : 0}`}>{activeStory === 0 ? "NK" : "GP"}</span><span><b>{activeStory === 0 ? "Nik Koblov" : "Gabriel Peal"}</b><small>{activeStory === 0 ? "Head of Engineering, Ramp" : "Staff Software Engineer, OpenAI"}</small></span><span className="quote-company">{activeStory === 0 ? "ramp" : "OpenAI"}</span></div></div></div>
        <div className="stories-bottom"><span>Linear powers over <strong>50,000</strong> product teams. From ambitious startups to major enterprises.</span><a href="https://linear.app/customers" className="text-link">Read customer stories <ArrowRight size={14}/></a></div>
      </section>

      <section className="cta-section section-wrap" id="pricing"><div className="cta-content"><h2>Built for the future.<br/>Available today.</h2><div className="cta-actions"><a className="button button-primary" href="https://linear.app/signup">Get started</a><a className="button button-quiet" href="https://linear.app/contact">Contact sales</a></div></div></section>

      <footer className="footer section-wrap" id="footer"><div className="footer-top"><a className="brand" href="#top"><LinearMark/><span>Linear</span></a><button className="theme-switch" onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}>{currentTheme === "dark" ? <Sun size={15}/> : <Moon size={15}/>} Switch to {currentTheme === "dark" ? "light" : "dark"} theme</button></div><div className="footer-columns"><FooterColumn title="Product" links={[["Intake", "#intake"], ["Plan", "#planning"], ["AI", "#ai"], ["Build", "#build"], ["Pricing", "#pricing"], ["Integrations", "#intake"]]} /><FooterColumn title="Features" links={[["Agents", "#ai"], ["Customer requests", "#intake"], ["Insights", "#planning"], ["Reviews", "#build"], ["Changelog", "#changelog"]]} /><FooterColumn title="Company" links={[["About", "https://linear.app/about"], ["Customers", "#customers"], ["Careers", "https://linear.app/careers"], ["Now", "#changelog"], ["Method", "https://linear.app/method"]]} /><FooterColumn title="Resources" links={[["Documentation", "https://linear.app/docs"], ["Developers", "https://linear.app/developers"], ["Enterprise", "https://linear.app/enterprise"], ["Status", "https://linearstatus.com"], ["Download", "https://linear.app/download"]]} /><FooterColumn title="Connect" links={[["Contact us", "https://linear.app/contact"], ["Community", "https://linear.app/community"], ["X (Twitter)", "https://x.com/linear"], ["GitHub", "https://github.com/linear"]]} /></div><div className="footer-bottom"><span>© 2026 Linear Orbit, Inc.</span><div><a href="https://linear.app/privacy">Privacy</a><a href="https://linear.app/terms">Terms</a><a href="https://linear.app/legal">Legal</a><span>San Francisco · New York · Remote</span></div></div></footer>

      <AnimatePresence>{showToast && <motion.div className="toast" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 16 }}><Check size={16}/> {toastText} <button onClick={() => setShowToast(false)} aria-label="Dismiss"><X size={14}/></button></motion.div>}</AnimatePresence>
    </main></MotionConfig>
  );
}

function LinearMark() { return <span className="linear-mark" aria-hidden="true"><span/></span>; }
function GithubMark() { return <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" role="img" aria-label="GitHub"><path d="M12 .8a11.2 11.2 0 0 0-3.54 21.82c.56.1.77-.24.77-.54v-2.1c-3.14.68-3.8-1.33-3.8-1.33-.5-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.72 1.16 1.72 1.16 1 1.7 2.62 1.21 3.26.93.1-.72.39-1.21.71-1.49-2.5-.28-5.13-1.25-5.13-5.57 0-1.23.44-2.23 1.16-3.02-.12-.28-.5-1.43.11-2.98 0 0 .95-.3 3.08 1.15a10.7 10.7 0 0 1 5.6 0c2.14-1.45 3.08-1.15 3.08-1.15.62 1.55.23 2.7.12 2.98.72.79 1.15 1.79 1.15 3.02 0 4.33-2.63 5.29-5.14 5.57.4.35.76 1.03.76 2.08v3.09c0 .3.2.65.78.54A11.2 11.2 0 0 0 12 .8Z"/></svg>; }

function RealisticProductWindow({ activeTab, setActiveTab, selectedIssue, setSelectedIssue, onAction }: { activeTab: IssueKey; setActiveTab: (v: IssueKey) => void; selectedIssue: number; setSelectedIssue: (v: number) => void; onAction: (message: string) => void }) {
  const tabs: IssueKey[] = ["Inbox", "My issues", "Reviews"];
  const selected = issueLists[activeTab][selectedIssue] ?? issueLists[activeTab][0];
  return <div className="app-window">
    <div className="app-titlebar"><div className="window-controls"><i/><i/><i/></div><span>Linear</span><button aria-label="More options"><MoreHorizontal size={16}/></button></div>
    <div className="app-body">
      <aside className="app-sidebar">
        <div className="workspace-switch"><span className="workspace-avatar"><LinearMark/></span><b>Linear</b><ChevronDown size={13}/><button className="sidebar-compose" aria-label="Create new issue" onClick={() => onAction("A new issue draft is ready")}><Plus size={15}/></button></div>
        <button className="search-mini" onClick={() => onAction("Search is ready in this workspace preview")}><Search size={13}/> Search <kbd>⌘ K</kbd></button>
        <div className="sidebar-group sidebar-your-work">{tabs.map((tab, i) => <button key={tab} className={`sidebar-item ${activeTab === tab ? "current" : ""}`} onClick={() => setActiveTab(tab)}>{i === 0 ? <Inbox size={14}/> : i === 1 ? <Command size={14}/> : <GitBranch size={14}/>} {tab}<span className="sidebar-count">{i === 0 ? "3" : ""}</span></button>)}<div className="sidebar-item"><AudioLines size={14}/> Pulse</div></div>
        <div className="sidebar-group"><span className="sidebar-label">WORKSPACE⌄</span><div className="sidebar-item"><Blocks size={14}/> Initiatives</div><div className="sidebar-item"><Layers size={14}/> Projects</div><div className="sidebar-item"><CircleHelp size={14}/> More</div></div>
        <div className="sidebar-group"><span className="sidebar-label">FAVORITES⌄</span><div className="sidebar-item selected-favorite"><span className="status-dot amber"/> Faster app launch</div><div className="sidebar-item"><Sparkles size={14}/> Agent tasks</div><div className="sidebar-item"><AudioLines size={14}/> Agent Insights</div><div className="sidebar-item"><span className="favorite-cross">⌘</span> UI Refresh</div></div>
        <div className="sidebar-bottom"><span className="profile-dot">JD</span><span>Jordan Davis</span><Settings2 size={14}/></div>
      </aside>
      <div className="issue-content hero-issue-content">
        <div className="issue-toolbar"><div className="hero-issue-name"><span className={`status-dot ${selected.color}`}/><b>{activeTab === "My issues" ? "DRV-8852" : selected.id}</b><span>{activeTab === "My issues" ? "Faster app launch" : selected.title}</span><span className="favorite-star">★</span></div><div className="hero-issue-tools"><span>{selectedIssue + 1} / {issueLists[activeTab].length}</span><button aria-label="Previous issue" onClick={() => setSelectedIssue((selectedIssue + issueLists[activeTab].length - 1) % issueLists[activeTab].length)}>↑</button><button aria-label="Next issue" onClick={() => setSelectedIssue((selectedIssue + 1) % issueLists[activeTab].length)}>↓</button></div></div>
        <div className="issue-quick-actions"><button aria-label="Copy link" onClick={() => onAction("Issue link copied")}>⌁</button><button aria-label="Open issue" onClick={() => onAction("Issue details are open in this preview")}>▣</button><button aria-label="Branch" onClick={() => onAction("Branch details are ready") }><GitBranch size={14}/></button><button aria-label="More actions" onClick={() => onAction("More issue actions") }><Sparkles size={13}/></button></div>
        <div className="hero-issue-details"><div className="hero-issue-main">
          <h3>{activeTab === "My issues" ? "Faster app launch" : selected.title}</h3><p>Render UI before <code>vehicle_state</code> sync when minimum required state is present, instead of blocking on full refresh during iOS startup.</p><h4>Activity</h4>
          <div className="activity-line"><i className="tiny-avatar">K</i><span><b>Linear</b> created the issue via Slack on behalf of Karri <small>· 2min ago</small></span></div>
          <div className="activity-line"><span className="activity-glyph">♧</span><span>Triage Intelligence added the labels Performance and iOS <small>· 2min ago</small></span></div>
          <div className="comment-card"><div><i className="tiny-avatar">K</i><b>karri</b><small>· 4 min ago</small></div><p>Right now we show a spinner forever, which makes it look like the car disappeared...</p><div className="comment-reply"><i className="tiny-avatar">J</i><b>jori</b><small>· just now</small><p>@Linear can you take a stab at this?</p></div></div>
          <div className="connected-card"><div><LinearMark/><span><b>Linear</b> connected by Jori <small>· 2 min ago</small></span></div><p>✣ &nbsp; Changed 2 files &nbsp; Draft PR awaiting your review</p></div><div className="activity-line status-change"><span className="status-dot amber"/><span>Linear moved from Todo to In Progress <small>· just now</small></span></div>
        </div>
        <aside className="agent-card"><div className="agent-header"><span className="agent-brand"><span className="agent-orb"><Sparkles size={14}/></span> Linear <span className="model-pill">Opus 5.5</span></span><MoreHorizontal size={15}/></div><div className="agent-thread"><div className="user-prompt">Fix the dimmed ride rows that never reset and open a PR</div><div className="agent-context">◉ &nbsp; DRV-364 added to context</div><div className="agent-thinking"><Sparkles size={13}/> Worked for 10 sec <span>›</span></div><div className="agent-answer"><p>Pushed and opened a draft PR. Removed dimmedIds — isItemDimmed now checks waitingStatusById directly.</p><div className="diff-card"><b>Changed 2 files <span>+22 −10</span></b><small>⌥ Draft &nbsp; Reset dimmed ride rows</small><small>master ← ride/drv-364-reset-dimmed-rows</small></div></div></div><form className="agent-input agent-reply" onSubmit={(event) => { event.preventDefault(); onAction("Your reply was added to the agent thread"); }}><input aria-label="Reply to Linear Agent" placeholder="Reply..."/><div><span>▧ Skills⌄</span><button type="button" aria-label="Add context" onClick={() => onAction("Context picker opened") }><Plus size={14}/></button><button type="submit" aria-label="Send reply"><ArrowUpRight size={15}/></button></div></form></aside></div>
      </div>
    </div>
    <div className="window-caption"><span className="caption-spark"><Sparkles size={12}/></span> Work moves forward, all in one place</div>
  </div>;
}

function ProofFigure({ type, title, text }: { type: "stack" | "cubes" | "speed"; title: string; text: string }) { return <article className="proof-figure"><span className="figure-label">FIG 0.{type === "stack" ? "1" : type === "cubes" ? "2" : "3"}</span><div className={`figure-art figure-${type}`} aria-hidden="true">{type === "stack" ? <svg viewBox="0 0 320 260"><g fill="none" stroke="currentColor" strokeWidth="1"><path d="M160 28 260 78 160 128 60 78 160 28Z"/><path d="m60 78 0 25 100 51 100-51V78M60 103v25l100 51 100-51v-25M60 128v25l100 51 100-51v-25M60 153v25l100 51 100-51v-25"/><path d="M115 74c0-17 20-28 45-28s45 11 45 28-20 24-45 24-45-7-45-24Z"/><path d="M115 76h90M122 84h76M132 92h56"/></g></svg> : type === "cubes" ? <svg viewBox="0 0 320 260"><g fill="none" stroke="currentColor" strokeWidth="1"><path d="m160 38 64 32-64 33-64-33 64-32Zm-64 33v58l64 33v-59m64-32v58l-64 33m-72-55 64 34 64-34M92 112v53l68 35 68-35v-53m-136 0 68 34 68-34m-111 24 43 22 43-22m-76-84v59m97-59v59"/><path d="m80 98 49-25 49 25-49 25-49-25Zm-25 70 48-25 48 25-48 25-48-25Zm93-14 48-25 48 25-48 25-48-25Z"/></g></svg> : <svg viewBox="0 0 320 260"><g fill="none" stroke="currentColor" strokeWidth="1"><path d="m53 184 125-63 89 45-125 64-89-46Z"/><path d="m53 184 0 14 89 47 125-64v-15M70 168v14l89 47m-72-60v14l89 47m-72-60v14l89 47m-72-60v14l89 47m-72-60v14l89 47m-72-60v14l89 47m-72-60v14l89 47"/><path d="m133 148 0-48 90-46v93m-90-47 90 47m-90-47 90-46 44 23v93m-44-116 0 46m0-23 44 23m-44 0 44 23m-44 0 44 23"/></g></svg>}</div><div className="proof-caption"><h3>{title}</h3><p>{text}</p></div></article>; }

function ProductSection({ id, title, text, link, children }: { id: string; title: React.ReactNode; text: string; link: string; children: React.ReactNode }) { return <section className="product-section section-wrap" id={id}><motion.div className="product-copy" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .28 }} transition={{ duration: .55, ease: [0.22, 1, 0.36, 1] }}><h2>{title}</h2></motion.div><motion.div className="product-description" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .28 }} transition={{ duration: .55, delay: .06, ease: [0.22, 1, 0.36, 1] }}><p>{text}</p><a href={`https://linear.app/${id}`} className="text-link">{link}<ArrowRight size={14}/></a></motion.div><motion.div className="product-visual" initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .22 }} transition={{ duration: .62, delay: .08, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div></section>; }

function IntakePreview() { return <div className="visual-frame intake-frame"><div className="preview-top"><span><Inbox size={13}/> Product backlog</span><span>•••</span></div><div className="intake-layout"><div className="intake-board"><div className="board-heading"><span className="board-dot lavender"/> Backlog <small>8</small></div>{[["ENG-2085", "Reduce UI flicker during startup", "Performance"], ["ENG-2094", "Buffer autonomy event streams", "iOS"], ["ENG-2092", "Reduce vehicle sync delay", "Mobile"], ["ENG-2200", "Fix delayed route updates", "Maps"]].map((item, i) => <div className="board-card" key={item[0]}><small>{item[0]}</small><b>{item[1]}</b><span className={`tag-pill tag-${i}`}>{item[2]}</span></div>)}</div><div className="slack-panel"><div className="slack-head"><span className="slack-mark">#</span> #product-feedback <MoreHorizontal size={14}/></div><div className="slack-message"><span className="avatar avatar-2">DI</span><span><b>didier</b><small>10:42 AM</small><p>Anyone else noticing the iOS app feels slow to open if you haven’t used it in a bit?</p></span></div><div className="slack-message"><span className="avatar avatar-0">LE</span><span><b>lena</b><small>10:48 AM</small><p>Yeah, startup takes a while to sync everything before the home screen loads.</p></span></div><div className="agent-suggestion"><div><Sparkles size={13}/> Linear Agent</div><p>Looks like a performance issue. I found 3 related reports.</p><button>＋ Create issue</button></div></div></div><div className="integrations-strip"><span>Connects with</span><i className="int-icon slack">#</i><i className="int-icon github"><GithubMark /></i><i className="int-icon intercom">◉</i><i className="int-icon zendesk">Z</i><i className="int-icon">+ 20 more</i></div></div>; }


function RoadmapPreview() { const months = ["MAR", "APR", "MAY", "JUN", "JUL", "AUG"]; const projects = [["UI Refresh", 0, 2, "purple"], ["Core screens", 1, 2, "blue"], ["Polish", 2, 1, "orange"], ["Split fares", 2, 2, "green"], ["Autonomy status clarity", 3, 2, "purple"], ["Telemetry reliability", 4, 2, "blue"]] as const; return <div className="visual-frame roadmap-frame"><div className="roadmap-grid"><div className="roadmap-spacer"/><div className="month-heads">{months.map(m => <span key={m}>{m}</span>)}</div><div className="roadmap-names">{projects.map(([name], i) => <div key={name}><span className={`board-dot dot-${i%4}`}/>{name}</div>)}</div><div className="roadmap-timeline"><div className="week-lines"/>{projects.map(([name,start,span,color], i) => <div className={`roadmap-bar bar-${color}`} key={name} style={{gridColumn:`${start + 1} / span ${span}`,gridRow:i+1}}><span>{name}</span><small>{["Jun 12", "Jul 03", "Aug 10"][i%3]}</small></div>)}</div></div><div className="cycle-chart"><h3>Cycle time by agent</h3><svg viewBox="0 0 600 280" role="img" aria-label="Cycle time trend chart"><g className="chart-grid"><path d="M0 45H600M0 105H600M0 165H600M0 225H600"/><path d="M75 0V250M225 0V250M375 0V250M525 0V250"/></g><path className="chart-line red" d="M0 113h120l22-31h125l32 44h126l22-34h153"/><path className="chart-line orange" d="M0 162h120l22 28h125l32-22h126l22 33h153"/><path className="chart-line gray" d="M0 202h120l22 36h125l32-42h126l22 40h153"/>{Array.from({length:52},(_,i)=><circle key={i} cx={35+(i%13)*3.8+(Math.floor(i/13)*150)} cy={92+(i*37%115)} r="3.2" className="chart-dot"/>)}</svg><div className="chart-dates"><span>Oct 2025</span><span>Nov 2025</span><span>Dec 2025</span><span>Jan 2026</span></div></div></div>; }


function AgentPreview({ onAction }: { onAction: () => void }) { const [prompt, setPrompt] = useState(""); const [sent, setSent] = useState(false); const cards = [{name:"Linear",model:"Opus 5.5",prompt:"What are the three most important customer requests around permissions? Add them to the Access Controls project.",answer:"Three issues ranked by customer impact",tag:"Access Controls"},{name:"Cursor",model:"Cloud agent",prompt:"Add retry handling for failed image uploads described in this issue",answer:"Started working on ENG-2844 and launched a cloud agent.",tag:"ENG-2844"},{name:"Linear",model:"Opus 5.5",prompt:"Review today’s mobile triage and group the issues by what should happen next",answer:"Reviewed eight issues: two are ready for backlog, two need details, four belong to iOS or Android.",tag:"Mobile Triage"},{name:"ChatPRD",model:"Connected app",prompt:"Review this issue, draft complete offline mode requirements, and break the work into sub-issues",answer:"Updated the issue with requirements, open decisions, and acceptance criteria.",tag:"ENG-2920"}]; return <div className="visual-frame agent-frame agent-showcase"><div className="agent-cards-row">{cards.map((card,i)=><article className={`agent-mini-card agent-mini-${i}`} key={card.name+i}><div className="agent-mini-head"><b>{card.name}</b><span>{i===0?"Opus 5.5":"•••"}</span><MoreHorizontal size={14}/></div><div className="agent-mini-prompt">{card.prompt}</div><div className="agent-mini-context">◉ &nbsp; {card.tag} added to context</div><div className="agent-mini-work">{i===0?"Worked for 8 sec":i===1?"Thinking…":"Worked for 1 min"}</div><p>{card.answer}</p>{i===0?<div className="agent-mini-result"><b>ENG-2298</b> Add granular project permissions<br/><b>ENG-2647</b> Let guests access multiple teams<br/><b>ENG-2352</b> Create custom roles with scoped access</div>:<div className="agent-mini-result"><Check size={12}/> {card.tag}</div>}</article>)}</div><form className="agent-input agent-showcase-input" onSubmit={e=>{e.preventDefault();if(prompt.trim()){setSent(true);onAction();}}}><input aria-label="Ask Linear Agent" value={prompt} onChange={e=>setPrompt(e.target.value)} placeholder={sent?"Agent task added":"Ask Linear Agent anything..."}/><div><button type="button" aria-label="Add context"><Plus size={14}/></button><button className="send-agent" aria-label="Send prompt"><ArrowUpRight size={15}/></button></div></form></div>; }


function ReviewPreview() { const code=["import React from 'react'","import { View, ActivityIndicator } from 'react-native'","import { useVehicleState } from '@hooks/useVehicleState'","import { Dashboard } from '@components/Dashboard'","","export const HomeScreen = () => {","  const { vehicleState, isFullySynced } = useVehicleState()","","  if (!isFullySynced) {","    return <ActivityIndicator size=\"large\" />","  }","","  return <Dashboard state={vehicleState} />","}"]; return <div className="visual-frame review-frame code-review-frame"><div className="review-list-preview"><div className="review-col-head">◉ &nbsp; IN REVIEW &nbsp; 3</div>{[["ENG-2498","Replace isFullySynced with a sync status"],["ENG-2380","Show a stale data banner while syncing"],["ENG-2039","Pass sync status to the dashboard"],["ENG-2076","Reduce ETA jitter"],["ENG-2108","Handle GPS dropouts gracefully"],["ENG-2254","Reduce unnecessary re-rendering on home screen"]].map((row,i)=><div className="review-list-row" key={row[0]}><span className={`status-dot ${i<3?"green":"amber"}`}/><small>{row[0]}</small><b>{row[1]}</b></div>)}</div><div className="code-window"><div className="code-title"><span>▤</span> kinetic-ios/src/screens/Home/HomeScreen.tsx <small>Linear⌄</small></div><div className="code-panes"><pre>{code.map((line,i)=><span className={i===2||i===6||i===8||i===12?"code-highlight":""} key={i}><i>{String(i+1).padStart(2,"0")}</i>{line}{"\n"}</span>)}</pre><pre className="code-new">{code.map((line,i)=><span className={i===2||i===6||i===8||i===12?"code-added":""} key={i}><i>{String(i+1).padStart(2,"0")}</i>{i===2?"import { useVehicleState, SyncStatus } from '@hooks/useVehicleState'":i===6?"  const { vehicleState, syncStatus } = useVehicleState()":i===8?"  if (syncStatus === SyncStatus.PENDING) {":i===12?"  return <Dashboard state={vehicleState} syncStatus={syncStatus} />":line}{"\n"}</span>)}</pre></div></div></div>; }

function ChangelogCard({ category, title, text, date }: { category: string; title: string; text: string; date: string }) { return <a className="changelog-card" href="https://linear.app/changelog"><span className="change-node"/><div className="change-copy"><h3>{title}</h3><p>{text}</p><small>{date}</small></div></a>; }

function FooterColumn({ title, links }: { title: string; links: [string, string][] }) { return <div className="footer-col"><h3>{title}</h3>{links.map(([label, href]) => <a href={href} key={label}>{label}</a>)}</div>; }
