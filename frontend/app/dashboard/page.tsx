export default function HomePage() {
    const data = [
        {
            "name": "bob",
            "age": 3
        }
    ]
    return (
        <ul className="w-full max-w-4xl text-2xl font-bold my-list">
            {data.map((d) => <li>My name is {d.name} and my age is {d.age}</li>)}
        </ul>

    )
}