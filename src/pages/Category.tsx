import { useState, useEffect } from 'react';
import { Check } from 'lucide-react';
import { faker } from '@faker-js/faker';
import toast from 'react-hot-toast';

// Custom hook for managing categories with persistence
const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load categories from localStorage on mount
  useEffect(() => {
    const loadCategories = () => {
      const savedCategories = localStorage.getItem('categories');
      if (savedCategories) {
        setCategories(JSON.parse(savedCategories));
      } else {
        // Generate initial categories if none exist
        const initialCategories = Array.from({ length: 100 }, () => ({
          id: faker.string.uuid(),
          name: faker.commerce.department(),
          isSelected: false
        }));
        setCategories(initialCategories);
        localStorage.setItem('categories', JSON.stringify(initialCategories));
      }
      setIsLoading(false);
    };

    loadCategories();
  }, []);

  // Save categories to localStorage whenever they change
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('categories', JSON.stringify(categories));
    }
  }, [categories, isLoading]);

  const toggleCategory = (categoryId) => {
    setCategories(prevCategories =>
      prevCategories.map(category =>
        category.id === categoryId
          ? { ...category, isSelected: !category.isSelected }
          : category
      )
    );
  };

  const getSelectedCategories = () => {
    return categories.filter(category => category.isSelected);
  };

  return {
    categories,
    toggleCategory,
    getSelectedCategories,
    isLoading
  };
};

const Category = () => {
  const { categories, toggleCategory, getSelectedCategories, isLoading } = useCategories();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Handle category selection with toast notification
  const handleCategoryClick = (categoryId) => {
    toggleCategory(categoryId);
    const category = categories.find(c => c.id === categoryId);
    if (category) {
      toast.success(
        category.isSelected
          ? `Removed ${category.name} from interests`
          : `Added ${category.name} to interests`,
        {
          duration: 2000,
          position: 'bottom-center',
          style: {
            background: '#333',
            color: '#fff',
            borderRadius: '10px',
          },
        }
      );
    }
  };

  // Calculate pagination values
  const totalPages = Math.ceil(categories.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCategories = categories.slice(startIndex, endIndex);

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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

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

        <div className="flex justify-between items-center mb-6">
          <div className="text-xl font-medium">
            My saved interests!
          </div>
          <div className="text-sm text-gray-500">
            {getSelectedCategories().length} selected
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {currentCategories.map((category) => (
            <div
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className="flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-50 rounded-lg transition-colors duration-200"
            >
              <div
                className={`w-6 h-6 rounded flex items-center justify-center transition-colors duration-200 ${category.isSelected ? 'bg-black' : 'bg-stone-300'
                  }`}
              >
                {category.isSelected && <Check className="w-4 h-4 text-white" />}
              </div>
              <span className="text-base">{category.name}</span>
            </div>
          ))}
        </div>

        {/* Selected Categories Summary */}
        {getSelectedCategories().length > 0 && (
          <div className="mb-8 p-4 bg-gray-50 rounded-lg">
            <div className="font-medium mb-2">Selected Categories:</div>
            <div className="flex flex-wrap gap-2">
              {getSelectedCategories().map(category => (
                <span
                  key={category.id}
                  className="px-3 py-1 bg-black text-white text-sm rounded-full"
                >
                  {category.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-center items-center gap-2 mt-8">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-2 py-1 disabled:opacity-50 transition-opacity"
          >
            &lt;
          </button>

          {getPaginationArray().map((page, index) => (
            <button
              key={index}
              onClick={() => typeof page === 'number' && setCurrentPage(page)}
              className={`px-3 py-1 rounded transition-colors duration-200 ${currentPage === page
                  ? 'bg-black text-white'
                  : 'text-neutral-400 hover:bg-gray-100'
                }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-2 py-1 disabled:opacity-50 transition-opacity"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Category;