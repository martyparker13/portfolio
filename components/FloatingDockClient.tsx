"use client";

import { useClerk, useUser } from "@clerk/nextjs";
import { IconLogout, IconMenu2, IconX } from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";
import { DynamicIcon } from "./DynamicIcon";
import { useSidebar } from "./ui/sidebar";

interface NavItem {
  title?: string | null;
  href?: string | null;
  icon?: string | null;
  isExternal?: boolean | null;
}

interface FloatingDockClientProps {
  navItems: NavItem[];
}

interface DockLink {
  title: string;
  href?: string;
  icon: React.ReactNode;
  isExternal?: boolean | null;
  onClick?: () => void;
}

export function FloatingDockClient({ navItems }: FloatingDockClientProps) {
  const { isSignedIn } = useUser();
  const { signOut } = useClerk();
  const { open, isMobile, openMobile } = useSidebar();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isSidebarOpen = isMobile ? openMobile : open;

  const links: DockLink[] = [
    ...navItems.map((item) => ({
      title: item.title || "",
      href: item.href || "#",
      icon: <DynamicIcon iconName={item.icon || "IconHome"} />,
      isExternal: item.isExternal,
    })),
    ...(isSignedIn && !isSidebarOpen
      ? [
          {
            title: "Sign Out",
            icon: <IconLogout className="h-full w-full" />,
            onClick: () => signOut(),
          },
        ]
      : []),
  ];

  return (
    <>
      {/* Desktop: single flat row — all nav icons including Contact */}
      <div
        className={`hidden md:block fixed z-30 transition-all duration-300 pointer-events-none ${
          isSidebarOpen
            ? "bottom-0 left-[calc(50%-var(--sidebar-width)/2)] -translate-x-1/2 pb-3"
            : "bottom-4 md:left-4 md:translate-x-0 lg:left-1/2 lg:-translate-x-1/2"
        }`}
      >
        <div className="flex items-end gap-1 px-2 py-2 pb-2.5 rounded-xl md:rounded-2xl bg-white/20 dark:bg-black/30 hover:bg-white/30 dark:hover:bg-black/40 backdrop-blur-xl border border-white/30 dark:border-white/20 hover:border-white/40 dark:hover:border-white/30 shadow-[0_8px_32px_0_rgba(0,0,0,0.15)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] pointer-events-auto transition-colors duration-300 overflow-x-hidden overflow-y-visible">
          {links.map((item) => (
            <DockIcon
              key={`${item.title}-${item.href ?? "action"}`}
              item={item}
              isVertical={false}
            />
          ))}
        </div>
      </div>

      {/* Mobile: hamburger lists every nav item (no nested “more” menu) */}
      <div className="md:hidden fixed top-4 right-4 z-30">
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="w-12 h-12 rounded-full bg-white/20 dark:bg-black/30 hover:bg-white/30 dark:hover:bg-black/40 backdrop-blur-xl border border-white/30 dark:border-white/20 hover:border-white/40 dark:hover:border-white/30 shadow-[0_8px_32px_0_rgba(0,0,0,0.15)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] flex items-center justify-center text-neutral-500 dark:text-neutral-300 hover:text-neutral-600 dark:hover:text-neutral-200 transition-all duration-300"
          aria-expanded={mobileMenuOpen}
          aria-label={
            mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"
          }
        >
          {mobileMenuOpen ? (
            <IconX className="w-6 h-6" />
          ) : (
            <IconMenu2 className="w-6 h-6" />
          )}
        </button>

        {mobileMenuOpen && (
          <div className="absolute top-14 right-0 z-[100] flex flex-col gap-2 p-3 rounded-xl bg-white/90 dark:bg-black/90 backdrop-blur-xl border border-white/40 dark:border-white/30 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.6)] animate-in slide-in-from-top-2 duration-200 max-h-[min(70vh,28rem)] overflow-y-auto">
            {links.map((item) => (
              <DockIcon
                key={`${item.title}-${item.href ?? "action"}-mobile`}
                item={item}
                isVertical={true}
                onItemClick={() => setMobileMenuOpen(false)}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

function DockIcon({
  item,
  isVertical,
  onItemClick,
}: {
  item: DockLink;
  isVertical: boolean;
  onItemClick?: () => void;
}) {
  const baseIconClasses =
    "relative flex items-center justify-center w-full h-full rounded-full backdrop-blur-md transition-all";
  const verticalIconClasses = `${baseIconClasses} bg-white/40 dark:bg-white/20 border border-white/50 dark:border-white/30 duration-300 group-hover:bg-white/50 dark:group-hover:bg-white/30 group-hover:border-white/70 dark:group-hover:border-white/40`;
  const horizontalIconClasses = `${baseIconClasses} bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 duration-300 group-hover:bg-white/50 dark:group-hover:bg-white/30 group-hover:border-white/70 dark:group-hover:border-white/40 group-hover:shadow-[0_12px_40px_-12px_rgba(0,0,0,0.35)]`;

  const Tooltip = ({ direction }: { direction: "vertical" | "horizontal" }) => {
    const isHorizontal = direction === "horizontal";
    return (
      <div
        className={`absolute px-3 py-1.5 ${isHorizontal ? "rounded-xl" : "rounded-lg"} bg-white/90 dark:bg-black/90 backdrop-blur-xl border border-white/40 dark:border-white/20 ${isHorizontal ? "text-xs md:text-sm" : "text-sm"} font-medium text-neutral-800 dark:text-neutral-200 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-[0_8px_32px_0_rgba(0,0,0,0.2)] ${
          isHorizontal
            ? "bottom-full left-1/2 mb-2 -translate-x-1/2"
            : "right-14 top-1/2 -translate-y-1/2"
        }`}
      >
        {item.title}
        <div
          className={`absolute w-2 h-2 rotate-45 bg-white/90 dark:bg-black/90 ${
            isHorizontal
              ? "-bottom-1 left-1/2 -translate-x-1/2 border-r border-b"
              : "-right-1 top-1/2 -translate-y-1/2 border-r border-t"
          } border-white/40 dark:border-white/20`}
        />
      </div>
    );
  };

  const handleClick = (e?: React.MouseEvent) => {
    if (item.onClick) {
      e?.preventDefault();
      item.onClick();
    }
    onItemClick?.();
  };

  const content = (
    <>
      <div className={isVertical ? verticalIconClasses : horizontalIconClasses}>
        <div
          className={`w-6 h-6 md:w-6 md:h-6 ${
            isVertical
              ? "text-neutral-500 dark:text-neutral-300"
              : "text-neutral-400/70 dark:text-neutral-300/70 group-hover:text-neutral-600 dark:group-hover:text-neutral-200 transition-colors duration-300"
          }`}
        >
          {item.icon}
        </div>
      </div>
      <Tooltip direction={isVertical ? "vertical" : "horizontal"} />
    </>
  );

  const wrapperClasses = isVertical
    ? "group relative flex shrink-0 items-center justify-center w-12 h-12 transition-transform duration-300 ease-out hover:scale-105 motion-reduce:transition-none motion-reduce:hover:scale-100"
    : "group relative flex shrink-0 items-center justify-center w-11 h-11 lg:w-12 lg:h-12 origin-bottom transition-transform duration-300 ease-out hover:-translate-y-1.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0";

  return item.onClick ? (
    <button type="button" onClick={handleClick} className={wrapperClasses}>
      {content}
    </button>
  ) : (
    <Link
      href={item.href || "#"}
      target={item.isExternal ? "_blank" : undefined}
      rel={item.isExternal ? "noopener noreferrer" : undefined}
      className={wrapperClasses}
      scroll={!item.isExternal}
      onClick={onItemClick}
      aria-label={item.title}
    >
      {content}
    </Link>
  );
}
