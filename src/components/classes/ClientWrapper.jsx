"use client";

import { useState } from "react";
import ClassFilterSearch from "./ClassFilter";
import Card from "./Card";

export default function ClassesClientWrapper({ initialClasses = [] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  // Handle case where initialClasses might be wrapped in an object like { classes: [...] }
  const classList = Array.isArray(initialClasses)
    ? initialClasses
    : initialClasses?.classes || initialClasses?.data || [];

  const filteredClasses = classList.filter((cls) => {
    // Fallback keys for title and category
    const title = cls.title || cls.className || cls.name || "";
    const category = cls.category || cls.classCategory || cls.type || "";

    const matchesSearch = title
      .toLowerCase()
      .includes(searchTerm.toLowerCase().trim());

    const matchesCategory =
      selectedCategory === "ALL" ||
      category.toUpperCase().trim() === selectedCategory.toUpperCase().trim();

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8 bg-[#0a0604] border-t border-white/5 ">
      <div className="container mx-auto pt-10 pb-16 px-6">
        {/* Filter and Search Bar */}
        <ClassFilterSearch
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          totalClasses={filteredClasses.length}
        />

        {/* Class Cards Grid */}
        {filteredClasses.length > 0 ? (
          <Card allclass={filteredClasses} />
        ) : (
          <div className="bg-[#120c09] border border-white/5 rounded-2xl p-12 text-center max-w-xl mx-auto space-y-2">
            <p className="text-sm text-gray-300 font-bold uppercase tracking-wider">
              No classes found
            </p>
            <p className="text-xs text-gray-500">
              Try adjusting your search query or selecting a different category
              filter.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
