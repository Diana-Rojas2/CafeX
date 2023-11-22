// components/Sidebar.tsx
import React from 'react';

interface SubFilter {
  id: string;
  label: string;
  selected: boolean;
}

interface Filter {
  id: string;
  label: string;
  selected: boolean;
  subfilters?: SubFilter[];
}

interface SidebarProps {
  filters: Filter[];
  handleFilterChange: (filterId: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ filters, handleFilterChange }) => {
  return (
    <div className="bg-gray-200 p-4">
      <h2 className="text-xl font-bold mb-2">Filtrar por:</h2>
      <ul className="space-y-2">
        {filters.map((filter) => (
          <li key={filter.id}>
            <div className="flex items-center">
              <label id={filter.id}>{filter.label}</label>
            </div>
            {filter.subfilters && (
              <ul className="ml-4 space-y-2">
                {filter.subfilters.map((subfilter) => (
                  <li key={subfilter.id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={subfilter.id}
                      checked={subfilter.selected}
                      onChange={() => handleFilterChange(subfilter.id)}
                      className="mr-2"
                    />
                    <label htmlFor={subfilter.id}>{subfilter.label}</label>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
      {/* <a className="flex items-center justify-center mt-4 px-3 py-2 bg-[#2F4858] text-white text-sm uppercase font-medium rounded hover:bg-blue-900 focus:outline-none focus:bg-blue-900">
        <span>Aplicar filtros</span>
        <svg className="h-5 w-5 mx-2" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
        </svg>
      </a> */}
    </div>
  );
};

export default Sidebar;
