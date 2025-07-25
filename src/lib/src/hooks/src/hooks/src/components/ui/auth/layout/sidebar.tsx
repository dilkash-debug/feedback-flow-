
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Vote, PlusSquare, MessageSquare, MessageCircle, User, LogOut, Settings } from 'lucide-react';
import { SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter, useSidebar } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '../auth-provider';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';

const navItems = [
  { href: '/feed', icon: Home, label: 'Feed' },
  { href: '/vote', icon: Vote, label: 'Vote' },
  { href: '/feedback', icon: PlusSquare, label: 'Post' },
  { href: '/company-feedback', icon: MessageSquare, label: 'Feedback' },
  { href: '/chat', icon: MessageCircle, label: 'Chat' },
];

export function AppSidebar() {
    const pathname = usePathname();
    const { state } = useSidebar();
    const { user } = useAuth();
    const router = useRouter();

    const handleSignOut = async () => {
        if(!auth) return;
        await signOut(auth);
        router.push('/');
    }

    return (
        <>
            <SidebarHeader>
                <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="h-8 w-8 text-primary">
                        <rect width="256" height="256" fill="none"></rect>
                        <path d="M56,120a8,8,0,0,1,8-8h8a8,8,0,0,1,0,16H64A8,8,0,0,1,56,120Zm48,8a8,8,0,0,0,8-8h56a8,8,0,0,0,0-16H112a8,8,0,0,0,0,16Zm-2.5-45.1,64-24a8,8,0,0,1,9,9l-24,64a8,8,0,0,1-15-5.6l10-26.8-26.8,10a8,8,0,0,1-10-1.5L83,86.5a8,8,0,0,1-1.5-10l10-26.8-26.8,10a8,8,0,0,1-9.9-9.9Z"></path>
                        <path d="M216,40H40a16,16,0,0,0-16,16V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40ZM40,56H216V200H40Z"></path>
                    </svg>
                    <span className="text-xl font-headline group-data-[collapsible=icon]:hidden">Feedback Flow</span>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarMenu>
                    {navItems.map((item) => {
                        const isActive = pathname === item.href || (item.href !== '/feed' && pathname.startsWith(item.href));
                        return (
                            <SidebarMenuItem key={item.href}>
                                <Link href={item.href}>
                                    <SidebarMenuButton isActive={isActive} tooltip={item.label}>
                                        <item.icon />
                                        <span>{item.label}</span>
                                    </SidebarMenuButton>
                                </Link>
                            </SidebarMenuItem>
                        );
                    })}
                </SidebarMenu>
            </SidebarContent>
            <SidebarFooter>
                 <SidebarMenu>
                     <SidebarMenuItem>
                         <Link href="/profile">
                             <SidebarMenuButton isActive={pathname.startsWith('/profile')} tooltip="Profile">
                                 <Avatar className="w-6 h-6">
                                     <AvatarImage src={user?.photoURL || "https://placehold.co/100x100.png"} data-ai-hint="man portrait"/>
                                     <AvatarFallback>{user?.displayName?.charAt(0) || 'U'}</AvatarFallback>
                                 </Avatar>
                                 <span className="truncate">{user?.displayName || 'Profile'}</span>
                             </SidebarMenuButton>
                         </Link>
                     </SidebarMenuItem>
                      <SidebarMenuItem>
                         <SidebarMenuButton onClick={handleSignOut} tooltip="Sign Out">
                             <LogOut />
                             <span>Sign Out</span>
                         </SidebarMenuButton>
                     </SidebarMenuItem>
                 </SidebarMenu>
            </SidebarFooter>
        </>
    );
}
