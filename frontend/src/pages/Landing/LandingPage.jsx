import React from 'react';
import './LandingPage.css';
import { Link } from 'react-router-dom';
import CustomButton from '../../components/CustomButton';
import landingPageImg from '../../assets/landing-page-img.png';
import testImg1 from '../../assets/testimonial-1.png';
import testImg2 from '../../assets/testimonial-2.png';
import testImg3 from '../../assets/testimonial-3.jpg';

function LandingPage({ isLoggedIn }) {
    return (
        <div className="landing-page">
            <header className="landing-page__header">
                <h1>Looking for a group?</h1>
                <p className="landing-page__subtext">
                    Explore course forums with hundreds of project group postings and study buddy requests.
                </p>
                {
                    isLoggedIn ? (
                        <Link to="/feed">
                            <CustomButton variant="large">Check Out Groups</CustomButton>
                        </Link>
                    ) : (
                        <Link to="/welcome">
                            <CustomButton variant="large">Check Out Groups</CustomButton>
                        </Link>
                    )
                }
            </header>
            
            <div className="landing-page__image">
                <img src={landingPageImg} alt="Welcome" />
            </div>
            
            <section className="landing-page__testimonials">
                <h2>Testimonials</h2>
                <p>Here from satisfied students.</p>
                
                <div className="landing-page__testimonials-grid">
                    <div className="testimonial-card">
                        <p>"Solid."</p>
                        <div className="testimonial-info">
                            <img src={testImg1} alt="Billy Bob" />
                            <div>
                                <p><strong>Bill Rodgers</strong></p>
                                <p>SEAS '26</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="testimonial-card">
                        <p>"A simple, but important initiative!"</p>
                        <div className="testimonial-info">
                            <img src={testImg2} alt="Samantha Ray" />
                            <div>
                                <p><strong>Samantha Ray</strong></p>
                                <p>CAS '25</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="testimonial-card">
                        <p>"When I heard about this, I was like: why hasn't this been made already?"</p>
                        <div className="testimonial-info">
                            <img src={testImg3} alt="Sue Kim" />
                            <div>
                                <p><strong>Sue Kim</strong></p>
                                <p>Wharton '24</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default LandingPage;