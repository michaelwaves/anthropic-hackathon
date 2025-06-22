import LinkCard from "@/components/navigation/LinkCard";
import { ChartScatter, Code, ScrollText } from "lucide-react";

export default function Home() {
    const linkData = [
        {
            href: '/dashboard/compare',
            text: "Explore Data",
            icon: <ChartScatter className="text-sky-500" />,
        },
        {
            href: 'https://docs.google.com/presentation/d/136Y0ou-vD12r27OHY5jbibnYMVNlHzfBMClIciaKL_8',
            text: "View Paper",
            icon: <ScrollText className="text-sky-500" />,
        },
        {
            href: 'https://github.com/michaelwaves/anthropic-hackathon',
            text: "Code",
            icon: <Code className="text-sky-500" />,
        },
    ];

    return (
        <main className="min-h-screen bg-sky-50 py-12 px-6 sm:px-12 lg:px-24">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl sm:text-4xl font-bold text-sky-700 mb-6 leading-tight">
                    Is My Preference Model <span className="text-red-500">Racist?</span>{" "}
                    <span className="block text-sky-500">
                        Investigating Utility Functions In Frontier Preference Models
                    </span>
                </h1>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    {linkData.map((d) => (
                        <LinkCard key={d.text} {...d} />
                    ))}
                </div>

                <section>
                    <h2 className="text-2xl font-semibold text-sky-600 mb-2">Abstract</h2>
                    <p className="text-sky-900 leading-relaxed text-lg bg-white p-6 rounded-xl shadow">
                        Preference models—also known as reward models—play a central role in RLHF and the training of frontier AI systems by translating human feedback into a learned utility function that guides model behavior. No humans are perfectly unbiased and neither are these models. We investigate potential nationality-based biases in large language models' moral and utilitarian preferences, focusing specifically on a preference-ranking model used for alignment tuning. We designed a series of controlled ethical scenarios inspired by classical "trolley problems," involving hypothetical tradeoffs across three domains: lives saved, job automation, and hiring decisions. Our findings reveal several biases, particularly toward Nigerians. We further observed that the model’s decisions lack monotonic consistency; it sometimes favored saving fewer lives or automating fewer jobs based on seemingly arbitrary numeric thresholds, implying the influence of non-utilitarian heuristics. These findings raise important questions about fairness, representation, and unintended bias in AI preference modeling, with implications for alignment safety and global equity in human-AI interaction.
                    </p>
                </section>
            </div>
        </main>
    );
}

