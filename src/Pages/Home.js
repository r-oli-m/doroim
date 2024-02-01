import React from 'react';
import './Home.css';

const Home = () => {
    return (
        <div className='home-page'>
            <h1>Home sweet home</h1>
            <div className='table-container'>
                <div className="box">
                    <img src="/box.png" alt="Box Image" className="box-image" />
                </div>
                <div className="checklist">
                    <img src="/checklist.png" alt="Checklist Image" className="checklist-image" />
                </div>
            </div>
        </div >
    );
};

export default Home;