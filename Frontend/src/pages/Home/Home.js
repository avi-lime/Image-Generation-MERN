import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import './Home.css'
const Home = () => {
    return (
        <div>
            <Navbar />
            <div className='home-container'>
                Generate Images on the go
                <button className="learn-more">
                    <span className="circle" aria-hidden="true">
                        <span className="icon arrow"></span>
                    </span>
                    <span className="button-text">Learn More</span>
                </button>
            </div>
        </div>
    )
}

export default Home