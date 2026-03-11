'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Search, Filter, X } from 'lucide-react'

interface OrderFiltersProps {
  onFilterChange: (filters: {
    search: string
    status: string
    sortBy: string
  }) => void
}

export function OrderFilters({ onFilterChange }: OrderFiltersProps) {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('all')
  const [sortBy, setSortBy] = useState('recent')
  const [isOpen, setIsOpen] = useState(false)

  const handleSearchChange = (value: string) => {
    setSearch(value)
    onFilterChange({ search: value, status, sortBy })
  }

  const handleStatusChange = (value: string) => {
    setStatus(value)
    onFilterChange({ search, status: value, sortBy })
  }

  const handleSortChange = (value: string) => {
    setSortBy(value)
    onFilterChange({ search, status, sortBy: value })
  }

  const handleReset = () => {
    setSearch('')
    setStatus('all')
    setSortBy('recent')
    onFilterChange({ search: '', status: 'all', sortBy: 'recent' })
  }

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
        <Input
          type="text"
          placeholder="Search by Order ID or product name..."
          className="pl-10"
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
        />
      </div>

      {/* Filters - Mobile Toggle */}
      <div className="block md:hidden">
        <Button
          variant="outline"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full justify-start"
        >
          <Filter className="w-4 h-4 mr-2" />
          Filters {isOpen ? <X className="w-4 h-4 ml-auto" /> : null}
        </Button>
      </div>

      {/* Filter Options */}
      <div
        className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${
          isOpen ? 'block' : 'hidden md:grid'
        }`}
      >
        {/* Status Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Order Status
          </label>

          <Select value={status} onValueChange={handleStatusChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="shipped">Shipped</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Sort By */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Sort By
          </label>

          <Select value={sortBy} onValueChange={handleSortChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Sort Orders" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="amount-high">Highest Amount</SelectItem>
              <SelectItem value="amount-low">Lowest Amount</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Reset Button */}
      {(search || status !== 'all' || sortBy !== 'recent') && (
        <Button
          variant="ghost"
          onClick={handleReset}
          className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
        >
          Reset Filters
        </Button>
      )}
    </div>
  )
}