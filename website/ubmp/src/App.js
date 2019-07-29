import React from 'react';
import SlackRequestForm from './SlackRequestForm';

export default class App extends React.Component {
  render() {
    return (
      <div className="text-center">
        <img style={{ height: '200px' }} src="/ubmp-logo.png"/>
        <h1>Utah Business Management Professionals</h1>

        <div className="description">
          You can request to join the Slack group by providing your name and email address in the form below:

          <SlackRequestForm />
        </div>
      </div>
    );
  }
}
