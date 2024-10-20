import React from 'react';
import './AboutPage.css';
import { Link } from 'react-router-dom';
import CustomButton from '../../components/CustomButton';

function AboutPage() {

    return (
        <div className="about-page">
            <h1>About Us</h1>
            <p className="about-page__description">
                <strong>Who:</strong> A group of Penn students who met during CIS 350.
            </p>
            <p className="about-page__description">
                <strong>What:</strong> We developed a simple, easy platform for students across Penn to look for and post about finding study buddies. You can search by class, study preferences, study habits, and more.
            </p>
            <p className="about-page__description">
                <strong>Why:</strong> This app was born out of a CIS 350 project, where our team ironically struggled to form a project group due to the lack of a system for finding study partners in class when we barely knew anyone.
            </p>
            <p className="about-page__call-to-action">
                Join our growing community today and start connecting with your peers!
            </p>
            <Link to="/welcome">
                <CustomButton variant="large">Join the Community</CustomButton>
            </Link>
        </div>
    );
}

export default AboutPage;