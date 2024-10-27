import { useState, useEffect } from 'react';
import { Check } from 'lucide-react';
import { faker } from '@faker-js/faker';

// Type definitions
interface Category {
  id: string;
  name: string;
  isSelected: boolean;
}

const Category = () => {
  // State management
  const [categories, setCategories] = useState<Category[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const itemsPerPage = 6;

  // Generate fake categories using faker
  useEffect(() => {
    const generateCategories = () => {
      const fakeCategories: Category[] = Array.from({ length: 100 }, () => ({
        id: faker.string.uuid(),
        name: faker.commerce.department(),
        isSelected: false
      }));
      setCategories(fakeCategories);
    };
    generateCategories();
  }, []);

  // Calculate pagination values
  const totalPages = Math.ceil(categories.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCategories = categories.slice(startIndex, endIndex);

  // Handle category selection
  const toggleCategory = (categoryId: string) => {
    setCategories(prevCategories =>
      prevCategories.map(category =>
        category.id === categoryId
          ? { ...category, isSelected: !category.isSelected }
          : category
      )
    );

    setSelectedCategories(prevSelected => {
      const category = categories.find(c => c.id === categoryId);
      if (!category) return prevSelected;

      return category.isSelected
        ? prevSelected.filter(c => c.id !== categoryId)
        : [...prevSelected, { ...category, isSelected: true }];
    });
  };

  // Generate pagination array
  const getPaginationArray = () => {
    const delta = 2;
    const range = [];
    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      range.unshift('...');
    }
    if (currentPage + delta < totalPages - 1) {
      range.push('...');
    }

    range.unshift(1);
    if (totalPages !== 1) range.push(totalPages);

    return range;
  };

  return (
    <div className="flex flex-col max-w-4xl mx-auto p-8">
      <div className="bg-white rounded-3xl border border-stone-300 p-8">
        <div className="text-3xl font-semibold text-center mb-6">
          Please mark your interests!
        </div>
        <div className="text-center mb-6">
          We will keep you notified.
        </div>

        <div className="h-px bg-gray-200 mb-6" />

        <div className="text-xl font-medium mb-6">
          My saved interests!
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {currentCategories.map((category) => (
            <div
              key={category.id}
              onClick={() => toggleCategory(category.id)}
              className="flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-50 rounded-lg"
            >
              <div className={`w-6 h-6 rounded flex items-center justify-center ${category.isSelected ? 'bg-black' : 'bg-stone-300'
                }`}>
                {category.isSelected && <Check className="w-4 h-4 text-white" />}
              </div>
              <span className="text-base">{category.name}</span>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-2 mt-8">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-2 py-1 disabled:opacity-50"
          >
            &lt;
          </button>

          {getPaginationArray().map((page, index) => (
            <button
              key={index}
              onClick={() => typeof page === 'number' && setCurrentPage(page)}
              className={`px-3 py-1 rounded ${currentPage === page
                  ? 'bg-black text-white'
                  : 'text-neutral-400'
                }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-2 py-1 disabled:opacity-50"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Category;