import React, { useState, useContext } from 'react'
import axios from 'axios'

const CartContext = React.createContext()
const AddItemCart = React.createContext()
const RemoveItem = React.createContext()
const PurchasedItems = React.createContext()
const PurchaseCourses = React.createContext()

export function useCart() {
    return useContext(CartContext)
}

export function useAddItem() {
    return useContext(AddItemCart)
}

export function useRemoveItem() {
    return useContext(RemoveItem)
}

export function usePurchaedItems() {
    return useContext(PurchasedItems)
}

export function usePurchase() {
    return useContext(PurchaseCourses)
}

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([])
    const [purchasedItems, setPurchasedItems] = useState([])

    const addItem = (newItem) => {
        setCartItems(prev => [...prev, newItem])
    }

    const removeItem = (id) => {
        setCartItems(prev => prev.filter(course => course._id != id))
    }

    function purchase(pernum) {
        axios.post(`soldierCourses/${pernum}`, {
            courses: cartItems
        }).then(res => {
            if (res.status === 200) {
                setCartItems([])
            }
        })
    }

    return (
        <CartContext.Provider value={cartItems}>
            <AddItemCart.Provider value={addItem}>
                <RemoveItem.Provider value={removeItem}>
                    <PurchasedItems.Provider value={purchasedItems}>
                        <PurchaseCourses.Provider value={purchase}>
                            {children}
                        </PurchaseCourses.Provider>
                    </PurchasedItems.Provider>
                </RemoveItem.Provider>
            </AddItemCart.Provider>
        </CartContext.Provider>
    )
}
