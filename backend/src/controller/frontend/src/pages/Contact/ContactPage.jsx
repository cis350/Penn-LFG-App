import React from 'react';
import './ContactPage.css';
import CustomButton from '../../components/CustomButton';

function ContactPage() {
    return (
        <div className="contact-page">
            <h1>Project Status</h1>
            <p className="contact-page__description">
                Due to our team members' busy semester schedules, the development of the project is currently on pause. The app remains very much under development, with several features yet to be fully implemented.
            </p>
            <p className="contact-page__description">
                If you have any questions or suggestions for improving the app, feel free to reach out to the current lead developer: <strong>Alain Welliver</strong>.
            </p>
            <CustomButton variant="large">
                <a href="mailto:alainw@seas.upenn.edu" className="create-page__button-link">Contact Alain</a>
            </CustomButton>
        </div>
    );
}

export default ContactPage;
