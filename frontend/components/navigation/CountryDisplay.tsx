import Image from "next/image";
import { countries } from "@/lib/data/countries";
function CountryDisplay({ country1, country2 }: { country1: string, country2: string }) {
    return (
        <>{country1 && country2 && (
            <div className="mt-6 p-6 bg-blue-50 rounded-xl border border-blue-300 shadow-md">
                <h3 className="text-lg font-semibold text-blue-900 text-center mb-4">Current Selection</h3>
                <div className="flex items-start justify-center space-x-10">
                    {/* Country 1 */}
                    <div className="flex flex-col items-center text-blue-800">
                        <Image
                            src={`/flags/${country1}.svg`}
                            alt={country1}
                            width={96}
                            height={64}
                            className="rounded shadow-sm border border-blue-200"
                        />
                        <span className="mt-2 font-semibold text-center">
                            <span className="block text-sm font-mono text-gray-600">
                                {countries.find(c => c.value === country1)?.code}
                            </span>
                            {countries.find(c => c.value === country1)?.label}
                        </span>
                    </div>

                    {/* VS Text */}
                    <div className="flex items-center justify-center text-red-600 font-bold text-2xl">VS</div>

                    {/* Country 2 */}
                    <div className="flex flex-col items-center text-blue-800">
                        <Image
                            src={`/flags/${country2}.svg`}
                            alt={country2}
                            width={96}
                            height={64}
                            className="rounded shadow-sm border border-blue-200"
                        />
                        <span className="mt-2 font-semibold text-center">
                            <span className="block text-sm font-mono text-gray-600">
                                {countries.find(c => c.value === country2)?.code}
                            </span>
                            {countries.find(c => c.value === country2)?.label}
                        </span>
                    </div>
                </div>
            </div>
        )}
        </>

    );
}

export default CountryDisplay;