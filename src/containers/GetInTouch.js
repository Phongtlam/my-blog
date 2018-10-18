import React from 'react';

import '../styles/GetInTouch.scss';
import ButtonIcon from '../components/ButtonIcon';
import ExternalLinks from '../components/ExternalLinks';

const GetInTouch = () => (
  <div className="App-GetInTouch">
    <div className="App-GetInTouch-header">
      <h1>Let&apos;s work together!</h1>
      <p>
        I would love to chat about science-fiction books, music, work out
        routines or anything! I am interested in meeting over a cup of coffee to
        discuss about whatever comes to your mind. I enjoy a friendly chat, a
        collaboration on a new project or just to meet someone new. Feel free to
        drop me a line!
      </p>
      <h1>You can find me also on:</h1>
      <ExternalLinks location="getintouch" />
    </div>
    <h1>Or send me a message here:</h1>
    <form
      id="contact-form"
      className="App-GetInTouch-form"
      method="post"
      action="https://formspree.io/phongtlam@gmail.com"
    >
      <div className="App-GetInTouch-controls">
        <div className="form-group">
          <label htmlFor="name" className="label">
            Your name *
            <input
              type="text"
              name="name"
              id="name"
              required="required"
              className="form-control-input"
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="email" className="label">
            Your email *
            <input
              type="email"
              name="email"
              id="email"
              required="required"
              className="form-control-input"
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="message" className="label">
            Tell me about your project! *
            <textarea
              rows="4"
              name="message"
              id="message"
              required="required"
              className="form-control-input textarea"
            />
          </label>
        </div>
        <div>
          <ButtonIcon
            type="submit"
            iconName="fas fa-paper-plane"
            value="Send"
            callback={() => {}}
            buttonType="primary"
          >
            Send
          </ButtonIcon>
        </div>
      </div>
    </form>
  </div>
);

export default GetInTouch;
