import React from 'react'
import '../css/About.css';
import AboutUs1 from '../images/aboutUs1.jpg'
import AboutUs2 from '../images/aboutUs2.jpg'
import AboutUs3 from '../images/aboutUs3.jpg'
import AboutUs4 from '../images/aboutUs4.jpg'

export default function About() {
    return (
        <div>
            <section className="home_section" id="first_section">
                <div className="home_section_text">
                    <h3 className="sub_hero_text">About Us</h3>
                    <p className="home_p">didasko LEARNING CHANNEL is an online learning service provider for individuals of all ages in all places at all times.  
                    We offer tutorial services and programs that promote learner success in a collaborative environment.  
                    We provide a safe space for individuals or groups, competent and well-equipped teaching staff, 
                    personalized assessment for instruction and user-friendly platform to support learner’s stated and potential requirements.
                    </p>


                </div>
                <img src = {AboutUs1} alt="xd"></img>
            </section>
            <section className="home_section" id="second_section">
                <img src = {AboutUs3} alt="xd"/>
                <div className="home_section_text_adjusted">
                    <h3 className="sub_hero_text">Mission</h3>
                    <p className="home_p">To provide excellent online services through competent teaching staff and continuous system improvement.
                    </p>
                    <h3 className="sub_hero_text">Vision</h3>
                    <p className="home_p">To be Asia’s preferred online learning service provider.
                    </p>
                    <h3 className="sub_hero_text">Core Values</h3>
                    <h2 className="sub_hero_text_h2">To Achieve Total Customer Satisfaction </h2>
                    <p className="home_p">We commit to provide reliable and competent educators and adopt new technologies in order to fully meet student’s stated and potential requirements.
                    </p>
                    <p></p>
                    <h2 className="sub_hero_text_h2">To Never Cease to Improve Quality </h2>
                    <p className="home_p">We believe that quality excellence can only be achieved by ceaselessly striving for continual improvement on core competencies and quality management system.
                    </p>
                </div>
            </section>
            <section className="home_section" id="first_section">
                <div className="home_section_text">
                    <h3 className="sub_hero_text">Contact Us</h3>
                    <h2 className="sub_hero_text_h2">Office Address</h2>
                    <p className="home_p">190 General Ordoñez St., Rancho Estate 4, Concepcion Dos, Marikina City, Phils. 1811
                    </p>
                    <p></p>
                    <h2 className="sub_hero_text_h2">Mobile Number</h2>
                    <p className="home_p">09392417407
                    </p>
                    <p></p>
                    <h2 className="sub_hero_text_h2">Email Address</h2>
                    <p className="home_p">admin@didasko.ph
                    </p>


                </div>
                <img src = {AboutUs2} alt="xd"></img>
            </section>
            <section className="home_section" id="second_section">
                <img src = {AboutUs4} alt="xd"/>
                <div className="home_section_text_adjusted">
                    <h3 className="sub_hero_text">Services</h3>
                    <h2 className="sub_hero_text_h2">Companion</h2>
                    <p className="home_p">A personalized online tutorial service to help students adjust to the ever-changing teaching methods in school and provide a study companion to learn better and smarter. 
                    </p>
                    <p></p>
                    <h2 className="sub_hero_text_h2">Course</h2>
                    <p className="home_p">Different webinars, workshops and forums you can choose from for personal growth and development.
                    </p>
                    <p></p>
                    <h2 className="sub_hero_text_h2">Catalog</h2>
                    <p className="home_p">A gallery of resources you can browse thru anytime to gain knowledge and encourage learning.
                    </p>
                    <p></p>
                    <h2 className="sub_hero_text_h2">Community</h2>
                    <p className="home_p">Your safe space to connect with other members of our learning channel.
                    </p>
                    <p></p>
                </div>
            </section>
        </div>

    

    )
}
