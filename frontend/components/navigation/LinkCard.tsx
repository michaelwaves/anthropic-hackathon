import Link from "next/link";

function LinkCard({ href, text, icon }: { href: string, text: string, icon: React.ReactNode }) {
    return (
        <Link
            href={href}
            className="
            hover:bg-blue-100 hover:border-primary
            md:flex-col md:items-center
            inline-flex flex-row items-center justify center p-4 gap-4 border-gray-300 border-[1px] rounded-md">
            <div className="text-primary">{icon}</div>
            <span>{text}</span>
        </Link>
    );
}

export default LinkCard;