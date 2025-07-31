import { Device } from '@/api/types/device'
import { Input } from '@heroui/react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

interface SearchSuggestion extends Device {
  highlightedName: string
}

interface DeviceSearchProps {
  devices: Device[]
  searchTerm: string
  onSearchChange: (value: string) => void
  className?: string
}

export function DeviceSearch({
  devices,
  searchTerm,
  onSearchChange,
  className = '',
}: DeviceSearchProps) {
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)
  const suggestionRefs = useRef<(HTMLDivElement | null)[]>([])

  // Generate unique IDs for accessibility
  const searchId = useMemo(
    () => `search-${Math.random().toString(36).substr(2, 9)}`,
    []
  )
  const listboxId = useMemo(
    () => `listbox-${Math.random().toString(36).substr(2, 9)}`,
    []
  )

  // Helper function to highlight matching text
  const highlightMatch = useCallback((text: string, searchTerm: string) => {
    if (!searchTerm.trim()) return text

    const regex = new RegExp(
      `(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`,
      'gi'
    )
    return text.replace(
      regex,
      '<mark class="font-bold underline bg-transparent">$1</mark>'
    )
  }, [])

  // Get search suggestions from devices
  const searchSuggestions = useMemo((): SearchSuggestion[] => {
    if (!devices || !searchTerm.trim()) return []

    const suggestions = devices
      .filter(device =>
        device.product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .slice(0, 10) // Limit to 10 suggestions
      .map(device => ({
        ...device,
        highlightedName: highlightMatch(device.product.name, searchTerm),
      }))

    return suggestions
  }, [devices, searchTerm, highlightMatch])

  const handleSearchChange = (value: string) => {
    onSearchChange(value)
    setShowSuggestions(value.trim().length > 0)
    setSelectedSuggestionIndex(-1)
  }

  const handleClearSearch = () => {
    onSearchChange('')
    setShowSuggestions(false)
    setSelectedSuggestionIndex(-1)
    searchInputRef.current?.focus()
  }

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    onSearchChange(suggestion.product.name)
    setShowSuggestions(false)
    setSelectedSuggestionIndex(-1)
  }

  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || searchSuggestions.length === 0) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedSuggestionIndex(prev => {
          const newIndex = prev < searchSuggestions.length - 1 ? prev + 1 : prev
          // Scroll selected suggestion into view
          setTimeout(() => {
            const selectedElement = suggestionRefs.current[newIndex]
            if (selectedElement) {
              selectedElement.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
              })
            }
          }, 0)
          return newIndex
        })
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedSuggestionIndex(prev => {
          const newIndex = prev > 0 ? prev - 1 : -1
          // Scroll selected suggestion into view
          setTimeout(() => {
            const selectedElement = suggestionRefs.current[newIndex]
            if (selectedElement && newIndex >= 0) {
              selectedElement.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
              })
            }
          }, 0)
          return newIndex
        })
        break
      case 'Enter':
        e.preventDefault()
        if (selectedSuggestionIndex >= 0) {
          const selectedSuggestion = searchSuggestions[selectedSuggestionIndex]
          if (selectedSuggestion) {
            handleSuggestionClick(selectedSuggestion)
          }
        }
        break
      case 'Escape':
        setShowSuggestions(false)
        setSelectedSuggestionIndex(-1)
        searchInputRef.current?.focus()
        break
      case 'Tab':
        // Allow Tab to close suggestions and move to next focusable element
        setShowSuggestions(false)
        setSelectedSuggestionIndex(-1)
        break
    }
  }

  // Clean up suggestion refs when suggestions change
  useEffect(() => {
    suggestionRefs.current = suggestionRefs.current.slice(
      0,
      searchSuggestions.length
    )
  }, [searchSuggestions.length])

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false)
        setSelectedSuggestionIndex(-1)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className={`relative ${className}`}>
      <Input
        ref={searchInputRef}
        id={searchId}
        placeholder='Search devices by name...'
        value={searchTerm}
        onValueChange={handleSearchChange}
        onKeyDown={handleSearchKeyDown}
        onFocus={() => setShowSuggestions(searchTerm.trim().length > 0)}
        className='w-full'
        size='sm'
        role='combobox'
        aria-expanded={showSuggestions}
        aria-haspopup='listbox'
        aria-owns={showSuggestions ? listboxId : undefined}
        {...(selectedSuggestionIndex >= 0 && {
          'aria-activedescendant': `${listboxId}-option-${selectedSuggestionIndex}`,
        })}
        aria-autocomplete='list'
        aria-label='Search devices by name'
        startContent={
          <svg
            className='w-4 h-4 text-gray-400'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
            />
          </svg>
        }
        endContent={
          searchTerm.trim() && (
            <button
              type='button'
              onClick={handleClearSearch}
              className='p-1 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer'
              aria-label='Clear search'
            >
              <svg
                className='w-4 h-4'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            </button>
          )
        }
      />

      {/* Search Suggestions Dropdown */}
      {showSuggestions && searchSuggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          id={listboxId}
          role='listbox'
          aria-label='Search suggestions'
          className='absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto'
        >
          {searchSuggestions.map((suggestion, index) => (
            <div
              key={suggestion.id}
              ref={el => {
                suggestionRefs.current[index] = el
              }}
              id={`${listboxId}-option-${index}`}
              role='option'
              aria-selected={index === selectedSuggestionIndex}
              tabIndex={-1}
              className={`flex items-center justify-between px-4 py-3 cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset ${
                index === selectedSuggestionIndex
                  ? 'bg-blue-50 border-l-2 border-l-blue-500'
                  : 'hover:bg-gray-50'
              } ${
                index !== searchSuggestions.length - 1
                  ? 'border-b border-gray-100'
                  : ''
              }`}
              onClick={() => handleSuggestionClick(suggestion)}
              onMouseEnter={() => setSelectedSuggestionIndex(index)}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  handleSuggestionClick(suggestion)
                } else if (e.key === 'Escape') {
                  setShowSuggestions(false)
                  setSelectedSuggestionIndex(-1)
                  searchInputRef.current?.focus()
                }
              }}
            >
              <span className='text-sm text-gray-600 font-medium'>
                {suggestion.line.name}
              </span>
              <span
                className='text-sm'
                dangerouslySetInnerHTML={{
                  __html: suggestion.highlightedName,
                }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
