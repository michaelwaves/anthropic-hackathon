import CountryGraph from "@/components/graphs/CountryGraph";
import { fetchComparisons } from "@/lib/actions";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

async function ComparePage({ searchParams }: { searchParams: SearchParams }) {
    const { group1, group2 } = await searchParams
    const data = await fetchComparisons(String(group1 ?? "americans"), String(group2 ?? "nigerians"))
    return (
        <CountryGraph data={data} />
    );
}

export default ComparePage;