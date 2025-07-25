import { BottomNav } from "@/components/layout/bottom-nav";
import { Sidebar, SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/sidebar";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar>
          <AppSidebar />
        </Sidebar>
        <main className="flex-1 flex flex-col pb-20 md:pb-0">
          {children}
        </main>
        <BottomNav />
      </div>
    </SidebarProvider>
  );
}
