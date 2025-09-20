'use client';

import { useState } from "react";

export default function AutoPartsSearch() {
    const [query, setQuery] = useState("");
    const [filteredParts, setFilteredParts] = useState<any[]>([]);
    const [showDropdown, setShowDropdown] = useState(false);

    const filteredProducts = async (keyword: string): Promise<any[]> => {
        try {
            const res = await fetch(
                `https://admin.mortorelite.com/api/products/?in_stock=true&page=1&search=${keyword}`,
            );

            const data = await res.json();
            const results = Object.values(data.results);
            console.log(results);
            setFilteredParts(results);
            setShowDropdown(results.length > 0);
            return [];
        } catch (err) {
            console.error("Error fetching products:", err);
            return [];
        }
    };

    const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);

        if (value.trim() === "") {
            setFilteredParts([]);
            setShowDropdown(false);
            return;
        }

        await filteredProducts(value);
    };

    const handleSelect = (part: any) => {
        setQuery(part.name);
        setShowDropdown(false);
        window.location.href = process.env.NEXT_PUBLIC_HOMEPAGE + `parts/${part.slug}`;
    };

    return (
        <div className="relative w-full max-w-md">
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="ri-search-line text-gray-400 text-base"></i>
                </div>
                <input
                    type="text"
                    value={query}
                    onChange={handleInputChange}
                    placeholder="Search auto parts..."
                    className="w-full pl-9 pr-4 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
            </div>

            {showDropdown && (
                <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                    {filteredParts.map((part, index) => (
                        <li
                            key={index}
                            onClick={() => handleSelect(part)}
                            className="flex items-center gap-3 px-4 py-2 hover:bg-blue-50 cursor-pointer text-sm border-b last:border-none"
                        >
                            {/* Thumbnail */}
                            <img
                                src={part.primary_image.image || "https://png.pngtree.com/png-vector/20221125/ourmid/pngtree-no-image-available-icon-flatvector-illustration-blank-avatar-modern-vector-png-image_40962406.jpg"}
                                alt={part.primary_image.alt_text}
                                className="w-8 h-8 rounded-md object-cover"
                            />

                            <div className="flex flex-col">
                                {/* Part name */}
                                <span className="font-medium text-gray-800">{part.name}</span>
                                {/* Category */}
                                <span className="text-xs text-gray-500">{part.category.name}</span>
                                {/* Brand */}
                                <span className="text-xs text-gray-300">{part.brand.name}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
