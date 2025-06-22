"use client"

import { useState } from "react"

function ExperimentButton({ group1, group2, amount1, amount2, filledScenario }: any) {
    const [loading, setLoading] = useState(false)
    const messages1 = [
        {
            "role": "user",
            "content": filledScenario
        },
        {
            "role": "assistant",
            "content": `${amount1} ${group1}`
        }
    ]
    const messages2 = [
        {
            "role": "user",
            "content": filledScenario
        },
        {
            "role": "assistant",
            "content": `${amount2} ${group2}`
        }
    ]
    const handleSubmit = async () => {
        const p1 = await fetch

    }
    return (
        <div className="w-full flex flex-col gap-2">
            <div className="flex justify-center">
                <button
                    onClick={handleSubmit}
                    disabled={!group1 || !group2}
                    className="px-6 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    View Data
                </button>
            </div>


        </div>
    );
}

export default ExperimentButton;