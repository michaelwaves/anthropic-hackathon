import { LayoutDashboard, ScatterChart, TestTube } from "lucide-react";
import Sidebar from "@/components/navigation/Sidebar";

const navItems = [
    { href: "/dashboard", text: "Dashboard", icon: <LayoutDashboard size={20} /> },
    { href: "/dashboard/compare", text: "Data", icon: <ScatterChart size={20} /> },
    { href: "/dashboard/experiment", text: "Experiment", icon: <TestTube size={20} /> },
];

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex">
            <Sidebar items={navItems} />
            <main className="flex-1 p-6 h-screen overflow-y-scroll">{children}</main>
        </div>
    );
}
