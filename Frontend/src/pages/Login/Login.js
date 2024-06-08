import React, { useState, useContext } from 'react'
import Navbar from '../../components/Navbar'
import PointsContext from '../../context/PointsContext'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const ctx = useContext(PointsContext)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleLogin = async () => {
        if (!email || !password) {
            return
        }
        const response = await fetch(`${process.env.BACKEND_URL}/api/v1/auth/${email}&${password}`)
        const data = await response.json()
        if (response.status == 200) {
            ctx.setIsLoggedIn(true)
            localStorage.setItem('authToken', data.token)
            navigate('/image-generator')
        }
    }
    return (
        <div>
            <Navbar page='login' />
            <div>
                <input type='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
                <input type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
                <button onClick={handleLogin} >Login</button>
            </div>
        </div>
    )
}

export default Login