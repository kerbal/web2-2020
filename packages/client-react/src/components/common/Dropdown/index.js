import React, { useState } from 'react';

const Dropdown = props => {
  const { selectedItem, setSelectedItem, data, placeholder } = props;
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSelectListDropdown = () => {
    setIsExpanded(prevState => !prevState);
  };

  const renderData = () => {
    return data.map(item => {
      return (
        <div
          key={item}
          className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900 cursor-default"
          onClick={() => {
            setSelectedItem(item);
            toggleSelectListDropdown();
          }}
        >
          {item}
        </div>
      );
    });
  };
  return (
    <div className="relative inline-block text-left w-full" style={{ width: '300px' }}>
      <div>
        <span className="rounded-md shadow-sm">
          <button
            type="button"
            className="inline-flex justify-center text-left w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition ease-in-out duration-150"
            id="options-menu"
            aria-haspopup="true"
            aria-expanded="true"
            onClick={() => toggleSelectListDropdown()}
          >
            {selectedItem || placeholder}
            <svg
              className="-mr-1 ml-2 h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </span>
      </div>

      {!!isExpanded && (
        <div className="origin-top-right absolute right-0 overflow-scroll mt-2 w-full rounded-md shadow-lg" style={{ maxHeight: '300px' }}>
          <div className="rounded-md bg-white shadow-xs">
            <div
              className="py-1"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              {renderData()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
