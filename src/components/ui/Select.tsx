'use client'

import React, { useState, useRef, useEffect } from 'react'
import { ChevronDown, Check } from 'lucide-react'

interface SelectProps {
  children: React.ReactNode
  value?: string
  onValueChange?: (value: string) => void
  defaultValue?: string
  disabled?: boolean
  className?: string
}

interface SelectTriggerProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

interface SelectContentProps {
  children: React.ReactNode
  className?: string
}

interface SelectItemProps {
  children: React.ReactNode
  value: string
  className?: string
  onClick?: () => void
}

interface SelectValueProps {
  placeholder?: string
  className?: string
}

const SelectContext = React.createContext<{
  value?: string
  onValueChange?: (value: string) => void
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  triggerRef: React.RefObject<HTMLButtonElement>
}>({
  isOpen: false,
  setIsOpen: () => {},
  triggerRef: { current: null }
})

export function Select({ children, value, onValueChange, defaultValue, disabled, className = '' }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState(value || defaultValue || '')
  const triggerRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (value !== undefined) {
      setSelectedValue(value)
    }
  }, [value])

  const handleValueChange = (newValue: string) => {
    setSelectedValue(newValue)
    onValueChange?.(newValue)
    setIsOpen(false)
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (triggerRef.current && !triggerRef.current.contains(event.target as Node)) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  return (
    <SelectContext.Provider value={{ 
      value: selectedValue, 
      onValueChange: handleValueChange, 
      isOpen, 
      setIsOpen,
      triggerRef
    }}>
      <div className={`relative ${className}`}>
        {children}
      </div>
    </SelectContext.Provider>
  )
}

export function SelectTrigger({ children, className = '', onClick }: SelectTriggerProps) {
  const { isOpen, setIsOpen, triggerRef } = React.useContext(SelectContext)

  const handleClick = () => {
    setIsOpen(!isOpen)
    onClick?.()
  }

  return (
    <button
      ref={triggerRef}
      type="button"
      onClick={handleClick}
      className={`flex items-center justify-between w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {children}
      <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
    </button>
  )
}

export function SelectValue({ placeholder, className = '' }: SelectValueProps) {
  const { value } = React.useContext(SelectContext)

  return (
    <span className={`text-gray-900 ${value ? '' : 'text-gray-500'} ${className}`}>
      {value || placeholder}
    </span>
  )
}

export function SelectContent({ children, className = '' }: SelectContentProps) {
  const { isOpen } = React.useContext(SelectContext)

  if (!isOpen) return null

  return (
    <div className={`absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto ${className}`}>
      {children}
    </div>
  )
}

export function SelectItem({ children, value, className = '', onClick }: SelectItemProps) {
  const { value: selectedValue, onValueChange } = React.useContext(SelectContext)
  const isSelected = selectedValue === value

  const handleClick = () => {
    onValueChange?.(value)
    onClick?.()
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`flex items-center justify-between w-full px-3 py-2 text-sm text-left hover:bg-gray-100 focus:outline-none focus:bg-gray-100 ${
        isSelected ? 'bg-blue-50 text-blue-600' : 'text-gray-900'
      } ${className}`}
    >
      <span>{children}</span>
      {isSelected && <Check className="h-4 w-4 text-blue-600" />}
    </button>
  )
}
