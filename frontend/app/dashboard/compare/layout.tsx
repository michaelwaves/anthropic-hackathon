import CountrySelector from "@/components/navigation/CountrySelector";

function CompareLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <CountrySelector />
            {children}
        </div>
    );
}

export default CompareLayout;