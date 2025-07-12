import RankingGraph from "@/components/graphs/RankingGraph";
import LinkCard from "@/components/navigation/LinkCard";
import { fetchRankings } from "@/lib/actions";
import { Briefcase, TrainTrack, Vote } from "lucide-react";

async function SummarizePage({ searchParams }: { searchParams: Promise<{ scenario: string }> }) {
    const { scenario } = await searchParams
    const data = await fetchRankings(scenario)
    console.log(data)
    const scenarioLinkData = [

        {
            href: '/dashboard/summarize?scenario=trolley',
            text: "Trolley Problem",
            icon: <TrainTrack className="text-sky-500" />,
        },
        {
            href: '/dashboard/summarize?scenario=voting',
            text: "Voting",
            icon: <Vote className="text-sky-500" />,
        },
        {
            href: '/dashboard/summarize?scenario=hiring',
            text: "Hiring",
            icon: <Briefcase className="text-sky-500" />,
        },
    ]

    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                {scenarioLinkData.map((d) => (
                    <LinkCard key={d.text} {...d} />
                ))}
            </div>
            <RankingGraph data={data} />
        </div>

    );
}

export default SummarizePage;