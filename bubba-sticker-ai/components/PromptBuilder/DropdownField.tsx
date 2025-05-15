'use client';

import { useState, useEffect, useRef } from 'react';

interface DropdownFieldProps {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
}

export default function DropdownField({
  label,
  options,
  value,
  onChange,
  placeholder = 'Select...',
  required = false
}: DropdownFieldProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle clicks outside of dropdown to close it
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-foreground">
        {label} {required && <span className="text-accent">*</span>}
      </label>
      
      <div className="dropdown-container" ref={dropdownRef}>
        <button
          type="button"
          className={`dropdown-field ${!value && required ? 'border-accent' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
        >
          {value || placeholder}
          <svg
            className={`h-5 w-5 text-foreground/60 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        
        {isOpen && (
          <div className="dropdown-menu" role="listbox">
            {options.map((option) => (
              <div
                key={option}
                className={`dropdown-item ${value === option ? 'bg-primary/10 font-medium text-primary' : ''}`}
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
                role="option"
                aria-selected={value === option}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}