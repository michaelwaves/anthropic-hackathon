"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LogOut } from "lucide-react";

type NavItem = {
    href: string;
    text: string;
    icon: React.ReactNode;
};

type SidebarProps = {
    items: NavItem[];
};

export default function Sidebar({ items }: SidebarProps) {
    const [collapsed, setCollapsed] = useState(false);
    const router = useRouter();

    const handleLogout = async () => {
        await fetch("/api/logout", { method: "POST" });
        router.push("/login");
    };

    return (
        <div
            className={`h-screen bg-white border-r border-gray-200 shadow-sm transition-all duration-300
        ${collapsed ? "w-16" : "w-48"} flex flex-col items-center py-4`}
        >
            {/* Toggle Collapse */}
            <button
                className="mb-6 text-gray-500 hover:text-sky-500"
                onClick={() => setCollapsed(!collapsed)}
                aria-label="Toggle sidebar"
            >
                {collapsed ? "»" : "«"}
            </button>

            {/* Nav Items */}
            <nav className="flex-1 w-full space-y-2">
                {items.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-sky-100 transition rounded-md"
                    >
                        <span className="text-sky-500">{item.icon}</span>
                        {!collapsed && <span className="text-sm font-medium">{item.text}</span>}
                    </Link>
                ))}
            </nav>

            {/* Logout Button */}
            <button
                onClick={handleLogout}
                className="mt-auto mb-2 flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-red-100 text-sm font-medium transition rounded-md"
            >
                <LogOut className="text-red-500" size={18} />
                {!collapsed && <span>Logout</span>}
            </button>
        </div>
    );
}
