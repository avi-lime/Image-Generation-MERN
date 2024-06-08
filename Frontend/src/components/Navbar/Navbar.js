import React, { useContext } from 'react'
import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import PointsContext from '../../context/PointsContext'

const Navbar = (props) => {
    const activeStyle = {
        textDecoration: 'underline'
    }
    const navigate = useNavigate()
    const ctx = useContext(PointsContext)

    const logout = () => {
        ctx.removeCookie('token')
        ctx.removeCookie('user')
        ctx.setIsLoggedIn(false)
        navigate('/login')
    }

    // const linksObj = {
    //     home: '/',
    //     image: '/image-generator',
    //     history: '/history',
    //     contact: '/contact',
    //     help: '/help'
    // }

    const links = [
        { key: 'image', url: '/image-generator', name: 'Generator' },
        { key: 'history', url: '/history', name: 'History' }
    ]


    return (
        <div className='header-container'>
            <div className='left'>
                <Link className='logo' to='/'>Img-Maestro</Link>
                {
                    ctx.isLoggedIn && links.map(link => {
                        return (
                            <Link key={link.key} style={props.page === link.key ? activeStyle : {}} to={link.url}>{link.name}</Link>
                        )
                    })
                }
                {/* OR
                <Link to='/' style={props.page === 'home' ? activeStyle : {}}>Home</Link>
                <Link to='/image-generator' style={props.page === 'image' ? activeStyle : {}}>Image Generator</Link>
                <Link to='/history' style={props.page === 'history' ? activeStyle : {}}>History</Link>
                <Link to='/contact' style={props.page === 'contact' ? activeStyle : {}}>Contact</Link>
                <Link to='/help' style={props.page === 'help' ? activeStyle : {}}>Help</Link>
                
                */}
            </div>
            <div>
                {
                    ctx.isLoggedIn ?
                        <>
                            <div className='right' style={{ color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '20px' }}>
                                {ctx.userPoints}
                            </div>
                            <button onClick={logout}>Logout</button>
                        </> :

                        <button className="cta" onClick={() => navigate('/login')}>
                            <span>Login</span>
                            <svg width="15px" height="10px" viewBox="0 0 13 10">
                                <path d="M1,5 L11,5"></path>
                                <polyline points="8 1 12 5 8 9"></polyline>
                            </svg>
                        </button>
                }
            </div>
        </div>
    )
}

export default Navbar