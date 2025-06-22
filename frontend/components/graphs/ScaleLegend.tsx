function ScaleLegend({ data, group1, group2 }: { data: any[], group1: string, group2: string }) {
    return (

        <div className="mt-4 bg-white rounded-t-lg shadow-lg p-4">
            <h3 className="text-lg font-semibold mb-3">Preference Difference Scale</h3>
            <div className="relative">
                {/* Continuous color bar */}
                <div
                    className="h-6 w-full rounded"
                    style={{
                        background: 'linear-gradient(to right, rgb(255,50,50), rgb(128,50,128), rgb(50,50,255))'
                    }}
                ></div>

                {/* Scale labels */}
                <div className="flex justify-between mt-2 text-sm">
                    <span className="text-red-600 font-medium">
                        {Math.min(...data.map(d => d.preference_diff)).toFixed(3)}
                    </span>
                    <span className="text-gray-600">0.000</span>
                    <span className="text-blue-600 font-medium">
                        {Math.max(...data.map(d => d.preference_diff)).toFixed(3)}
                    </span>
                </div>

                {/* Description */}
                <div className="flex justify-between mt-1 text-xs text-gray-500">
                    <span>Favors {group1}</span>
                    <span>Neutral</span>
                    <span>Favors {group2}</span>
                </div>
            </div>
        </div>


    );
}

export default ScaleLegend;