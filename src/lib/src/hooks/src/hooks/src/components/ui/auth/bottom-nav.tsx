
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Home, Vote, PlusSquare, MessageSquare, MessageCircle, User } from 'lucide-react';

const navItems = [
  { href: '/feed', icon: Home, label: 'Feed' },
  { href: '/vote', icon: Vote, label: 'Vote' },
  { href: '/feedback', icon: PlusSquare, label: 'Post' },
  { href: '/company-feedback', icon: MessageSquare, label: 'Feedback' },
  { href: '/chat', icon: MessageCircle, label: 'Chat' },
  { href: '/profile', icon: User, label: 'Profile' },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-20 bg-background/80 backdrop-blur-xl border-t border-white/10 md:hidden z-50">
      <div className="grid h-full max-w-lg grid-cols-6 mx-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/feed' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className="inline-flex flex-col items-center justify-center px-5 hover:bg-muted/50 group transition-colors"
              aria-current={isActive ? 'page' : undefined}
            >
              <div className="relative">
                <item.icon
                  className={cn(
                    'w-6 h-6 mb-1 text-muted-foreground group-hover:text-primary transition-colors',
                    isActive && 'text-primary'
                  )}
                />
                {isActive && (
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-full shadow-glow-primary" />
                )}
              </div>
              <span
                className={cn(
                  'text-xs text-muted-foreground group-hover:text-primary transition-colors',
                  isActive && 'text-primary'
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
