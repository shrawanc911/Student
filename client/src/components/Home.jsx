import './Home.css'
import {Link} from 'react-router-dom'

const Component = ()=>{
    return (
        <>
            <section>
                <nav className="navbar">
                    <Link to={``} className="links">Profile</Link>        
                    <Link to={`/attendence/${0}`} className="links">Attendence</Link>        
                    <Link to={'/result'} className="links">Result</Link>
                    <a href="sign.html" className="links">Sign In</a>
                    <a href="index.html" className="links">Login</a>
                </nav>
            </section>
            <section className="allinfo">
                <div className="data">
                    <div className="overview">
                        <p className="od">Student Name : Vandan Nandwana</p>
                        <p className="od">Enrollment No. : 2203051050376</p>
                        <p className="od">Mobile No. : 8956751536</p>
                    </div>
                    <div className="profilepic">
                        <img src="/assets/1329914.jpeg" alt="Student Picture" className="pic"/>
                    </div>
                </div>
                <div className="information">
                    <p className="id">Date of Birth : 14 October 2003</p>
                    <p className="id">Division : 6A2</p>
                    <p className="id">Current Semester : 6<sup>th</sup></p>
                    <p className="id">Current Year : 3<sup>rd</sup></p>
                    <p className="id">Father's Name : Vandan Nandwana</p>
                    <p className="id">Father's Mobile : 4856998532</p>
                </div>
            </section>
        </>
    )
}

export default Component