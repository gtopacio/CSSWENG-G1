import React from 'react'
import image1 from "../images/image1.jpg";
import image2 from "../images/image2.jpg";
import image3 from "../images/image3.png";
import '../css/Home.css';

export default function Home() {
    return (
        <div>
            <section className="home_section" id="first_section">
                <div className="home_section_text">
                    <h3 className="sub_hero_text">Learning the Easy Way</h3>
                    <p className="home_p">We are an online learning service provider for individuals of all ages in all places at all times.</p>
                    <p className="home_p p_bold">Your first session is on us! Start your free trial now.</p>
                </div>
                <img src = {image1} alt="xd"></img>
            </section>
            <section className="home_section" id="second_section">
                <img src = {image2} alt="xd"></img>
                <div className="home_section_text">
                    <h3 className="home_h3">Why Didasko?</h3>
                    <div className="text_section">
                        <h3 className="home_h3">Student Success</h3>
                        <p className="home_p">We offer courses and programs that promote student success a collaborative environment.</p>
                    </div>
                    <div className="text_section">
                        <h3 className="home_h3">Awesome Teaching Staff</h3>
                        <p className="home_p">We have a competent and well-equipped teaching staff that's ready for this new normal.</p>
                    </div>
                    <div className="text_section">
                        <h3 className="home_h3">Safe Space</h3>
                        <p className="home_p">A safe space for individuals or groups to learn, share thoughts, givve feedback and grow.</p>
                    </div>
                    <div className="text_section">
                        <h3 className="home_h3">Personalized Learning</h3>
                        <p className="home_p">Personalized assessment for instruction.</p>
                    </div>
                    <div className="text_section">
                        <h3 className="home_h3">User-friendly Platform</h3>
                        <p className="home_p">We have a user-friendly platform to support a student's stated and potential requirements.</p>
                    </div>
                </div>
            </section>
            <section className="home_section" id="third_section">
                <div className="home_section_text">
                    <h5 id="companion">COMPANION</h5>
                    <h3 className="home_h3">Learn from the best tutor for you.</h3>
                    <p className="home_p">Choose from the right tutor that's perfect for your level and schedule.</p>
                    <p className="home_p p_bold">What subject would you like to learn?</p>
                    <div id="home_subjects">
                        <p className="home_subject bg_red">Mathematics</p>
                        <p className="home_subject bg_blue">English</p>
                        <p className="home_subject bg_yellow">Science</p>
                    </div>
                </div>
                <img src = {image3} alt="xd"></img>
            </section>
        </div>
    )
}
