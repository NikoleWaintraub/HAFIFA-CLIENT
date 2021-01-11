import React from 'react'
import { CartProvider } from '../context/CartContext'
import { BrowserRouter } from 'react-router-dom';
import Navbar from './Navbar'
import CoursesComp from './CoursesComp'
import ProfileComp from './ProfileComp'

export default function App() {
    return (
        <div>
            <CartProvider>
                <BrowserRouter>
                    <Navbar />
                </BrowserRouter>
            </CartProvider>
        </div>
    )
}