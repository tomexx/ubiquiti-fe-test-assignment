import type { Device } from '@/api/types/device'
import { ClearIcon, SearchIcon } from '@/components/icons'
import { UI_CONSTANTS } from '@/config'
import { generateId } from '@/utils'
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
  const [inputValue, setInputValue] = useState(searchTerm)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1)
  const [showAllSuggestions, setShowAllSuggestions] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)
  const suggestionRefs = useRef<(HTMLDivElement | null)[]>([])

  // Generate unique IDs for accessibility
  const searchId = useMemo(() => generateId('search'), [])
  const listboxId = useMemo(() => generateId('listbox'), [])

  // Sync input value when searchTerm prop changes (e.g., from URL or external reset)
  useEffect(() => {
    setInputValue(searchTerm)
  }, [searchTerm])

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

  // Get all matching devices for search suggestions (using inputValue for real-time suggestions)
  const allMatchingDevices = useMemo(() => {
    if (!devices || !inputValue.trim()) return []

    return devices.filter(device =>
      device.product.name.toLowerCase().includes(inputValue.toLowerCase())
    )
  }, [devices, inputValue])

  // Get search suggestions from devices (limited or all based on showAllSuggestions)
  const searchSuggestions = useMemo((): SearchSuggestion[] => {
    if (!allMatchingDevices.length) return []

    const limit = showAllSuggestions
      ? allMatchingDevices.length
      : UI_CONSTANTS.SEARCH.INITIAL_SUGGESTIONS_LIMIT
    const suggestions = allMatchingDevices.slice(0, limit).map(device => ({
      ...device,
      highlightedName: highlightMatch(device.product.name, inputValue),
    }))

    return suggestions
  }, [allMatchingDevices, showAllSuggestions, highlightMatch, inputValue])

  // Calculate remaining results count
  const remainingResultsCount = useMemo(() => {
    if (
      showAllSuggestions ||
      allMatchingDevices.length <= UI_CONSTANTS.SEARCH.INITIAL_SUGGESTIONS_LIMIT
    )
      return 0
    return (
      allMatchingDevices.length - UI_CONSTANTS.SEARCH.INITIAL_SUGGESTIONS_LIMIT
    )
  }, [allMatchingDevices.length, showAllSuggestions])

  const handleInputChange = (value: string) => {
    setInputValue(value)
    setShowSuggestions(value.trim().length > 0)
    setSelectedSuggestionIndex(-1)
    setShowAllSuggestions(false) // Reset expanded state when input changes
  }

  const handleSubmitSearch = (value: string) => {
    onSearchChange(value)
    setShowSuggestions(false)
    setSelectedSuggestionIndex(-1)
    setShowAllSuggestions(false)
  }

  const handleClearSearch = () => {
    setInputValue('')
    onSearchChange('')
    setShowSuggestions(false)
    setSelectedSuggestionIndex(-1)
    setShowAllSuggestions(false)
    searchInputRef.current?.focus()
  }

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    const selectedValue = suggestion.product.name
    setInputValue(selectedValue)
    handleSubmitSearch(selectedValue)
  }

  const handleLoadMoreResults = () => {
    setShowAllSuggestions(true)
    setSelectedSuggestionIndex(-1) // Reset selection when expanding
  }

  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    // Always handle Enter key, even when there are no suggestions
    if (e.key === 'Enter') {
      e.preventDefault()
      if (
        showSuggestions &&
        searchSuggestions.length > 0 &&
        selectedSuggestionIndex >= 0
      ) {
        const loadMoreButtonIndex = searchSuggestions.length
        if (
          selectedSuggestionIndex === loadMoreButtonIndex &&
          remainingResultsCount > 0
        ) {
          // Trigger load more action
          handleLoadMoreResults()
        } else {
          const selectedSuggestion = searchSuggestions[selectedSuggestionIndex]
          if (selectedSuggestion) {
            handleSuggestionClick(selectedSuggestion)
          }
        }
      } else {
        // No suggestion selected or no suggestions available, submit the current input value
        handleSubmitSearch(inputValue)
      }
      return
    }

    // For other keys, only process if we have suggestions
    if (!showSuggestions || searchSuggestions.length === 0) return

    // Total navigable items: suggestions + load more button (if present)
    const totalItems =
      searchSuggestions.length + (remainingResultsCount > 0 ? 1 : 0)
    const loadMoreButtonIndex = searchSuggestions.length // Index for the load more button

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedSuggestionIndex(prev => {
          const newIndex = prev < totalItems - 1 ? prev + 1 : prev
          // Scroll selected element into view
          setTimeout(() => {
            if (newIndex === loadMoreButtonIndex && remainingResultsCount > 0) {
              // Focus the load more button
              const loadMoreButton = document.querySelector(
                '[data-load-more-button]'
              ) as HTMLButtonElement
              if (loadMoreButton) {
                loadMoreButton.scrollIntoView({
                  behavior: 'smooth',
                  block: 'nearest',
                })
              }
            } else {
              const selectedElement = suggestionRefs.current[newIndex]
              if (selectedElement) {
                selectedElement.scrollIntoView({
                  behavior: 'smooth',
                  block: 'nearest',
                })
              }
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

  // Reset expanded state when devices change (e.g., when filters are applied)
  useEffect(() => {
    setShowAllSuggestions(false)
    setSelectedSuggestionIndex(-1)
  }, [devices])

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
        placeholder='Search'
        value={inputValue}
        onValueChange={handleInputChange}
        onKeyDown={handleSearchKeyDown}
        onFocus={() => setShowSuggestions(inputValue.trim().length > 0)}
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
          <SearchIcon className='w-[20px] h-[20px] text-neutral-08' />
        }
        endContent={
          inputValue.trim() && (
            <button
              type='button'
              onClick={handleClearSearch}
              className='p-1 text-neutral-08 cursor-pointer focus:outline-none focus-visible:outline-none focus:ring-2 focus:ring-ublue-06 focus:ring-offset-1 focus-visible:ring-2 focus-visible:ring-ublue-06 focus-visible:ring-offset-1 rounded'
              aria-label='Clear search'
            >
              <ClearIcon className='w-4 h-4 text-neutral-08' />
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
          className='absolute top-full left-0 right-0 mt-1 bg-white border border-neutral-02 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto'
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
              className={`flex items-center justify-between px-4 py-3 cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-ublue-06 focus:ring-inset ${
                index === selectedSuggestionIndex
                  ? 'bg-ublue-06/10 border-l-2 border-l-ublue-06'
                  : 'hover:bg-neutral-01'
              } ${
                index !== searchSuggestions.length - 1 &&
                remainingResultsCount === 0
                  ? 'border-b border-neutral-02'
                  : index !== searchSuggestions.length - 1
                  ? 'border-b border-neutral-02'
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
              <span
                className='text-sm color-neutral-10 inline-block pr-2'
                dangerouslySetInnerHTML={{
                  __html: suggestion.highlightedName,
                }}
              />
              <span className='text-sm text-text-03'>
                {suggestion.line.name}
              </span>
            </div>
          ))}

          {/* Load More Results Button */}
          {remainingResultsCount > 0 && (
            <div className='border-t border-neutral-02'>
              <button
                type='button'
                onClick={handleLoadMoreResults}
                data-load-more-button
                className={`w-full px-4 py-3 text-sm text-ublue-06 hover:bg-neutral-01 transition-colors focus:outline-none focus:ring-2 focus:ring-ublue-06 focus:ring-inset cursor-pointer ${
                  selectedSuggestionIndex === searchSuggestions.length
                    ? 'bg-ublue-06/10 border-l-2 border-l-ublue-06'
                    : ''
                }`}
                aria-label={`Load ${remainingResultsCount} more results`}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    handleLoadMoreResults()
                  } else if (e.key === 'Escape') {
                    setShowSuggestions(false)
                    setSelectedSuggestionIndex(-1)
                    searchInputRef.current?.focus()
                  } else if (e.key === 'ArrowUp') {
                    e.preventDefault()
                    setSelectedSuggestionIndex(searchSuggestions.length - 1)
                  }
                }}
              >
                Load more results ({remainingResultsCount})
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
