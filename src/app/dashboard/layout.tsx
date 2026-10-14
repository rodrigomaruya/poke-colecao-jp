import { Sidebar } from "./components/sidebar";
import { MobileSidebar } from "./components/mobile-sidebar";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto flex min-h-screen w-full max-w-[1920] flex-col lg:flex-row">
        <Sidebar />
        <MobileSidebar />

        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
