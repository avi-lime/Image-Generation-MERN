import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'

import ImageGenerator from './pages/ImageGenerator/ImageGenerator'
import History from './pages/History/History'
import Login from './pages/Login/Login'
import Home from './pages/Home/Home'
import PointsContext from './context/PointsContext'
const parent = document.getElementById('root')
const root = ReactDOM.createRoot(parent)


const App = () => {
    const [userPoints, setUserPoints] = useState(10)
    const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('authToken') ? true : false)

    const router = createBrowserRouter([
        {
            path: '/',
            element: <Home />
        },
        {
            path: '/image-generator',
            element: isLoggedIn ? <ImageGenerator /> : <Navigate to='/login' />
        },
        {
            path: '/history',
            element: <History />
        },
        {
            path: '/login',
            element: <Login />
        }
    ])
    return (
        <PointsContext.Provider value={{
            userPoints,
            setUserPoints,
            isLoggedIn,
            setIsLoggedIn
        }}>
            <RouterProvider router={router} />
        </PointsContext.Provider>
    )
}

root.render(<App />)
