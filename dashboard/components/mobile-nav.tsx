"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays, Home, MoreHorizontal, PenLine, Wallet } from "lucide-react";
import { useApp } from "@/components/providers";
import { signTasks } from "@/lib/mock-data";

const items = [
  { href: "/dashboard", labelKey: "mobile.home", icon: Home },
  { href: "/budget/budgets", labelKey: "mobile.budgets", icon: Wallet },
  { href: "/budget/signatures", labelKey: "mobile.sign", icon: PenLine, badge: true },
  { href: "/budget/exercices", labelKey: "mobile.agenda", icon: CalendarDays },
];

export function MobileNav({ onMore, expanded }: { onMore: () => void; expanded: boolean }) {
  const { t } = useApp();
  const pathname = usePathname();

  return (
    <nav
      className="mobile-bottom-nav flex items-stretch border-t"
      style={{
        background: "var(--panel)",
        borderColor: "var(--line)",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      {items.map((item) => {
        const Icon = item.icon;
        const active =
          pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className="relative flex flex-1 flex-col items-center justify-center gap-0.5 pb-1.5 pt-2"
            style={{ minHeight: 56, color: active ? "var(--ink)" : "var(--slate)" }}
          >
            <span
              className="absolute inset-x-5 top-0 h-[2px] rounded-b"
              style={{ background: active ? "var(--ink)" : "transparent" }}
            />
            <Icon size={19} />
            <span className="text-[10.5px] font-medium">{t(item.labelKey)}</span>
            {item.badge && signTasks.length > 0 ? (
              <span
                className="num absolute right-[24%] top-1.5 rounded-full px-1.5 text-[10px] font-semibold"
                style={{ background: "var(--accent)", color: "var(--on-accent)" }}
              >
                {signTasks.length}
              </span>
            ) : null}
          </Link>
        );
      })}
      <button
        onClick={onMore}
        aria-label="Ouvrir la navigation Finance"
        aria-controls="secondary-navigation"
        aria-expanded={expanded}
        className="flex flex-1 flex-col items-center justify-center gap-0.5 pb-1.5 pt-2"
        style={{ minHeight: 56, color: "var(--slate)" }}
      >
        <MoreHorizontal size={19} />
        <span className="text-[10.5px] font-medium">{t("mobile.more")}</span>
      </button>
    </nav>
  );
}
