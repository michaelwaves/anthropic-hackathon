import CountryGraph from "@/components/graphs/CountryGraph";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

async function ComparePage({ searchParams }: { searchParams: SearchParams }) {
    const { group1, group2 } = await searchParams
    const data = fetchDataFor(group1, group2)
    return (
        <CountryGraph data={data} />
    );
}

export default ComparePage;