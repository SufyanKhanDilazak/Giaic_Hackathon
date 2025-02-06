"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { CartItem } from './Interface'

interface CartContextType {
  cartItems: CartItem[]
  addToCart: (product: CartItem) => void
  removeFromCart: (productId: string) => void
  cartQuantity: number
  shouldGlow: boolean
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [shouldGlow, setShouldGlow] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)

  // Load cart items from localStorage on initial mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('cartItems')
      if (savedCart) {
        setCartItems(JSON.parse(savedCart))
      }
      setIsInitialized(true)
    }
  }, [])

  // Save cart items to localStorage whenever they change
  useEffect(() => {
    if (isInitialized && typeof window !== 'undefined') {
      localStorage.setItem('cartItems', JSON.stringify(cartItems))
    }
  }, [cartItems, isInitialized])

  const cartQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  const addToCart = (product: CartItem) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => 
        item._id === product._id &&
        item.selectedSize === product.selectedSize &&
        item.selectedColor === product.selectedColor
      )
      
      if (existingItem) {
        return prevItems.map(item =>
          item._id === product._id &&
          item.selectedSize === product.selectedSize &&
          item.selectedColor === product.selectedColor
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prevItems, { ...product, quantity: 1 }]
    })
    setShouldGlow(true)
    setTimeout(() => setShouldGlow(false), 500)
  }

  const removeFromCart = (productId: string) => {
    setCartItems(prevItems => {
      const itemToUpdate = prevItems.find(item => item._id === productId)
      if (itemToUpdate && itemToUpdate.quantity > 1) {
        return prevItems.map(item =>
          item._id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      }
      return prevItems.filter(item => item._id !== productId)
    })
  }

  const clearCart = () => {
    setCartItems([])
    if (typeof window !== 'undefined') {
      localStorage.removeItem('cartItems')
    }
  }

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      removeFromCart, 
      cartQuantity,
      shouldGlow,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
