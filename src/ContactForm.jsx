
import React from 'react';
import Contact from './contact-form.module.css';
const ContactForm=function (props) {
    return (
    <div className={Contact.container}> 
      <h3>
        Contact Info
      </h3>
      <li>Phone - +358-4421673444</li>
      <li>Email - tesfaye.asfaw@chess.com</li>
      <li>Opening Time (weekdays) - 9:00-15:00 </li>
  </div>);
};

export default ContactForm;