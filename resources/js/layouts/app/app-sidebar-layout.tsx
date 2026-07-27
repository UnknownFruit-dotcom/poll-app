import Navbar from '@/components/navbar';
import Sidebar from '@/components/sidebar';
import type { AppLayoutProps } from '@/types';

export default function AppSidebarLayout({
    children,
}: AppLayoutProps) {
    return (
        <div className="flex min-h-screen w-full">
            <Sidebar />
            <div className="flex flex-1 flex-col overflow-x-hidden">
                <Navbar />
                <main className="flex-1">{children}</main>
            </div>
        </div>
    );
}
