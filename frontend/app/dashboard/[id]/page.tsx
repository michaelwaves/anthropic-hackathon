import Link from "next/link";


function DynamicPage({ params }: { params: { id: string } }) {
    const { id } = params
    return (
        <div>
            This is route with id: {id}
        </div>
    );
}


export default DynamicPage;