"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import { ChevronDown, Clock3, Landmark, TrendingUp, Wallet, Workflow } from "lucide-react";
import { useApp } from "@/components/providers";
import { ItracomLogo } from "@/components/brand";
import { budgetNav } from "@/lib/nav";
import { signTasks } from "@/lib/mock-data";

export function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const { t } = useApp();
  const pathname = usePathname();
  // Replié à l'arrivée ; ouvert d'emblée seulement sur une page du département, pour montrer l'entrée active.
  const inFinance = ["/prevision", "/execution", "/budget"].some((p) => pathname.startsWith(p));
  const [financeOpen, setFinanceOpen] = useState(inFinance);
  const [budgetOpen, setBudgetOpen] = useState(() => pathname.startsWith("/budget"));

  return <div className="secondary-inner">
    <div className="secondary-heading"><Link href="/dashboard" onClick={onNavigate} className="organization-logo" aria-label="ITRACOM Holding — Accueil"><ItracomLogo /></Link></div>
    <nav className="secondary-menu" aria-label="Départements">
      <div className="secondary-group">
        <GroupButton id="finance-menu" open={financeOpen} onClick={() => setFinanceOpen((v) => !v)} icon={<Landmark size={19} />}>{t("nav.finance")}</GroupButton>
        <div id="finance-menu" className="secondary-children" hidden={!financeOpen}>
          <Link href="/prevision" onClick={onNavigate} aria-current={pathname === "/prevision" ? "page" : undefined} className={`secondary-group-link${pathname === "/prevision" ? " is-active" : ""}`}><TrendingUp size={18} /><span>{t("nav.prevision")}</span><Clock3 size={14} className="nav-trailing" aria-label="En développement" /></Link>
          <div className="secondary-group">
            <GroupButton id="budget-menu" open={budgetOpen} onClick={() => setBudgetOpen((v) => !v)} icon={<Wallet size={18} />}>{t("nav.budget")}</GroupButton>
            <div id="budget-menu" hidden={!budgetOpen}>
              <ul className="secondary-submenu">{budgetNav.map((item) => {
                const active = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
                return <li key={item.href}><Link href={item.href} onClick={onNavigate} aria-current={active ? "page" : undefined} className={`secondary-link${active ? " is-active" : ""}`}><span>{t(item.labelKey)}</span>{item.href === "/budget/signatures" ? <span className="nav-count num">{signTasks.length}</span> : null}</Link></li>;
              })}</ul>
            </div>
          </div>
          <Link href="/execution" onClick={onNavigate} aria-current={pathname === "/execution" ? "page" : undefined} className={`secondary-group-link${pathname === "/execution" ? " is-active" : ""}`}><Workflow size={18} /><span>{t("nav.execution")}</span><Clock3 size={14} className="nav-trailing" aria-label="En développement" /></Link>
        </div>
      </div>
    </nav>
    <div className="secondary-footer"><span className="demo-dot" />Environnement de démonstration</div>
  </div>;
}
function GroupButton({ id, open, onClick, icon, children }: { id: string; open: boolean; onClick: () => void; icon: ReactNode; children: ReactNode }) {
  return <button type="button" className="secondary-group-button" aria-expanded={open} aria-controls={id} onClick={onClick}>{icon}<span>{children}</span><ChevronDown size={17} className={`nav-chevron${open ? " is-open" : ""}`} /></button>;
}
