import React from 'react';

const SLACK_URL = 'https://hooks.slack.com/services/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';
const email_r = /([a-z0-9\.\-_]+)@([a-z0-9\.\-_]+?)\.([a-z]+)/i;

export default class SlackRequestForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
    };
  }

  onSubmit = (evt) => {
    evt.preventDefault();

    if (!this.state.name || !this.state.email || !email_r.test(this.state.email)) {
      this.setState({
        error: true,
      });
      return;
    }

    this.setState({
      loading: true,
    });

    const body = {
      text: `${this.state.name} has requested to join the UBMP Slack group with the email address ${this.state.email}`,
    };

    window.fetch(SLACK_URL, {
      method: 'POST',
      body: JSON.stringify(body),
    })
    .then((response) => {
      console.log(response);
      this.setState({
        loading: false,
        success: true,
      });
    });
  }

  onEmailChange = (evt) => {
    this.setState({
      error: false,
      email: event.target.value,
    });
  }

  onNameChange = (evt) => {
    this.setState({
      error: false,
      name: event.target.value,
    });
  }

  render() {
    if (this.state.success) {
      return this.renderSuccess();
    } else {
      return this.renderForm();
    }
  }

  renderSuccess() {
    return (
      <h2>Thanks for your interest in UBMP. We'll be in touch shortly</h2>
    );
  }

  renderForm() {
    return (
      <form onSubmit={ this.onSubmit } className="signup-form">
        <div>
          <input type="text" value={ this.state.name } onChange={ this.onNameChange } placeholder="Name"/>
        </div>
        <div>
          <input type="text" value={ this.state.email } onChange={ this.onEmailChange } placeholder="me@example.com"/>
        </div>
        { this.renderError() }
        { this.state.loading
          ? '...'
          : <div>
              <input type="submit" />
            </div>
        }
      </form>
    );
  }

  renderError() {
    if (!this.state.error) {
      return null;
    }
    <div className="warning">
      Please provide a real name and email address
    </div>
  }
}
