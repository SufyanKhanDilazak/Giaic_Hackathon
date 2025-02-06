"use client"

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Newsletter() {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div className="bg-black text-white">
      <div className="container mx-auto px-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full h-32 py-4"
        >
          <div className="flex items-center gap-2">
            <h2 className="text-lg sm:text-xl font-bold">STAY UP TO DATE ABOUT OUR LATEST OFFERS</h2>
          </div>
          {isOpen ? (
            <ChevronUp className="h-6 w-6" />
          ) : (
            <ChevronDown className="h-6 w-6" />
          )}
        </button>
        <div
          className={cn(
            "grid gap-4 overflow-hidden transition-all duration-200",
            isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          )}
        >
          <div className="min-h-0">
            <div className="pb-4 flex flex-col sm:flex-row items-center gap-4">
              <Input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 bg-white border-white/20 text-white placeholder:text-gray-600 text-center"
              />
              <Button variant="secondary" className="w-full sm:w-auto h8">
                Subscribe to Newsletter
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

